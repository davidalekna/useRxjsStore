import { ADD_TODO } from "./actions";

const initialState = [
  {
    text: "Consider using Redux",
    completed: true
  },
  {
    text: "Keep all state in a single tree",
    completed: false
  }
];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    default:
      return state;
  }
}
