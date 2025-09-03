import type t from '@babel/types';
import type { Scope } from 'babel__traverse';

export const isGlobal = (scope: Scope, ident: t.Identifier) => !scope.getBinding(ident.name);
