import t from '@babel/types';

type SP = keyof typeof String.prototype;
type AP = keyof Array<null>;
type A = keyof ArrayConstructor
type O = keyof ObjectConstructor;
type R = keyof typeof Reflect;

const arrayProtoKeys = new Set<string>([
  'keys', //      38
  'entries', //   38
  'find', //      45
  'findIndex', // 45
  'fill', //      45
  'includes', //  47
  'flat', //      69
  'flatMap', //   69
] satisfies AP[]);

const stringProtoKeys = new Set<string>([
  'trim', //        4
  'normalize', //   34
  'includes', //    41
  'startsWith', //  41
  'endsWith', //    41
  'repeat', //      41
  'codePointAt', // 41
  'padStart', //    57
  'padEnd', //      57
  'trimStart', //   66
  'trimEnd', //     66
] satisfies SP[]);

const objectKeys = new Set<string>([
  'create', //                    5
  'keys', //                      5
  'getPrototypeOf', //            5
  'defineProperty', //            5
  'defineProperties', //          5
  'getOwnPropertyDescriptor', //  5
  'getOwnPropertyNames', //       5
  'freeze', //                    6
  'isFrozen', //                  6
  'seal', //                      6
  'isSealed', //                  6
  'isExtensible', //              6
  'preventExtensions', //         6
  'is', //                        19
  'setPrototypeOf', //            34
  'getOwnPropertySymbols', //     38
  'assign', //                    45
  'values', //                    54
  'entries', //                   54
  'getOwnPropertyDescriptors', // 54
  'fromEntries', //               73
] satisfies O[]);

const arrayKeys = new Set<string>([
  'isArray', // 4
  'of', //      45
  'from', //    45
] satisfies A[]);

const reflectKeys = new Set<string>([
  'apply', //                    49
  'construct', //                49
  'defineProperty', //           49
  'deleteProperty', //           49
  'get', //                      49
  'getOwnPropertyDescriptor', // 49
  'getPrototypeOf', //           49
  'has', //                      49
  'isExtensible', //             49
  'ownKeys', //                  49
  'preventExtensions', //        49
  'set', //                      49
  'setPrototypeOf', //           49
] satisfies R[]);

const builtInConstructor = new Set<string>([
  'ArrayBuffer', //       7
  'Int8Array', //         7
  'Uint8Array', //        7
  'Uint8ClampedArray', // 7
  'Int16Array', //        7
  'Uint16Array', //       7
  'Int32Array', //        7
  'Uint32Array', //       7
  'Float32Array', //      7
  'Float64Array', //      7
  'DataView', //          9
  'Promise', //           32
  'WeakMap', //           36
  'WeakSet', //           36
  'Set', //               38
  'Map', //               38
  'Symbol', //            38
  'Proxy', //             49
  'BigInt',         //    67
  'BigInt64Array',  //    67
  'BigUint64Array', //    67
  'WeakRef', //           84
] as const);

export const oneOfIdentifier = (node: t.Node, set: Set<string>): node is t.Identifier =>
  t.isIdentifier(node, null) && set.has(node.name);

export const functionGroup = (node: t.Node): node is t.MemberExpression => {
  if (t.isMemberExpression(node, { computed: false })) {
    if (t.isIdentifier(node.object, null)) {
      switch (node.object.name) {
        case 'Object':
          return oneOfIdentifier(node.property, objectKeys);
        case 'Array':
          return oneOfIdentifier(node.property, arrayKeys);
        case 'Reflect':
          return oneOfIdentifier(node.property, reflectKeys);
      }
    }
    else if (
      t.isMemberExpression(node.object, { computed: false }) &&
      t.isIdentifier(node.object.property, { name: 'prototype' }) &&
      t.isIdentifier(node.object.object, null)
    ) {
      switch (node.object.object.name) {
        case 'Array':
          return oneOfIdentifier(node.property, arrayProtoKeys);
        case 'String':
          return oneOfIdentifier(node.property, stringProtoKeys);
      }
    }
  }

  return false;
};

export const isBuiltInConstructor = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInConstructor);
