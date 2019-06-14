import React, { useEffect, useState } from 'react';
import { Subject, merge } from 'rxjs';
import { scan } from 'rxjs/operators';
import { merge as lodashMerge } from 'lodash';

const action$ = new Subject();

const useStore = (reducers, initialState = {}, middleware) => {
  const [state, update] = useState(initialState);

  const dispatch = next => action$.next(next);

  useEffect(() => {
    const s = merge(action$)
      .pipe(
        scan((prevState, action) => {
          // get all keys of state
          const stateKeys = Object.keys(reducers);
          const newState = {};
          // loop over all state keys
          for (const key of stateKeys) {
            // extract reducer for per state key
            const reducer = reducers[key];
            Object.assign(newState, {
              [key]: reducer(prevState[key], action),
            });
          }
          // merge prevState with current state
          return { ...prevState, ...newState };
        }, initialState),
      )
      .subscribe(update);

    return () => s.unsubscribe();
  }, [action$]);

  return { state, dispatch };
};

export const StoreContext = React.createContext({
  state: {},
  dispatch: () => {},
});

export const StoreProvider = ({ store, children }) => {
  const stateProps = useStore(
    store.reducers,
    store.initialState,
    store.middleware,
  );
  const ui = typeof children === 'function' ? children(stateProps) : children;
  return <StoreContext.Provider value={stateProps}>{ui}</StoreContext.Provider>;
};

export const useStoreContext = stateKey => {
  // TODO: optimization
  const { state, dispatch } = React.useContext(StoreContext);
  const newState = React.useMemo(() => state[stateKey], [state[stateKey]]);
  return { [stateKey]: newState, dispatch };
};

const getInitialState = (reducers, initialState) => {
  const stateFromReducers = Object.keys(reducers).reduce((acc, key) => {
    const reducer = reducers[key];
    return {
      ...acc,
      [key]: reducer(undefined, {}),
    };
  }, {});

  return lodashMerge(stateFromReducers, initialState);
};

export const createStore = (reducers, initialState = {}, middleware) => {
  return {
    reducers: reducers(),
    initialState: getInitialState(reducers(), initialState),
    middleware,
  };
};

export const combineReducers = reducers => {
  return () => {
    // do the combination here
    return reducers;
  };
};

export default useStore;
