import "./style";
import { h, Component, render } from "preact";
import { ProppyProvider } from "proppy-preact";
import createHistory from "history/createBrowserHistory";
import { Router, Route, Switch } from "react-router-dom";

import { routesConfig } from "./config";
import store from "./proppy-redux/store";

const history = createHistory();
const providers = {
  store,
  history
};

export function App() {
  return (
    <ProppyProvider providers={providers}>
      <Router history={history}>
        <div>
          <select
            onChange={e => {
              history.push(e.target.value);
            }}
          >
            <option value="/">-- Choose an example --</option>
            {routesConfig.map(config => (
              <optgroup key={config.name} label={config.name}>
                {config.routes.map(route => (
                  <option key={route.path} value={route.path}>
                    {route.path.replace("/", "")}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <Switch>
            {routesConfig.map(config =>
              config.routes.map(route => <Route key={route.path} {...route} />)
            )}

            <div>
              <h2>ProppyJS Playground with Preact</h2>
            </div>
          </Switch>

          <hr />

          <p>
            Visit <a href="https://proppyjs.com">proppyjs.com</a> for more info
          </p>
        </div>
      </Router>
    </ProppyProvider>
  );
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
