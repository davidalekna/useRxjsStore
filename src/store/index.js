import { combineReducers } from "../useStore";

import todosReducer from "./todos/reducer";
import filterReducer from "./filter/reducer";

export default combineReducers({
  todos: todosReducer,
  filter: filterReducer
});
