import { filter, debounceTime } from 'rxjs/operators';
import { ADD_TODO, TOGGLE_TODO } from './actions';

export default {
  actions: [ADD_TODO, TOGGLE_TODO],
  streams: [
    {
      type: ADD_TODO,
      stream: action$ =>
        action$.pipe(filter(action => action.payload.text.trim())),
    },
  ],
};
