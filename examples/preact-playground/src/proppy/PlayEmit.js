import { h } from "preact";
import { compose, withProps, emit } from "proppy";
import { attach } from "proppy-preact";

const P = compose(
  withProps({ interval: 0 }),
  emit((cb, props) => {
    let n = props.interval;

    const i = setInterval(() => {
      n++;
      cb({ interval: n });
    }, 300);

    return () => clearInterval(i);
  })
);

function MyComponent({ interval }) {
  return (
    <div>
      <h2>ProppyJS: emit</h2>

      <h3>Interval: {interval}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
