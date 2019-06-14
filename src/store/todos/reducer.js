import { ADD_TODO } from "./actions";

export default function todosReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
}
