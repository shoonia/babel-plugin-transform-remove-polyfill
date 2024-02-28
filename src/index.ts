import { declare as declarePlugin } from '@babel/helper-plugin-utils';
import t from '@babel/types';

import { matchTypeof } from './typeof';
import { isAssignTS, isAssingBabel } from './assign';
import {
  objectMember,
  isObjecMember,
  isBuiltInObject,
} from './utils';

const isSymbolIterator = t.buildMatchMemberExpression('Symbol.iterator', false);
const isSymbolFor = t.buildMatchMemberExpression('Symbol.for', false);

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

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
        else if (t.isBinaryExpression(node.test)) {
          const tyof = matchTypeof(node.test);

          if (tyof.match) {
            if (
              isBuiltInObject(tyof.target) ||
              isObjecMember(tyof.target)
            ) {
              path.replaceWith(
                node.test.operator.startsWith(tyof.expect === 'function' ? '=' : '!')
                  ? node.consequent
                  : node.alternate
              );
            }
          }
        }
      },

      IfStatement(path) {
        const node = path.node;

        if (isObjecMember(node.test)) {
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
