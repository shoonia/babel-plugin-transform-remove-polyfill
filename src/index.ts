import type { Visitor, PluginPass } from '@babel/core';
import t from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

import { type Options, transformerCallExpression } from './transformers';
import { matchTypeof } from './tyof';
import {
  functionGroup,
  isBuiltInMember,
  isBuiltInConstructor,
} from './utils';

const plugin = declarePlugin((api, options: Options = {}) => {
  api.assertVersion(7);

  const transformers = transformerCallExpression(options.transform);
  const isObjectAssign = t.buildMatchMemberExpression('Object.assign', false);

  const visitor: Visitor<PluginPass> = {
    IfStatement: {
      exit(path) {
        const node = path.node;

        if (functionGroup(node.test)) {
          node.test = t.booleanLiteral(true);
        }

        if (
          node.alternate != null &&
          t.isBooleanLiteral(node.test, { value: true })
        ) {
          node.alternate = undefined;
        }
      },
    },

    LogicalExpression: {
      exit(path) {
        const node = path.node;

        if (functionGroup(node.left)) {
          path.replaceWith(node.operator === '&&' ? node.right : node.left);
        }
        else if (t.isBooleanLiteral(node.left, null)) {
          path.replaceWith(
            node.operator === '&&'
              ? node.left.value
                ? node.right
                : node.left
              : node.operator === '||'
                ? node.left.value
                  ? node.left
                  : node.right
                : node.left
          );
        }
      },
    },

    ConditionalExpression: {
      exit(path) {
        const node = path.node;

        if (functionGroup(node.test)) {
          path.replaceWith(node.consequent);
        }
        else if (t.isBooleanLiteral(node.test, null)) {
          path.replaceWith(node.test.value ? node.consequent : node.alternate);
        }
      },
    },

    BinaryExpression(path) {
      const node = path.node;
      const tyof = matchTypeof(node);

      if (tyof.match) {
        if (functionGroup(tyof.target) || isBuiltInConstructor(tyof.target)) {
          path.replaceWith({
            type: 'BooleanLiteral',
            value: node.operator.startsWith(tyof.expect === 'function' ? '=' : '!'),
          });
        }
        else if (isBuiltInMember(tyof.target)) {
          path.replaceWith({
            type: 'BooleanLiteral',
            value: node.operator.startsWith(tyof.expect === 'object' ? '=' : '!'),
          });
        }
      }
    },

    CallExpression: {
      exit(path) {
        const node = path.node;

        if (isObjectAssign(node.callee) && node.arguments.length > 0) {
          const arg = node.arguments[0];

          if (t.isCallExpression(arg, null) && isObjectAssign(arg.callee)) {
            node.arguments.splice(0, 1, ...arg.arguments);
          }
        }
      },
    },
  };

  if (transformers.length > 0) {
    // @ts-expect-error: We know, the CallExpression is the object and exists
    visitor.CallExpression.enter = (path) => {
      transformers.some((t) => t(path.node));
    };
  }

  return {
    name: 'transform-remove-polyfill',
    visitor,
  };
});

export { plugin as default };
