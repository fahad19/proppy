import { h } from "preact";
import { compose, withState, withHandlers } from "proppy";
import { attach } from "proppy-preact";

const P = compose(
  withState("counter", "setCounter", 0),
  withHandlers({
    incrementBy: (props, providers) => n => {
      props.setCounter(props.counter + n);
    }
  })
);

function MyComponent({ counter, incrementBy }) {
  return (
    <div>
      <h2>ProppyJS: withHandlers</h2>

      <h3>Counter: {counter}</h3>

      <button onClick={() => incrementBy(5)}>Increment by 5</button>
    </div>
  );
}

export default attach(P)(MyComponent);
