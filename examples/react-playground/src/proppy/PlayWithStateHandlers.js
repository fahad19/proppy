import React from "react";
import { withStateHandlers } from "proppy";
import { attach } from "proppy-react";

const P = withStateHandlers(
  // initial state
  {
    counter: 0
  },

  // handlers
  {
    incrementBy: (props, providers) => n => {
      // return new state
      return {
        counter: props.counter + n
      };
    }
  }
);

function MyComponent({ counter, incrementBy }) {
  return (
    <div>
      <h2>ProppyJS: withStateHandlers</h2>

      <h3>Counter: {counter}</h3>

      <button onClick={() => incrementBy(5)}>Increment by 5</button>
    </div>
  );
}

export default attach(P)(MyComponent);
