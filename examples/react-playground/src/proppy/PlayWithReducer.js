import React from "react";
import { withReducer } from "proppy";
import { attach } from "proppy-react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const P = withReducer("counter", "dispatch", reducer, { value: 0 });

function MyComponent({ counter, dispatch }) {
  return (
    <div>
      <h2>ProppyJS: withReducer</h2>

      <h3>Counter: {counter.value}</h3>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
}

export default attach(P)(MyComponent);
