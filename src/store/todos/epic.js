import { filter, delay } from 'rxjs/operators';
import { ADD_TODO, TOGGLE_TODO } from './actions';

export default {
  actions: [ADD_TODO, TOGGLE_TODO],
  streams: [
    {
      type: ADD_TODO,
      stream: action$ =>
        action$.pipe(
          delay(250),
          filter(action => action.payload.text.trim()),
        ),
    },
  ],
};
