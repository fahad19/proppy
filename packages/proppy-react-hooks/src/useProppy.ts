import React, { useContext, useEffect, useState } from 'react';
import { ProppyContext } from 'proppy-react';

export function useProppy(P, props = {}) {
  const providers = useContext(ProppyContext);
  const p = P(providers);
  const [proppyState, setProppyState] = useState(p.props);

  useEffect(() => {
    const unsubscribe = p.subscribe(
      newProps => setProppyState(newProps)
    );

    return () => {
      unsubscribe();
      p.destroy();
    };
  });

  return proppyState;
}
