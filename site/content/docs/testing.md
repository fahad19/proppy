---
title: Testing
sidebarPartial: docsSidebar
---

# Testing

Unit testing Proppy is pretty straight forward because of it's functional nature.

Assuming you are using Proppy and React together, your Component file may look like this:

```js
// MyComponent.js
import React from 'react';
import { compose, withProps } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withProps({ foo: 'foo value' })
);

function MyComponent(props) {
  return <p></p>;
}

export default attach(P)(MyComponent);
```

To make unit testing easier, we can change our original module to contain only named exports, so that we can import Proppy factory and the base stateless component separately:

```js
// MyComponent.js
import React from 'react';
import { compose, withProps } from 'proppy';
import { attach } from 'proppy-react';

export const P = compose(
  withProps({ foo: 'foo value' })
);

export function Base(props) {
  return <p></p>;
}

export const MyComponent = attach(P)(Base);
```

Now in our test file, we can import both the Proppy factory and the base component separately and unit test them:

```js
// MyComponent.spec.js
import { P, Base } from './MyComponent';

describe('MyComponent', () => {
  test('Proppy', () => {
    const mockedProviders = {};
    const p = P(mockedProviders);

    expect(p.props).toEqual({
      foo: 'foo value'
    });

    p.destroy();
  });

  test('Component', () => {
    // test `Base` React component
  });
})
```
