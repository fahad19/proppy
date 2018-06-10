import React from "react";
import { compose, withProps, emit, onChange } from "proppy";
import { attach } from "proppy-react";

const P = compose(
  withProps({ interval: 0, type: "even" }),
  emit((cb, props) => {
    let n = props.interval;

    const i = setInterval(() => {
      n++;
      cb({ interval: n });
    }, 1000);

    return () => clearInterval(i);
  }),
  onChange("interval", props => ({
    type: props.interval % 2 === 0 ? "even" : "odd"
  }))
);

function MyComponent({ interval, type }) {
  return (
    <div>
      <h2>ProppyJS: onChange</h2>

      <h3>Interval: {interval}</h3>

      <h3>Number is: {type}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
