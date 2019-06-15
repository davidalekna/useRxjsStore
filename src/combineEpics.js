import { merge } from 'rxjs';

export default function combineEpics(...epics) {
  return stream => {
    return merge(
      stream,
      ...epics.map(epic => {
        const output$ = epic(stream);
        if (!output$) {
          throw new TypeError(
            `combineEpics: one of the provided Epics "${epic.name ||
              '<anonymous>'}" does not return a stream. Double check you're not missing a return statement!`,
          );
        }
        return output$;
      }),
    );
  };
}
