---
title: ProppyJS
layout: home
---

<section class="examples">
  <div class="container">
    <h2>Examples</h2>

    <div class="columns">
      <div class="column one-quarter">
        <aside class="menu">
          <ul class="menu-list">
            <li>
              <a href="#example-react">
                <img alt="React" src="/img/react-logo.svg" />
                <span>React</span>
              </a>
            </li>
            <li>
              <a href="#example-preact">
                <img alt="Preact" src="/img/preact-logo.png" />
                <span>Preact</span>
              </a>
            </li>
            <li>
              <a href="#example-vue">
                <img alt="Vue" src="/img/vue-logo.png" />
                <span>Vue</span>
              </a>
            </li>
            <li>
              <a href="#example-redux">
                <img alt="Redux" src="/img/redux-logo.png" />
                <span>Redux</span>
              </a>
            </li>
            <li>
              <a href="#example-rx">
                <img alt="RxJS" src="/img/rxjs-logo.png" />
                <span>RxJS</span>
              </a>
            </li>
            <li>
              <a href="#example-js" data-disable-toggler="true">
                <img alt="JavaScript" src="/img/js-logo.png" />
                <span>JavaScript</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <div class="column is-three-quarters" style="position: relative;">
        <div class="toggler">
          <label fo="withProppy">
            <input type="checkbox" id="withProppy" checked="checked" />
            With ProppyJS
          </label>
        </div>

        <div class="tab-content">
          <div id="example-react">


