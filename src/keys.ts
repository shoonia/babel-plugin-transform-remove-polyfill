import type t from '@babel/types';
import type { NodePath } from '@babel/core';
import type { Scope } from 'babel__traverse';

import { isGlobal } from './GlobalIdentifier.ts';
import {
  isIdent,
  isIdentName,
  isMember,
  isPrototype,
} from './utils.ts';

type GlobalKeys = keyof typeof globalThis

type TypedArrayPrototype =
  keyof typeof Array.prototype &
  keyof typeof Int8Array.prototype &
  keyof typeof Int16Array.prototype &
  keyof typeof Int32Array.prototype &
  keyof typeof Uint8Array.prototype &
  keyof typeof Uint16Array.prototype &
  keyof typeof Uint32Array.prototype &
  keyof typeof Uint8ClampedArray.prototype &
  keyof typeof Float32Array.prototype &
  keyof typeof Float64Array.prototype &
  keyof typeof BigInt64Array.prototype &
  keyof typeof BigUint64Array.prototype;

const arrayLike = [
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint16Array',
  'Uint32Array',
  'Uint8ClampedArray',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
] satisfies GlobalKeys[];

const arrayLikeMethods = [
  'toString',
  'join',
  'reverse',
  'slice',
  'sort',
  'indexOf',
  'lastIndexOf',
  'every',
  'some',
  'forEach',
  'map',
  'filter',
  'reduce',
  'reduceRight',
  'find',
  'findIndex',
  'fill',
  'copyWithin',
  'entries',
  'keys',
  'values',
  'at',
  'includes',
  // 'findLast',
  // 'findLastIndex',
  // 'toReversed',
  // 'toSorted',
  // 'with',
] satisfies TypedArrayPrototype[];

const arrayLikeConstructor = new Set(['of', 'from']);
const arrayLikePrototype = new Set(arrayLikeMethods);

export const literals = new Set<t.Node['type']>([
  'NumericLiteral',
  'NullLiteral',
  'BooleanLiteral',
  'BigIntLiteral',
]);

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
] satisfies (keyof SymbolConstructor)[]);

export const builtInConstructor = new Set<string>([
  'Blob', //                 5
  'ArrayBuffer', //          7
  'Int8Array', //            7
  'Uint8Array', //           7
  'Uint8ClampedArray', //    7
  'Int16Array', //           7
  'Uint16Array', //          7
  'Int32Array', //           7
  'Uint32Array', //          7
  'Float32Array', //         7
  'Float64Array', //         7
  'DataView', //             9
  'URL', //                  19
  'Promise', //              32
  'WeakMap', //              36
  'WeakSet', //              36
  'Set', //                  38
  'Map', //                  38
  'Symbol', //               38
  'Proxy', //                49
  'URLSearchParams', //      49
  'BigInt',         //       67
  'BigInt64Array',  //       67
  'BigUint64Array', //       67
  'WeakRef', //              84
  'FinalizationRegistry', // 84
  'AggregateError', //       85
] satisfies GlobalKeys[]);

export const builtInMember = new Set<string>([
  'Math',    //    1
  'JSON',    //    3
  'Intl', //       24
  'Reflect', //    49
  'Atomics', //    68
  'globalThis', // 71
] satisfies GlobalKeys[]);

export const keys = new Map<string, Set<string>>([
  ...arrayLike.map((i) => [i, arrayLikeConstructor] as const),
  [
    'Object', new Set([
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
      'hasOwn', //                    93
      // 'groupBy', //                   117
    ] satisfies (keyof ObjectConstructor)[]),
  ],
  [
    'String', new Set([
      'fromCharCode',  // 1
      'fromCodePoint', // 41
      'raw',           // 41
    ] satisfies (keyof StringConstructor)[]),
  ],
  [
    'Array', new Set([
      'isArray', // 4
      'of', //      45
      'from', //    45
    ] satisfies (keyof ArrayConstructor)[]),
  ],
  [
    'Symbol', new Set([
      'for', //    40
      'keyFor', // 40
    ] satisfies (keyof SymbolConstructor)[]),
  ],
  [
    'Reflect', new Set([
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
    ] satisfies (keyof typeof Reflect)[]),
  ],
  [
    'ArrayBuffer', new Set([
      'isView', // 32
    ] satisfies (keyof ArrayBufferConstructor)[]),
  ],
  [
    'Promise', new Set([
      'all', //           32
      'race', //          32
      'reject', //        32
      'resolve', //       32
      'allSettled', //    76
      'any', //           85
      // 'withResolvers', // 119
      // 'try', //           128
    ] satisfies (keyof PromiseConstructor)[]),
  ],
  [
    'Math', new Set([
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
    ] satisfies (keyof typeof Math)[]),
  ],
  [
    'Date', new Set([
      'now', //   1
      'parse', // 1
      'UTC', //   1
    ] satisfies (keyof DateConstructor)[]),
  ],
  [
    'Number', new Set([
      'isFinite', //      19
      'isNaN', //         25
      'isInteger', //     34
      'isSafeInteger', // 34
      'parseFloat', //    34
      'parseInt', //      34
    ] satisfies (keyof NumberConstructor)[]),
  ],
  [
    'JSON', new Set([
      'parse',     // 3
      'stringify', // 3
    ] satisfies (keyof JSON)[]),
  ],
  [
    'Proxy', new Set([
      'revocable', // 63
    ] satisfies (keyof ProxyConstructor)[]),
  ],
  [
    'Error', new Set([
      'captureStackTrace', // 3
    ] satisfies (keyof ErrorConstructor)[]),
  ],
]);

