export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: id,
  };
}
