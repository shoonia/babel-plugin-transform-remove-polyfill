import { describe, test } from 'node:test';
import { expect } from './setup.ts';

describe('GlobalIdentifier', () => {
  test('transform #1 - global', () => {
    expect(`function hello(Symbol) {
  if (Symbol) {
    console.log(1);
  }
}
if (Symbol) {
  console.log(2);
}`,
    ).toBeTransform(`function hello(Symbol) {
  if (Symbol) {
    console.log(1);
  }
}
if (true) {
  console.log(2);
}`);
  });

  test('transform #2 - import', () => {
    expect(`import { Symbol } from 'core-js';
function hello() {
  if (Symbol) {
    console.log(1);
  }
  if (Proxy) {
    console.log(2);
  }
}
if (Symbol) {
  console.log(3);
}
 if (Proxy) {
  console.log(4);
}`,
    ).toBeTransform(`import { Symbol } from 'core-js';
function hello() {
  if (Symbol) {
    console.log(1);
  }
  if (true) {
    console.log(2);
  }
}
if (Symbol) {
  console.log(3);
}
if (true) {
  console.log(4);
}`);
  });
});
