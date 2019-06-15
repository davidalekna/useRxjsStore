import { createStore } from '../useStore';
import todosReducer from './todos/reducer';
import filterReducer from './filter/reducer';

export default function configureStore(initialState) {
  const reducers = {
    todos: todosReducer,
    filter: filterReducer,
  };

  return createStore(reducers, initialState || {});
}
