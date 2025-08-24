import type t from '@babel/types';
import type { NodePath } from '@babel/core';
import type { Scope } from 'babel__traverse';

export type GlobalIdentifier = (ident: t.Identifier) => boolean;

export const cache = new WeakMap<Scope, Map<string, boolean>>();

const setScope = (path: NodePath) => {
  const map = new Map<string, boolean>();
  cache.set(path.scope, map);
  return map;
};

export const initGlobalIdentifier = (path: NodePath): GlobalIdentifier => {
  const scope = path.scope;

  return (ident) => {
    const id = ident.name;
    const map = cache.get(scope) ?? setScope(path);
    const cached = map.get(id);

    if (typeof cached === 'boolean') {
      return cached;
    }

    const result = !scope.getBinding(id);

    map.set(id, result);

    return result;
  };
};
