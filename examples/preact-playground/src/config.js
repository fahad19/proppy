import { h } from "preact";

// proppy
import PlayWithState from "./proppy/PlayWithState";
import PlayWithProps from "./proppy/PlayWithProps";
import PlayCompose from "./proppy/PlayCompose";
import PlayWithReducer from "./proppy/PlayWithReducer";
import PlayWithHandlers from "./proppy/PlayWithHandlers";
import PlayWithStateHandlers from "./proppy/PlayWithStateHandlers";
import PlayWithObservable from "./proppy/PlayWithObservable";
import PlayWithTimer from "./proppy/PlayWithTimer";
import PlayEmit from "./proppy/PlayEmit";
import PlayOnChange from "./proppy/PlayOnChange";
import PlayMap from "./proppy/PlayMap";
import PlayShouldUpdate from "./proppy/PlayShouldUpdate";
import PlayDidSubscribe from "./proppy/PlayDidSubscribe";

// proppy-redux
import PlayWithStore from "./proppy-redux/components/PlayWithStore";

// proppy-rx
import PlayWithStream from "./proppy-rx/PlayWithStream";

export const routesConfig = [
  {
    name: "proppy",
    routes: [
      { path: "/withProps", render: () => <PlayWithProps /> },
      { path: "/withState", render: () => <PlayWithState /> },
      { path: "/compose", render: () => <PlayCompose /> },
      { path: "/withReducer", render: () => <PlayWithReducer /> },
      { path: "/withHandlers", render: () => <PlayWithHandlers /> },
      { path: "/withStateHandlers", render: () => <PlayWithStateHandlers /> },
      { path: "/withObservable", render: () => <PlayWithObservable /> },
      { path: "/withTimer", render: () => <PlayWithTimer /> },
      { path: "/emit", render: () => <PlayEmit /> },
      { path: "/onChange", render: () => <PlayOnChange /> },
      { path: "/map", render: () => <PlayMap /> },
      { path: "/shouldUpdate", render: () => <PlayShouldUpdate /> },
      { path: "/didSubscribe", render: () => <PlayDidSubscribe /> }
    ]
  },
  {
    name: "proppy-redux",
    routes: [{ path: "/withStore", render: () => <PlayWithStore /> }]
  },
  {
    name: "proppy-rx",
    routes: [
      { path: "/withStream", render: props => <PlayWithStream {...props} /> }
    ]
  }
];
