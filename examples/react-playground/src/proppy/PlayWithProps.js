import React from "react";
import { withProps } from "proppy";
import { attach } from "proppy-react";

const P = withProps({
  foo: "foo value"
});

function MyComponent({ foo }) {
  return (
    <div>
      <h2>ProppyJS: withProps</h2>

      <h3>Foo: {foo}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
