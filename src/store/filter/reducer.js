const initialState = {
  visibilityFilter: "SHOW_ALL"
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "some":
      return state;
    default:
      return state;
  }
}
