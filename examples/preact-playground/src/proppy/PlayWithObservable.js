import { h } from "preact";
import { withObservable } from "proppy";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { attach } from "proppy-preact";

const P = withObservable(() => {
  return interval(300).pipe(
    map(n => ({
      interval: n
    }))
  );
});

function MyComponent({ interval }) {
  return (
    <div>
      <h2>ProppyJS: withObservable</h2>

      <h3>Interval: {interval}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
