---
title: Bundling
sidebarPartial: docsSidebar
---

# Bundling

Even though most packages are pretty small, you can optimize your production bundles even further by only including the functions that your application uses.

## Tree shaking

If you are bundling your application with Webpack, you can consider applying tree shaking: [https://webpack.js.org/guides/tree-shaking/](https://webpack.js.org/guides/tree-shaking/).

## Import individually

If you are unable to benefit from tree shaking in your environment, you can also import the functions from Proppy packages individually:

```js
import { compose } from 'proppy/compose';
import { withProps } from 'proppy/withProps';

import { attach } from 'proppy-react/attach';
```
