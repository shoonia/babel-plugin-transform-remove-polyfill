import type * as t from '@babel/types';
import type { Scope } from '@babel/traverse';

export const isGlobal = (scope: Scope, ident: t.Identifier) => !scope.getBinding(ident.name);
