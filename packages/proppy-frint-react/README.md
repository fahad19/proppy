# proppy-frint-react

[![npm](https://img.shields.io/npm/v/proppy-frint-react.svg)](https://www.npmjs.com/package/proppy-frint-react)

> FrintJS + React integration for ProppyJS

<!-- MarkdownTOC autolink=true bracket=round -->

- [Guide](#guide)
  - [Installation](#installation)
  - [Usage](#usage)
- [API](#api)
  - [ProppyProvider](#proppyprovider)

<!-- /MarkdownTOC -->

---

# Guide

## Installation

With [npm](https://www.npmjs.com/):

```
$ npm install --save proppy react proppy-react frint-react proppy-frint-react
```

Via [unpkg](https://unpkg.com) CDN:

```html
<script src="https://unpkg.com/proppy@latest/dist/proppy.min.js"></script>
<script src="https://unpkg.com/proppy-frint-react@latest/dist/proppy-frint-react.min.js"></script>

<script>
  // available as `window.ProppyFrintReact`
</script>
```

## Usage

In your Root component, wrap it with `ProppyProvider` component, and it will take care of getting all the providers from your FrintJS app automatically:

```js
// components/Root.js
import React from 'react';
import { ProppyProvider } from 'proppy-frint-react';

import MyComponent from './MyComponent';

export default function Root() {
  return (
    <ProppyProvider>
      <MyComponent />
    </ProppyProvider>
  );
}
```

Now anywhere from your components tree, you can use the `attach` higher-order component:

```js
// components/MyComponent.js
import React from 'react';
import { compose, withProps } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withProps((props, providers) => {
    const { app, foo } = providers;

    return { foo: foo };
  }),
  withProps({ bar: 'bar value' }),
);

function MyComponent(props) {
  const { foo, bar } = props;

  return <p></p>;
}

export default attach(P)(MyComponent);
```

# API

## ProppyProvider

For setting providers at React's context-level.
