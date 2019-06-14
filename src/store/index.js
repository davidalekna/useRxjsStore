import { combineReducers, createStore } from "../useStore";
import todosReducer from "./todos/reducer";
import filterReducer from "./filter/reducer";

export default function configureStore(initialState) {
  const reducers = combineReducers({
    todos: todosReducer,
    filter: filterReducer
  });

  const store = createStore(reducers, initialState || {});

  return store;
}
