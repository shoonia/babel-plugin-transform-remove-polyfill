import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { matchTypeof } from './typeof';
import { isAssingTS } from './isAssingTS';
import {
  objectMember,
  isObjecMember,
  isBuiltInObject,
  isNodeIdentifier,
} from './utils';

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  const isSymbolIterator = api.types.buildMatchMemberExpression('Symbol.iterator', false);
  const isSymbolFor = api.types.buildMatchMemberExpression('Symbol.for', false);
  // const isObjectHasOwn = api.types.buildMatchMemberExpression('Object.prototype.hasOwnProperty.call', false);

  return {
    name: 'transform-remove-polyfill',
    visitor: {
      BinaryExpression(path) {
        const node = path.node;
        const tyof = matchTypeof(node);

        if (tyof.match) {
          if (isBuiltInObject(tyof.target)) {
            path.replaceWith({
              type: 'BooleanLiteral',
              value: node.operator.startsWith(tyof.expect === 'function' ? '=' : '!'),
            });
          }
          else if (tyof.expect === 'symbol') {
            if (
              isSymbolIterator(tyof.target) ||
              tyof.target.type === 'CallExpression' && isNodeIdentifier(tyof.target.callee, 'Symbol')
            ) {
              path.replaceWith({
                type: 'BooleanLiteral',
                value: node.operator.startsWith('='),
              });
            }
          }
        }
      },

      LogicalExpression(path) {
        const node = path.node;

        if (node.operator === '&&') {
          if (
            isObjecMember(node.left) ||
            isSymbolFor(node.left)
          ) {
            path.replaceWith(node.right);
          }
        }
        else if (node.operator === '||') {
          if (isObjecMember(node.left)) {
            path.replaceWith(node.left);
          }
        }
      },

      /**
       * TODO: Experiment
       */
      // CallExpression(path) {
      //   const node = path.node;

      //   if (
      //     isObjectHasOwn(node.callee) &&
      //     node.arguments.length === 2 &&
      //     node.arguments.every((i) => i.type === 'Identifier')
      //   ) {
      //     node.callee = objectMember('hasOwn');
      //   }
      // },

      ConditionalExpression(path) {
        const node = path.node;

        if (isObjecMember(node.test)) {
          path.replaceWith(node.consequent);
        }
        else if (node.test.type === 'BinaryExpression') {
          const tyof = matchTypeof(node.test);

          if (tyof.match && isBuiltInObject(tyof.target)) {
            path.replaceWith(tyof.expect === 'function' ? node.consequent : node.alternate);
          }
        }
      },

      IfStatement(path) {
        const node = path.node;

        if (isObjecMember(node.test)) {
          node.test = {
            type: 'BooleanLiteral',
            value: true,
          };
        }
      },

      VariableDeclaration(path) {
        const node = path.node;

        if (node.kind === 'var') {
          node.declarations.forEach((declarator) => {
            if (isAssingTS(declarator)) {
              declarator.init = objectMember('assign');
            }
          });
        }
      },
    },
  };
});

export { plugin as default };
