import { merge } from 'rxjs';
import { Epics, Epic, Stream } from './types';
import { ofType } from './useStore';

export default function combineEpics(epics: Epics): any {
  const allActions = epics.reduce(
    (acc: string[], epic: Epic) => [...acc, ...epic.actions],
    [],
  );
  const usedActions = epics.reduce((acc: string[], epic: Epic) => {
    return [...acc, ...epic.streams.map(s => s.type)];
  }, []);
  const unusedActions = allActions
    .map(a => (!usedActions.includes(a) ? a : null))
    .filter(Boolean);
  const declaredStreams = epics.reduce((acc: Stream[], val: Epic) => {
    return [...acc, ...val.streams];
  }, []);

  return (stream$: any) => {
    return merge(
      ...unusedActions.map((type: any) => {
        return stream$.pipe(ofType(type));
      }),
      ...declaredStreams.map(({ type, stream }) => {
        return stream(stream$.pipe(ofType(type)));
      }),
    );
  };
}
