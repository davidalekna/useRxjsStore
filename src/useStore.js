import React, { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { scan, filter, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'lodash';
import combineEpics from './combineEpics';

const action$ = new Subject();

const useStore = (reducers, initialState = {}, epics = []) => {
  const [state, update] = useState(initialState);

  const combinedEpics = combineEpics(...epics);

  const dispatch = next => action$.next(next);

  useEffect(() => {
    const s = combinedEpics(action$)
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
        distinctUntilChanged(),
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

export const useSelector = stateKey => {
  // ERROR: needs optimization
  const { state, dispatch } = React.useContext(StoreContext);
  const selectedState = state[stateKey];
  const memoState = React.useMemo(() => selectedState, [selectedState]);
  return { [stateKey]: memoState, dispatch };
};

const getInitialState = (reducers, initialState) => {
  const stateFromReducers = Object.keys(reducers).reduce((acc, key) => {
    const reducer = reducers[key];
    return {
      ...acc,
      [key]: reducer(undefined, {}),
    };
  }, {});

  return merge(stateFromReducers, initialState);
};

export const createStore = (reducers, initialState = {}, middleware = []) => {
  return {
    reducers,
    initialState: getInitialState(reducers, initialState),
    middleware,
  };
};

export const ofType = actionType => {
  return filter(({ type }) => type === actionType);
};

export default useStore;
