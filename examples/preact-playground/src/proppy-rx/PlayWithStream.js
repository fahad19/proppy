import { h } from "preact";
import { withStream } from "proppy-rx";
import { map } from "rxjs/operators";
import { attach } from "proppy-preact";

const P = withStream(props$ =>
  props$.pipe(
    map(props => ({
      url: props.match.url
    }))
  )
);

function MyComponent({ url }) {
  return (
    <div>
      <h2>ProppyJS: withStream</h2>

      <h3>URL: {url}</h3>
    </div>
  );
}

export default attach(P)(MyComponent);
