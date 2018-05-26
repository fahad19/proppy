---
title: Props
sidebarPartial: docsSidebar
---

# Props

Props are read-only objects, and the concept is popularized by rendering libraries like [React](https://reactjs.org/docs/components-and-props.html) and [Vue.js](https://vuejs.org/v2/guide/components-props.html).

The data available in props are used to render components.

For example, if you happen to have a `Counter` component that renders the counter's value, it may receive a props object in this shape:

```js
const props = { counter: 1 };
```

In a React example, the props are used like this:

```js
// components/Counter.js
import React from 'react';

function Counter(props) {
  return <p>Counter value: {props.counter}</p>;
}
```

## Handlers

Props may also contain handlers (functions) which may trigger an update of the props, resulting in your Component being re-rendered.

Keeping the previous example in mind, we can say that the `Counter` component could receive props in this shape too:

```js
{
  counter: 1,
  setCounter: Function
}
```

The `setCounter` handler could be triggered via an `onClick` event handler for example:

```js
// components/Counter.js
import React from 'react';

function Counter(props) {
  const { counter, setCounter } = props;

  return (
    <div>
      <p>Counter value: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </div>
  );
}
```
