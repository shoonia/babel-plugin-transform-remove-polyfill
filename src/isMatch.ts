import type t from '@babel/types';

type P = string | number | null | undefined;

export const hasown = <T extends object>(obj: T, key: string | keyof T): key is keyof T => {
  return Object.hasOwn(obj, key);
}

export const isMatch = (
  node: t.Node | P | P[],
  pattern: Partial<t.Node> | P | P[]
): boolean => {
  if (node == null || pattern == null) {
    return node === pattern;
  }

  if (Array.isArray(node)) {
    return Array.isArray(pattern) && pattern.every((p, i) => isMatch(node[i], p));
  }

  if (typeof node === 'object') {
    return typeof pattern === 'object' && Object.keys(pattern).every((key) => {
      return hasown(node, key) && hasown(pattern, key) && isMatch(node[key], pattern[key]);
    });
  }

  return Object.is(node, pattern);
}
