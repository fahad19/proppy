import React from "react";
import { withStore } from "proppy-redux";
import { attach } from "proppy-react";

import { incrementCounter, decrementCounter } from "../actions/counter";

function mapState(state) {
  return {
    counter: state.counter.value
  };
}

const mapDispatch = {
  increment: incrementCounter,
  decrement: decrementCounter
};

const P = withStore(mapState, mapDispatch);

function MyComponent({ counter, increment, decrement }) {
  return (
    <div>
      <h2>ProppyJS: withStore</h2>

      <h3>Counter: {counter}</h3>

      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default attach(P)(MyComponent);
