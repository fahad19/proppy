---
title: "Example: React Fetch Request with and without Proppy"
sidebarPartial: docsSidebar
---

# Example: React Fetch Request with and without Proppy

<!-- MarkdownTOC autolink=true bracket=round -->

- [Without Proppy](#without-proppy)
- [With Proppy](#with-proppy)

<!-- /MarkdownTOC -->

A basic example of a React component:

* Receiving `productId` prop
* Handler for fetching a Product by that ID from server
* Fetch it when component is mounted
* Render the Product's title
* Refresh button to fetch the Product again
* A loading indicator when request is in progress

## Without Proppy

```js
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      isLoading: false
    };

    this.handleFetch = this.handleFetch.bind(this);
  }

  handleFetch(productId) {
    this.setState({
      isLoading: true
    });

    fetch(`/api/products/${productId}.json`)
      .then(res => res.json())
      .then(res => this.setState({
        product: res.data,
        isLoading: false
      }));
  }

  componentDidMount() {
    const { productId } = this.props;

    this.handleFetch(productId);
  }

  render() {
    const { productId } = this.props;
    const { product, isLoading } = this.state;

    return (
      <div>
        {loading && <p>Loading...</p>}

        <p>Title: {product && product.title}</p>

        <button onClick={() => this.handleFetch(productId)}>
          Refresh
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
import { compose, withState, withHandlers, didSubscribe } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withState('product', 'setProduct', null),
  withState('isLoading', 'setLoading', false),
  withHandlers({
    handleFetch: props => productId => {
      props.setLoading(true);

      return fetch(`/api/products/${productId}.json`)
        .then(res => {
          props.setProduct(res.data);
          props.setLoading(false);
        });
    }
  }),
  didSubscribe(props => props.handleFetch(props.productId))
);

function MyComponent({ productId, product, isLoading, handleFetch }) {
  return (
    <div>
      {isLoading && <p>Loading...</p>}

      <p>Title: {product && product.title}</p>

      <button onClick={() => handleFetch(productId)}>
        Refresh
      </button>
    </div>
  );
}

export default attach(P)(MyComponent);
```
