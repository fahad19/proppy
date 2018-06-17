import { h } from "preact";
import { compose, withProps, withState } from "proppy";
import { attach } from "proppy-preact";

const P = compose(
  withProps({ foo: "foo value" }),
  withProps((parentProps, providers) => ({
    bar: `bar with ${parentProps.foo}`
  })),
  withState("counter", "setCounter", 0)
);

function MyComponent({ foo, bar, counter, setCounter }) {
  return (
    <div>
      <h2>ProppyJS: compose</h2>

      <h3>Foo: {foo}</h3>

      <h3>Bar: {bar}</h3>

      <h3>Counter: {counter}</h3>

      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
}

export default attach(P)(MyComponent);
