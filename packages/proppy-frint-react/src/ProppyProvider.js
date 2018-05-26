import React from 'react'; // eslint-disable-line
import { observe } from 'frint-react';
import { ProppyProvider as ProppyReactProvider } from 'proppy-react'; // eslint-disable-line

function Base({ providers, children }) {
  return (
    <ProppyReactProvider providers={providers}>
      {children}
    </ProppyReactProvider>
  );
}

export const ProppyProvider = observe((app) => {
  return {
    providers: app.get(),
  };
})(Base);
