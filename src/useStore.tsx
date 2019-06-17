import React, { useEffect, useState, ReactNode } from 'react';
import { Subject } from 'rxjs';
import { scan, filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { merge as lodashMerge } from 'lodash';
import { Reducers, State, Store, Epics, Action } from './types';
import combineEpics from './combineEpics';

const action$ = new Subject();

export const useStore = (
  reducers: Reducers,
  initialState: State = {},
  epics: Epics = [],
) => {
  const [state, update] = useState(initialState);

  const dispatch = (next: Action) => action$.next(next);

  useEffect(() => {
    const combinedEpics = combineEpics(epics);
    const s = combinedEpics(action$)
      .pipe(
        tap(b => console.log('b-scan', b)),
        scan<Action, State>((prevState, action) => {
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

    return () => {
      s.unsubscribe();
    };
  }, [reducers, initialState, epics]);

  return { state, dispatch };
};

export const StoreContext = React.createContext<{
  state: State;
  dispatch: Function;
}>({
  state: {},
  dispatch: () => {},
});

const StoreProvider = ({
  store,
  children,
}: {
  store: Store;
  children: ReactNode;
}) => {
  const stateProps = useStore(store.reducers, store.initialState, store.epics);
  const ui = typeof children === 'function' ? children(stateProps) : children;
  return <StoreContext.Provider value={stateProps}>{ui}</StoreContext.Provider>;
};

export const useSelector = (stateKey: string) => {
  // ERROR: needs optimization
  const { state, dispatch } = React.useContext(StoreContext);
  const selectedState = state[stateKey];
  const memoState = React.useMemo(() => selectedState, [selectedState]);
  return { [stateKey]: memoState, dispatch };
};

const getInitialState = (reducers: Reducers, initialState: State) => {
  const stateFromReducers = Object.keys(reducers).reduce((acc, key) => {
    const reducer = reducers[key];
    return {
      ...acc,
      [key]: reducer(undefined, {}),
    };
  }, {});

  return lodashMerge(stateFromReducers, initialState);
};

export const createStore = (
  reducers: Reducers,
  initialState: State = {},
  epics: Epics = [],
) => {
  return {
    reducers,
    initialState: getInitialState(reducers, initialState),
    epics,
  };
};

export const ofType = (actionType: string) => {
  return filter(({ type }: any) => type === actionType);
};

export default StoreProvider;