<div class="with-proppy">
<pre class="language-js" data-line="2-3,5-8,24">
```
import React from 'react';
import { compose, withProps, withState } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

function MyComponent({ foo, counter, setCounter }) {
  return (
    <div>
      <p>Foo: {foo}</p>

      <p>Counter: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
</pre>
</div>



<div class="without-proppy">
<pre class="language-js">
```
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foo: 'foo value',
      counter: 0
    };

    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    const currentCounter = this.state.counter;

    this.setState({
      counter: currentCounter + 1
    });
  }

  render() {
    const { foo, counter } = this.state;

    return (
      <div>
        <p>Foo: {foo}</p>

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
</pre>
</div>




            <p>See detailed example <a href="/docs/examples/react-counter">here</a>.</p>
          </div>

          <div id="example-vue">



<div class="with-proppy">
<pre class="language-js" data-line="1-2,4-7,29">
```
import { compose, withProps, withState } from 'proppy';
import { attach } from 'proppy-vue';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

const MyComponent = {
  props: ['foo', 'counter', 'setCounter'],

  render(h) {
    const { foo, counter, setCounter } = this;

    return (
      <div>
        <p>Foo: {foo}</p>

        <p>Counter: {counter}</p>

        <button onClick={() => setCounter(counter + 1)}>
          Increment
        </button>
      </div>
    );
  },
}

export default attach(P)(MyComponent);
```
</pre>
</div>


<div class="without-proppy">
<pre class="language-js">
```
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
</pre>
</div>


            <p>See detailed example <a href="/docs/examples/vue-counter">here</a>.</p>
          </div>

          <div id="example-preact">



<div class="with-proppy">
<pre class="language-js" data-line="2-3,5-8,24">
```
import { h } from 'preact';
import { compose, withProps, withState } from 'proppy';
import { attach } from 'proppy-preact';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

function MyComponent({ foo, counter, setCounter }) {
  return (
    <div>
      <p>Foo: {foo}</p>

      <p>Counter: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
</pre>
</div>


<div class="without-proppy">
<pre class="language-js">
```
import { h } from 'preact';

class MyComponent extends Preact.Component {
  constructor(props) {
    super(props);

    this.state = {
      foo: 'foo value',
      counter: 0
    };

    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    const currentCounter = this.state.counter;

    this.setState({
      counter: currentCounter + 1
    });
  }

  render(props, state) {
    const { foo, counter } = state;

    return (
      <div>
        <p>Foo: {foo}</p>

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
</pre>
</div>



            <p>See further guides <a href="/docs/packages/proppy-preact">here</a>.</p>
          </div>

          <div id="example-redux">



<div class="with-proppy">
<pre class="language-js" data-line="2-3,7-10,24">
```
import React from 'react';
import { withStore } from 'proppy-redux';
import { attach } from 'proppy-react';

import { incrementCounter } from '../actions/counter';

const P = withStore(
  state => ({ counter: state.counter.value }),
  { increment: incrementCounter }
);

function MyComponent({ counter, increment }) {
  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
</pre>
</div>


<div class="without-proppy">
<pre class="language-js">
```
import React from 'react';
import { connect } from 'react-redux';

import { incrementCounter } from '../actions/counter';

function mapState(state) {
  return {
    counter: state.counter.value
  };
}

const mapDispatch = {
  increment: incrementCounter
};

function MyComponent({ counter, increment }) {
  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default connect(mapState, mapDispatch)(MyComponent);
```
</pre>
</div>



            <p>See detailed example <a href="/docs/examples/react-redux">here</a>.</p>
          </div>

          <div id="example-rx">



<div class="with-proppy">
<pre class="language-js" data-line="6-7,9-13,19">
```
import React from 'react';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { withStream } from 'proppy-rx';
import { attach } from 'proppy-react';

const P = withStream(incomingProps$ => {
  return interval(1000).pipe(
    map(n => ({ interval: n }))
  );
});

function MyComponent({ interval }) {
  return <p>Interval: {interval}</p>;
}

export default attach(P)(MyComponent);
```
</pre>
</div>


<div class="without-proppy">
<pre class="language-js">
```
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
    const interval$ = interval(1000).pipe(
      map(n => ({ interval: n }))
    );

    this._rxSubscription = $interval.subscribe(intervalProps => {
      this.setState(intervalProps);
    });
  }

  componentWillUnmount() {
    this._rxSubscription.unsubscribe();
  }

  render() {
    const { interval } = this.props;

    return <p>Interval: {interval}</p>;
  }
}

export default MyComponent;
```
</pre>
</div>



            <p>See detailed example <a href="/docs/examples/react-rxjs">here</a>.</p>
          </div>

          <div id="example-js">




<div class="with-proppy">
<pre class="language-js">
```
import { compose, withProps, withState } from 'proppy';

const P = compose(
  withProps({ foo: 'foo value' }),
  withState('counter', 'setCounter', 0)
);

const p = P();

console.log(p.props);
// {
//   foo: 'foo value',
//   counter: 0,
//   setCounter: Function
// }

p.setCounter(5);

console.log(p.props);
// {
//   foo: 'foo value',
//   counter: 5,
//   setCounter: Function
// }

const unsubscribe = p.subscribe(props => console.log(props));

unsubscribe();
```
</pre>
</div>


<div class="without-proppy">
<pre class="language-js">
```
// without proppy
```
</pre>
</div>




            <p>See quick start guide <a href="/docs/quickstart">here</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="benefits">
  <div class="container">
    <h2>Benefits</h2>

    <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-info" style="background: #e85166;">
              <p class="title">Stateless</p>
              <p class="subtitle">
                Your component layer ends up becoming stateless, and only responsible for accepting props and rendering them.
              </p>
            </article>

            <article class="tile is-child notification is-warning">
              <p class="title">Interoperable</p>
              <p class="subtitle">
                Integrating other libraries to your components layer becomes a breeze with the suite of functions that Proppy provides you.
              </p>
            </article>
          </div>

          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary" style="background: #462c70;">
              <p class="title">Functional</p>
              <p class="subtitle">
                With your props being composed in functions, they become easier to expand as your requirements grow.
              </p>
            </article>

            <article class="tile is-child notification is-success" style="background: #23d160;">
              <p class="title">Testing</p>
              <p class="subtitle">
                With clear separation between props generation and components, you can now unit test them separately with ease.
              </p>
            </article>
          </div>

          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-info">
              <p class="title">Providers</p>
              <p class="subtitle">
                With Proppy's providers, you can set application-wide global object accessible anywhere in your components tree.
              </p>
            </article>

            <article class="tile is-child notification is-primary" style="background: #840046;">
              <p class="title">Freedom</p>
              <p class="subtitle">
                Since Proppy connects to your favourite UI rendering library, you have the freedom to switch with minimal effort.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>

    <p style="text-align: center; font-size: 24px; font-weight: 600; margin-top: 30px;">Sounds good? Let's <a href="/docs/introduction">get started</a>!</p>
  </div>
</section>
