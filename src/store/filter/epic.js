import { delay } from 'rxjs/operators';
import { ofType } from '../../useStore';
import { TOGGLE_FILTER } from './actions';

export default function todosEpic(action$) {
  return action$.pipe(
    ofType(TOGGLE_FILTER),
    delay(1000),
  );
}
