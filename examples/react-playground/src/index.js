import React from "react";
import { render } from "react-dom";
import createHistory from "history/createBrowserHistory";
import { Router, Route, Switch, Link } from "react-router-dom";
import { ProppyProvider } from "proppy-react";

import { routesConfig } from "./config";
import store from "./proppy-redux/store";

const history = createHistory();

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const providers = {
  store,
  history
};

const App = () => (
  <ProppyProvider providers={providers}>
    <Router history={history}>
      <div style={styles}>
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
            <h2>ProppyJS Playground with React</h2>
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

render(<App />, document.getElementById("root"));
