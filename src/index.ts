import { declare as declarePlugin } from '@babel/helper-plugin-utils';
import t from '@babel/types';

import { matchTypeof } from './typeof';
import { isAssignTS, isAssingBabel } from './assign';
import {
  objectMember,
  isBuiltInObject,
  functionGrop,
  isWellKnownSymbol,
} from './utils';

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  return {
    name: 'transform-remove-polyfill',
    visitor: {
      BinaryExpression(path) {
        const node = path.node;
        const tyof = matchTypeof(node);

        if (tyof.match) {
          if (
            isBuiltInObject(tyof.target) ||
            functionGrop(tyof.target)
          ) {
            path.replaceWith({
              type: 'BooleanLiteral',
              value: node.operator.startsWith(tyof.expect === 'function' ? '=' : '!'),
            });
          }
          else if (t.isIdentifier(tyof.target, { name: 'Reflect' })) {
            path.replaceWith({
              type: 'BooleanLiteral',
              value: node.operator.startsWith(tyof.expect === 'object' ? '=' : '!'),
            });
          }
          else if (tyof.expect === 'symbol') {
            if (
              isWellKnownSymbol(tyof.target) ||
              t.isCallExpression(tyof.target) &&
              t.isIdentifier(tyof.target.callee, { name: 'Symbol' })
            ) {
              path.replaceWith({
                type: 'BooleanLiteral',
                value: node.operator.startsWith('='),
              });
            }
          }
        }
      },

      LogicalExpression: {
        exit(path) {
          const node = path.node;

          if (functionGrop(node.left)) {
            path.replaceWith(node.operator === '&&' ? node.right : node.left);
          }
          else if (t.isBooleanLiteral(node.left)) {
            if (node.operator === '&&') {
              path.replaceWith(node.left.value ? node.right : node.left);
            } else if (node.operator === '||') {
              path.replaceWith(node.left.value ? node.left : node.right);
            }
          }
        },
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

      ConditionalExpression: {
        exit(path) {
          const node = path.node;

          if (functionGrop(node.test)) {
            path.replaceWith(node.consequent);
          }
          else if (t.isBooleanLiteral(node.test)) {
            path.replaceWith(node.test.value ? node.consequent : node.alternate);
          }
        },
      },

      IfStatement(path) {
        const node = path.node;

        if (functionGrop(node.test)) {
          node.test = t.booleanLiteral(true);
        }
      },

      VariableDeclaration(path) {
        const node = path.node;

        if (node.kind === 'var') {
          node.declarations.forEach((declarator) => {
            if (isAssignTS(declarator)) {
              declarator.init = objectMember('assign');
            }
          });
        }
      },

      FunctionDeclaration(path) {
        const node = path.node;

        if (isAssingBabel(node)) {
          path.replaceWith({
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: node.id!,
                init: objectMember('assign'),
              },
            ],
          });
        }
      },
    },
  };
});

export { plugin as default };
