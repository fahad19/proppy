import React from "react";
import { compose, withProps, emit, shouldUpdate } from "proppy";
import { attach } from "proppy-react";

const P = compose(
  withProps({ number: 0 }),
  emit((cb, props) => {
    let n = props.number;

    const i = setInterval(() => {
      n++;
      cb({ number: n });
    }, 1000);

    return () => clearInterval(i);
  }),
  shouldUpdate((prevProps, nextProps) => {
    return nextProps.number % 2 === 0;
  })
);

function MyComponent({ number }) {
  return (
    <div>
      <h2>ProppyJS: shouldUpdate</h2>

      <h3>Number: {number}</h3>

      <p>(Re-renders when number is even)</p>
    </div>
  );
}

export default attach(P)(MyComponent);
