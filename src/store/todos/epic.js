import { ofType } from '../../useStore';
import { ADD_TODO } from './actions';
import { filter } from 'rxjs/operators';

export default function todosEpic(action$) {
  return action$.pipe(
    ofType(ADD_TODO),
    filter(action => action.payload.text.trim('')),
  );
}
