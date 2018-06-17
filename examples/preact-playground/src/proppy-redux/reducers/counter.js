import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "../constants";

const INITIAL_STATE = {
  value: 0
};

export default function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return Object.assign(
        {},
        {
          value: state.value + 1
        }
      );
    case DECREMENT_COUNTER:
      return Object.assign(
        {},
        {
          value: state.value - 1
        }
      );
    default:
      return state;
  }
}
