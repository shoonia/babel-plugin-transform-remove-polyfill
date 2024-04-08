import t from '@babel/types';

type SP = keyof typeof String.prototype;
type AP = keyof Array<null>;
type A = keyof ArrayConstructor;
type O = keyof ObjectConstructor;
type R = keyof typeof Reflect;
type S = keyof SymbolConstructor;
type M = keyof typeof Math;
type P = keyof PromiseConstructor;
type PP = keyof typeof Promise.prototype;
type D = keyof DateConstructor;

export const arrayProtoKeys = new Set<string>([
  'indexOf', //        1
  'lastIndexOf', //    1
  'forEach', //        1
  'filter', //         1
  'concat', //         1
  'every', //          1
  'some', //           1
  'map', //            1
  'join', //           1
  'shift', //          1
  'unshift', //        1
  'sort', //           1
  'slice', //          1
  'splice', //         1
  'pop', //            1
  'push', //           1
  'reverse', //        1
  'toLocaleString', // 1
  'toString', //       1
  'reduce', //         3
  'reduceRight', //    3
  'keys', //           38
  'entries', //        38
  'copyWithin', //     45
  'find', //           45
  'findIndex', //      45
  'fill', //           45
  'includes', //       47
  'values', //         66
  'flat', //           69
  'flatMap', //        69
  // 'at', //             92
  // 'findLast', //       97
  // 'findLastIndex', //  97
  // 'toReversed', //     110
  // 'toSorted', //       110
  // 'toSpliced', //      110
  // 'with', //           110
] satisfies AP[]);

export const stringProtoKeys = new Set<string>([
  'indexOf', //           1
  'localeCompare', //     1
  'match', //             1
  'replace', //           1
  'split', //             1
  'substring', //         1
  'search', //            1
  'toLocaleLowerCase', // 1
  'toLocaleUpperCase', // 1
  'toLowerCase', //       1
  'toUpperCase', //       1
  'toString', //          1
  'valueOf', //           1
  'trim', //              4
  'normalize', //         34
  'includes', //          41
  'startsWith', //        41
  'endsWith', //          41
  'repeat', //            41
  'codePointAt', //       41
  'padStart', //          57
  'padEnd', //            57
  'trimStart', //         66
  'trimEnd', //           66
  'matchAll', //          73
  'replaceAll', //        85
  // 'toWellFormed', //      111
] satisfies SP[]);

export const objectKeys = new Set<string>([
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
  // 'groupBy', //                   117
] satisfies O[]);

export const arrayKeys = new Set<string>([
  'isArray', // 4
  'of', //      45
  'from', //    45
] satisfies A[]);

export const reflectKeys = new Set<string>([
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

export const symbolKeys = new Set<string>([
  'for', //    40
  'keyFor', // 40
] satisfies S[]);

export const wellKnownSymbols = new Set<string>([
  'unscopables', //        38
  'iterator', //           43
  'toPrimitive', //        47
  'isConcatSpreadable', // 48
  'toStringTag', //        49
  'hasInstance', //        50
  'match', //              50
  'replace', //            50
  'search', //             50
  'split', //              50
  'species', //            51
  'asyncIterator', //      63
  'matchAll', //           73
] satisfies S[]);

export const mathKeys = new Set<string>([
  'abs', //    1
  'acos', //   1
  'asin', //   1
  'atan', //   1
  'atan2', //  1
  'ceil', //   1
  'cos', //    1
  'exp', //    1
  'floor', //  1
  'log', //    1
  'max', //    1
  'min', //    1
  'pow', //    1
  'random', // 1
  'round', //  1
  'sin', //    1
  'sqrt', //   1
  'tan', //    1
  'imul', //   28
  'acosh', //  38
  'asinh', //  38
  'atanh', //  38
  'cbrt', //   38
  'clz32', //  38
  'cosh', //   38
  'expm1', //  38
  'fround', // 38
  'hypot', //  38
  'log10', //  38
  'log1p', //  38
  'log2', //   38
  'sign', //   38
  'sinh', //   38
  'tanh', //   38
  'trunc', //  38
] satisfies M[]);

export const promiseKeys = new Set<string>([
  'all', //           32
  'race', //          32
  'reject', //        32
  'resolve', //       32
  'allSettled', //    76
  'any', //           85
  // 'withResolvers', // 119
] satisfies P[]);

export const promiseProtoKeys = new Set<string>([
  'then', //    32
  'catch', //   32
  'finally', // 63
] satisfies PP[]);

export const dateKeys = new Set<string>([
  'now', //   1
  'parse', // 1
  'UTC', //   1
] satisfies D[]);

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

const builtInMember = new Set<string>([
  'Reflect', // 49
  'Atomics', // 68
] as const);

export const oneOfIdentifier = (node: t.Node, set: Set<string>): node is t.Identifier =>
  t.isIdentifier(node, null) && set.has(node.name);

export const functionGroup = (node: t.Node): node is t.MemberExpression => {
  if (
    t.isMemberExpression(node, { computed: false }) &&
    t.isIdentifier(node.property, null)
  ) {
    const name = node.property.name;

    if (t.isIdentifier(node.object, null)) {
      switch (node.object.name) {
        case 'Object':
          return objectKeys.has(name);
        case 'Array':
          return arrayKeys.has(name);
        case 'Symbol':
          return symbolKeys.has(name);
        case 'Reflect':
          return reflectKeys.has(name);
        case 'ArrayBuffer':
          return name === 'isView'; // 32
        case 'Promise':
          return promiseKeys.has(name);
        case 'Math':
          return mathKeys.has(name);
        case 'Date':
          return dateKeys.has(name);
      }
    }
    else if (
      t.isMemberExpression(node.object, { computed: false }) &&
      t.isIdentifier(node.object.property, { name: 'prototype' }) &&
      t.isIdentifier(node.object.object, null)
    ) {
      switch (node.object.object.name) {
        case 'Array':
          return arrayProtoKeys.has(name);
        case 'String':
          return stringProtoKeys.has(name);
        case 'Promise':
          return promiseProtoKeys.has(name);
        case 'Function':
          return name === 'bind';
      }
    }
  }

  return false;
};

export const isBuiltInConstructor = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInConstructor);

export const isBuiltInMember = (node: t.Node): node is t.Identifier =>
  oneOfIdentifier(node, builtInMember);

export const isWellKnownSymbol = (node: t.Node): node is t.MemberExpression =>
  t.isMemberExpression(node, { computed: false }) &&
  t.isIdentifier(node.object, { name: 'Symbol' }) &&
  oneOfIdentifier(node.property, wellKnownSymbols);
