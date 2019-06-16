import { tap } from 'rxjs/operators';
import { ofType } from '../../useStore';
import { ADD_TODO } from './actions';

export default function todosEpic($actions) {
  return $actions.pipe(ofType(ADD_TODO));
}
