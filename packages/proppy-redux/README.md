# proppy-redux

[![npm](https://img.shields.io/npm/v/proppy-redux.svg)](https://www.npmjs.com/package/proppy-redux)

> Redux integration package for ProppyJS

<!-- MarkdownTOC autolink=true bracket=round -->

- [Guide](#guide)
  - [Installation](#installation)
  - [Usage](#usage)
- [API](#api)
  - [withStore](#withstore)

<!-- /MarkdownTOC -->

---

# Guide

## Installation

With [npm](https://www.npmjs.com/):

```
$ npm install --save proppy redux proppy-redux
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>
<script src="https://unpkg.com/proppy-redux@latest/dist/proppy-redux.min.js"></script>

<script>
  // available as `window.ProppyRedux`
</script>
```

## Usage

With the `withStore` function, you can map state and dispatchable actions from Redux:

```js
import { compose } from 'proppy';
import { withStore } from 'proppy-redux';
import { createStore };

// Redux reducer
import reducer from '../reducers';

// Redux action creators
import { incrementCounter } from '../actions/counter';

function mapState(state) {
  return {
    counter: state.counter.value,
  };
}

const P = compose(
  withStore(
    mapState,
    {
      increment: incrementCounter,
    }
  )
);

// we should have the Redux store set in our providers
const providers = {
  store: createStore(myReducer),
};

// now we can create our instance
const p = P(providers);

console.log(p.props);
// {
//   counter: 0,
//   increment: Function
// }
```

# API

## withStore

> withStore(mapState, mapDispatch, options)

**Arguments:**

* `mapState` (`Function`): Accepting Store's state, and returning mapped state
* `mapDispatch` (`Object`): Action creators keyed by their names
* `options` (`Object` [optional])
* `options.providerName` (`String`): The provider name, defaults to `store`
