import type t from '@babel/types';
import type { NodePath } from '@babel/core';
import type { Scope } from 'babel__traverse';

const cache = new WeakMap<Scope, Map<string, boolean>>();

export class GlobalIdentifier {
  readonly #scope: Scope;

  constructor(path: NodePath) {
    this.#scope = path.scope;
  }

  #setScope() {
    const map = new Map<string, boolean>();
    cache.set(this.#scope, map);

    return map;
  }

  isGlobal(ident: t.Identifier): boolean {
    const id = ident.name;
    const map = cache.get(this.#scope) ?? this.#setScope();
    const cached = map.get(id);

    if (typeof cached === 'boolean') {
      return cached;
    }

    const result = !this.#scope.getBinding(id);

    map.set(id, result);

    return result;
  }
}
