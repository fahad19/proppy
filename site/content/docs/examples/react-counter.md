---
title: "Example: React Counter with and without Proppy"
sidebarPartial: docsSidebar
---

# Example: React Counter with and without Proppy

<!-- MarkdownTOC autolink=true bracket=round -->

- [Without Proppy](#without-proppy)
- [With Proppy](#with-proppy)

<!-- /MarkdownTOC -->

A basic example of a React component:

* Showing the `counter` value, and
* An `Increment` button incrementing the counter's value by 1
* Component re-renders only if `counter` is an even number

## Without Proppy

```js
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };

    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    const { counter } = this.state;

    this.setState({
      counter: counter + 1
    });
  }

  // re-render only if `counter` is an even number
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.counter % 2 !== 0) {
      return false;
    }

    return true;
  }

  render() {
    const { counter } = this.state;

    return (
      <div>
        <p>Counter: {counter}</p>

        <button onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    );
  }
}

export default MyComponent;
```

## With Proppy

```js
import React from 'react';
import { compose, withStateHandlers, shouldUpdate } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withStateHandlers(
    { counter: 0 },
    { handleIncrement: props => () => ({ counter: props.counter + 1 }) }
  ),
  shouldUpdate((prevProps, nextProps) => nextProps.counter % 2 === 0)
);

function MyComponent({ counter, handleIncrement }) {
  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
