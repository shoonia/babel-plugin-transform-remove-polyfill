import type t from '@babel/types';
import type { Scope } from 'babel__traverse';

type TCache = Map<string, boolean>;

const cache = new WeakMap<Scope, TCache>();

const setScope = (scope: Scope): TCache => {
  const map: TCache = new Map();
  cache.set(scope, map);

  return map;
};

export const isGlobal = (scope: Scope, ident: t.Identifier): boolean => {
  const id = ident.name;
  const map = cache.get(scope) ?? setScope(scope);
  const cached = map.get(id);

  if (typeof cached === 'boolean') {
    return cached;
  }

  const result = !scope.getBinding(id);

  map.set(id, result);

  return result;
};
