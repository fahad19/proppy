import React from "react";
import { withState } from "proppy";
import { attach } from "proppy-react";

const P = withState("counter", "setCounter", 0);

function MyComponent({ counter, setCounter }) {
  return (
    <div>
      <h2>ProppyJS: withState</h2>

      <h3>Counter: {counter}</h3>

      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}

export default attach(P)(MyComponent);
