import { ADD_TODO, TOGGLE_TODO } from './actions';

const initialState = [
  {
    text: 'Consider using Redux',
    completed: true,
  },
  {
    text: 'Keep all state in a single tree',
    completed: false,
  },
];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case TOGGLE_TODO:
      console.log('toggling');
      return state.map((todo, index) => {
        if (index === action.payload) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}
