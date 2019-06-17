import { delay } from 'rxjs/operators';
import { TOGGLE_FILTER } from './actions';

export default {
  actions: [TOGGLE_FILTER],
  streams: [
    {
      type: TOGGLE_FILTER,
      stream: action$ => action$.pipe(delay(1000)),
    },
  ],
};
