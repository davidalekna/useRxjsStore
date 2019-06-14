import { TOGGLE_FILTER } from './actions';

const initialState = {
  visibilityFilter: true,
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        ...state,
        visibilityFilter: !state.visibilityFilter,
      };
    default:
      return state;
  }
}
