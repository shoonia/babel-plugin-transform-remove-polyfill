import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Object.getOwnPropertySymbols;

describe('Object.getOwnPropertySymbols', () => {
  test('typeof', () => {
    expect(typeof Object.getOwnPropertySymbols).toBe('function');
  });

  test('transform #0', async () => {
    await expect(`function a(t, d) {
      var e, n = Object.keys(t);
      return Object.getOwnPropertySymbols && (e = Object.getOwnPropertySymbols(t), d && (e = e.filter(function(d) {
          return Object.getOwnPropertyDescriptor(t, d).enumerable
      })), n.push.apply(n, e)), n
  }`)
      .toBeTransform(`function a(t, d) {
  var e,
    n = Object.keys(t);
  return e = Object.getOwnPropertySymbols(t), d && (e = e.filter(function (d) {
    return Object.getOwnPropertyDescriptor(t, d).enumerable;
  })), n.push.apply(n, e), n;
}`);
  });

  test('transform #1', async () => {
    await expect(`var o = this && this.__rest || function(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var o = 0;
    for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  }
  return n;
};`)
      .toBeTransform(`var o = this && this.__rest || function (e, t) {
  var n = {};
  for (var r in e) Object.hasOwn(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (null != e && true) {
    var o = 0;
    for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  }
  return n;
};`);
  });
});
