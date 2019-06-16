import { tap, debounceTime } from 'rxjs/operators';
import { ofType } from '../../useStore';
import { TOGGLE_FILTER } from './actions';

export default function todosEpic($actions) {
  return $actions.pipe(
    ofType(TOGGLE_FILTER),
    debounceTime(1000),
  );
}
