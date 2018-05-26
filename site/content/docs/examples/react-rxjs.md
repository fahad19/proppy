---
title: "Example: React + RxJS with and without Proppy"
sidebarPartial: docsSidebar
---

# Example: React + RxJS with and without Proppy

<!-- MarkdownTOC autolink=true bracket=round -->

- [Without Proppy](#without-proppy)
- [With Proppy](#with-proppy)

<!-- /MarkdownTOC -->

A basic example of a React component:

* Showing `interval` coming from RxJS Observable
* Interval starts as soon as component mounts
* Component renders only when `interval` is an even number
* Observable is unsubscribed when component is unmounted

## Without Proppy

```js
import React from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: 0
    };
  }

  componentDidMount() {
    // emits an integer every 1 second
    const interval$ = interval(1000).pipe(
      map(n => ({
        inverval: n
      }))
    );

    this._subscription = interval$.subscribe(
      result => this.setState(result)
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.interval % 2 !== 0) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this._subscription.unsubscribe();
  }

  render() {
    const { interval } = this.state;

    return <p>Interval: {interval}</p>;
  }
}

export default MyComponent;
```

## With Proppy

```js
import React from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { compose, withObservable, shouldUpdate } from 'proppy';

const P = compose(
  withObservable(props => interval(1000).pipe(
    map(n => ({ interval: n }))
  )),
  shouldUpdate((prevProps, nextProps) => nextProps.counter % 2 === 0)
);

function MyComponent({ interval }) {
  return <p>Interval: {interval}</p>;
}

export default attach(P)(MyComponent);
```

For advanced usage, look into `proppy-rx` package, when you can also access incoming props as an Observable.
