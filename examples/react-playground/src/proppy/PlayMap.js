import React from "react";
import { compose, withProps, emit, map } from "proppy";
import { attach } from "proppy-react";

const P = compose(
  withProps({ number: 0 }),
  emit((cb, props) => {
    let n = props.number;

    const i = setInterval(() => {
      n++;
      cb({ number: n });
    }, 200);

    return () => clearInterval(i);
  }),
  map(props => ({
    ...props,
    number: props.number * 100
  }))
);

function MyComponent({ number }) {
  return (
    <div>
      <h2>ProppyJS: map</h2>

      <h3>Number: {number}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
