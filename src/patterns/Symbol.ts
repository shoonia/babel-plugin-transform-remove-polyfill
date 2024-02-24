import type t from '@babel/types'

export const pStringFunction: t.StringLiteral = {
  type: 'StringLiteral',
  value: 'function'
};

export const pTypeofSymbol: t.UnaryExpression = {
  type: 'UnaryExpression',
  operator: 'typeof',
  prefix: true,
  argument: {
    type: 'Identifier',
    name: 'Symbol'
  }
};
