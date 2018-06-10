import React from "react";
import { compose, withProps, withTimer } from "proppy";
import { attach } from "proppy-react";

const P = compose(
  withProps({ hasElapsed: false }),
  withTimer(2000, { hasElapsed: true })
);

function MyComponent({ hasElapsed }) {
  return (
    <div>
      <h2>ProppyJS: withElapsed</h2>

      <h3>Elapsed two seconds: {hasElapsed ? "Yes!" : "No"}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
