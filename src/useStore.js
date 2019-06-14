import React, { useEffect, useState } from 'react';
import { Subject, merge } from 'rxjs';
import { scan } from 'rxjs/operators';
import { merge as lodashMerge } from 'lodash';

const action$ = new Subject();

const useStore = (reducers, initialState = {}, middleware) => {
  const [state, update] = useState(initialState);

  const dispatch = next => action$.next(next);

  /* eslint ignore */
  useEffect(() => {
    const s = merge(action$)
      .pipe(
        scan((prevState, action) => {
          // NOTE: for loop doesnt work here, only the first item is taken out
          const reducerKeys = Object.keys(reducers);
          for (const key of reducerKeys) {
            const reducer = reducers[key];
            console.log(key);
            return {
              ...prevState,
              [key]: reducer(prevState[key], action),
            };
          }
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

export const useStoreContext = () => {
  const props = React.useContext(StoreContext);
  return props;
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
