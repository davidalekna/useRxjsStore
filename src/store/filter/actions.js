export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function toggleFilter(payload) {
  return {
    type: TOGGLE_FILTER,
    payload,
  };
}
