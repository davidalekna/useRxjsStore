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

  // NOTE: something is wrong when passing down epics
  // adds todos twice and skips filters
  const epics = [todosEpic, filterEpic];

  return createStore(reducers, initialState || {});
}