export const prototypeKeys = new Map<string, Set<string>>([
  ...arrayLike.map((i) => [i, arrayLikePrototype] as const),
  [
    'Array', new Set([
      ...arrayLikeMethods,
      'concat', //         1
      'shift', //          1
      'unshift', //        1
      'splice', //         1
      'pop', //            1
      'push', //           1
      'toLocaleString', // 1
      'flat', //           69
      'flatMap', //        69
      // 'toSpliced', //      110
    ] satisfies (keyof Array<null>)[]),
  ],
  [
    'String', new Set([
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
      'trimLeft', //          66
      'trimRight', //         66
      'matchAll', //          73
      'replaceAll', //        85
      'at', //                92
      // 'toWellFormed', //      111
    ] satisfies (keyof typeof String.prototype)[]),
  ],
  [
    'Promise', new Set([
      'then', //    32
      'catch', //   32
      'finally', // 63
    ] satisfies (keyof Promise<null>)[]),
  ],
  [
    'ArrayBuffer', new Set([
      'slice', // 17
    ] satisfies (keyof ArrayBuffer)[]),
  ],
  [
    'Function', new Set([
      'bind', // 1
    ] satisfies (keyof typeof Function.prototype)[]),
  ],
  [
    'Blob', new Set([
      'slice',       // 21
      'arrayBuffer', // 76
      'stream',      // 76
      'text',        // 76
    ] satisfies (keyof Blob)[]),
  ],
  [
    'DataView', new Set([
      'getInt8',      // 9
      'setInt8',      // 9
      'getInt16',     // 9
      'setInt16',     // 9
      'getInt32',     // 9
      'setInt32',     // 9
      'getUint8',     // 9
      'setUint8',     // 9
      'getUint16',    // 9
      'setUint16',    // 9
      'getUint32',    // 9
      'setUint32',    // 9
      'getFloat32',   // 9
      'setFloat32',   // 9
      'getFloat64',   // 9
      'setFloat64',   // 9
      'getBigInt64',  // 67
      'setBigInt64',  // 67
      'getBigUint64', // 67
      'setBigUint64', // 67
      // 'getFloat16',   // 135
      // 'setFloat16',   // 135
    ] satisfies (keyof DataView)[]),
  ],
]);

export const regExpPrototypeKeys = new Set<string>([
  'global',      // 1
  'ignoreCase',  // 1
  'multiline',   // 1
  'source',      // 1
  'flags',       // 49
  'sticky',      // 49
  'unicode',     // 50
  'dotAll',      // 62
  'hasIndices',  // 90
  // 'unicodeSets', // 112
] satisfies (keyof typeof RegExp.prototype)[]);

const getFunctionGroup = (node: t.Node): t.Identifier | null => {
  if (isIdent(node)) {
    return builtInConstructor.has(node.name) ? node : null;
  }

  if (!isMember(node) || !isIdent(node.property)) {
    return null;
  }

  if (isIdent(node.object)) {
    return keys.get(node.object.name)?.has(node.property.name) ? node.object : null;
  }

  if (isPrototype(node.object)) {
    return prototypeKeys.get(node.object.object.name)?.has(node.property.name) ? node.object.object : null;
  }

  return null;
};

const getBuiltInMember = (node: t.Node): t.Identifier | null =>
  isIdent(node) && builtInMember.has(node.name) ? node : null;

const getWellKnownSymbol = (node: t.Node): t.Identifier | null =>
  isMember(node) &&
  isIdentName(node.object, 'Symbol') &&
  isIdent(node.property) &&
  wellKnownSymbols.has(node.property.name)
    ? node.object
    : null;

export class KeyChecker {
  readonly #scope: Scope;

  constructor(path: NodePath) {
    this.#scope = path.scope;
  }

  isGlobalIdent(ident: t.Identifier): boolean {
    return isGlobal(this.#scope, ident);
  }

  functionGroup(node: t.Node): boolean {
    const ident = getFunctionGroup(node);
    return ident !== null && isGlobal(this.#scope, ident);
  }

  isBuiltInMember(node: t.Node): node is t.Identifier {
    const ident = getBuiltInMember(node);
    return ident !== null && isGlobal(this.#scope, ident);
  }

  isWellKnownSymbol(node: t.Node): node is t.MemberExpression {
    const ident = getWellKnownSymbol(node);
    return ident !== null && isGlobal(this.#scope, ident);
  }
}
