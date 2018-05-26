---
title: "Example: Vue.js Counter with Proppy"
sidebarPartial: docsSidebar
---

# Comparison: Vue.js Counter with Proppy

<!-- MarkdownTOC autolink=true bracket=round -->

- [Without Proppy](#without-proppy)
- [With Proppy](#with-proppy)

<!-- /MarkdownTOC -->

A basic example of a Vue.js component:

* Showing the `counter` value, and
* An `Increment` button incrementing the counter's value by 1
* Component re-renders upon changes

## Without Proppy

```js
const MyComponent = {
  data: function () {
    return {
      counter: 0
    };
  },

  methods: {
    handleIncrement: function () {
      const currentCounter = this.counter;

      this.counter = currentCounter + 1;
    }
  },

  render(h) {
    return (
      <div>
        <p>Counter: {this.counter}</p>

        <button onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    );
  }
};

export default MyComponent;
```

## With Proppy

```js
import { withStateHandlers } from 'proppy';
import { attach } from 'proppy-vue';

const P = withStateHandlers(
  { counter: 0 },
  { handleIncrement: props => () => ({ counter: props.counter + 1 }) }
);

const MyComponent = {
  props: ['counter', 'handleIncrement'],

  render(h) {
    return (
      <div>
        <p>Counter: {this.counter}</p>

        <button onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    );
  }
};

export default attach(P)(MyComponent);
```
