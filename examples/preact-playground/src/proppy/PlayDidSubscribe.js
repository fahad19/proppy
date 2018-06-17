import { h } from "preact";
import { compose, withState, didSubscribe } from "proppy";
import { attach } from "proppy-preact";

const P = compose(
  withState("stars", "setStars", "n/a"),
  withState("isLoading", "setLoading", false),
  didSubscribe((props, providers) => {
    props.setLoading(true);
    fetch("https://api.github.com/repos/fahad19/proppy")
      .then(res => res.json())
      .then(data => data.stargazers_count)
      .then(stars => {
        props.setLoading(false);
        props.setStars(stars);
      });
  })
);

function MyComponent({ stars, isLoading }) {
  return (
    <div>
      <h2>ProppyJS: didSubscribe</h2>

      <p>
        Stargazers count of{" "}
        <a href="https://github.com/fahad19/proppy">fahad19/proppy</a>: {stars}
      </p>

      <p>Request in progress: {isLoading ? "Yes" : "No"}</p>
    </div>
  );
}

export default attach(P)(MyComponent);
