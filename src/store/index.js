import { createStore } from '../useStore';
// reducers
import todosReducer from './todos/reducer';
import filterReducer from './filter/reducer';
// epics
import todosEpic from './todos/epic';
import filterEpic from './filter/epic';

export default function configureStore(initialState) {
  const reducers = {
    todos: todosReducer,
    filter: filterReducer,
  };

  const epics = [todosEpic, filterEpic];

  return createStore(reducers, initialState || {}, epics);
}
