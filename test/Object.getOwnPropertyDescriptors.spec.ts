import { describe, test } from 'node:test';
import { expect } from './setup';

Object.getOwnPropertyDescriptors;

describe('Object.getOwnPropertyDescriptors', () => {
  test('typeof', () => {
    expect(typeof Object.getOwnPropertyDescriptors).toBe('function');
  });

  test('transform #1', async () => {
    await expect(`function fe(e) {
      for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2 ? de(Object(n), !0).forEach((function(t) {
              pe(e, t, n[t])
          }
          )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : de(Object(n)).forEach((function(t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
          }
          ))
      }
      return e
  }`
    ).toBeTransform(`function fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? de(Object(n), !0).forEach(function (t) {
      pe(e, t, n[t]);
    }) : Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
  }
  return e;
}`);
  });
});
