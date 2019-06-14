import React, { useEffect, useState } from "react";
import { Subject, merge } from "rxjs";
import { scan } from "rxjs/operators";

const action$ = new Subject();

const useStore = (reducers, initialState = {}, middleware) => {
  const [state, update] = useState(initialState);

  const dispatch = next => action$.next(next);

  useEffect(() => {
    const s = merge(action$)
      .pipe(
        scan((state, action) => {
          // NOTE: currently I can see the only way to add reducer name on actions
          // to recognize which reducer to pick???

          // TODO: select appropriate reducer and state for that reducer
          // reducers[todos](state[todos], actions)

          return reducers(state, action);
        }, initialState)
      )
      .subscribe(update);

    return () => s.unsubscribe();
  }, [action$]);

  return { state, dispatch };
};

export const StoreContext = React.createContext({
  state: {},
  dispatch: () => {}
});

export const StoreProvider = ({ reducers, initialState, children }) => {
  const stateProps = useStore(reducers, initialState);
  const ui = typeof children === "function" ? children(stateProps) : children;
  return <StoreContext.Provider value={stateProps}>{ui}</StoreContext.Provider>;
};

export const useStoreContext = () => {
  const props = React.useContext(StoreContext);
  return props;
};

export const combineReducers = reducers => {
  return reducers;
  // return Object.keys(reducers).reduce((acc, key) => {
  //   return {
  //     ...acc,
  //     [key]: {
  //       action$: new Subject(),
  //       reducer: reducers[key]
  //     }
  //   };
  // }, {});
};

export default useStore;
