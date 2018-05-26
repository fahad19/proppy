import { ProppyFactory } from './types';
import { create } from './create';

export function handleReceivedProps(fn): ProppyFactory {
  return create({
    handleReceivedProps: fn,
  });
}
