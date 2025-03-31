import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Reflect;

describe('Reflect', () => {
  test('typeof', () => {
    expect(typeof Reflect).toBe('object');
  });

  test('transform #1', async () => {
    // @ts-expect-error Not impl
    expect(typeof Reflect.decorate).toBe('undefined');

    await expect(`function ti(t, e, i, n) {
  var s,
    r = arguments.length,
    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n);else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a);
  return r > 3 && a && Object.defineProperty(e, i, a), a
}`,
    ).toBeTransform(`function ti(t, e, i, n) {
  var s,
    r = arguments.length,
    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if ("function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, n);else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a);
  return r > 3 && a && Object.defineProperty(e, i, a), a;
}`);
  });
});
