import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProppyContext } from 'proppy-react';

export function useProppy(P, initialProps = {}) {
  const providers = useContext(ProppyContext);
  const p = P(providers);
  const [proppyState, setProppyState] = useState(p.props);

  useEffect(() => {
    const unsubscribe = p.subscribe(
      newProps => {
        console.log('newProps', newProps);
        // setProppyState(newProps);
      }
    );

    return () => {
      unsubscribe();
      p.destroy();
    };
  });

  return proppyState;
}
