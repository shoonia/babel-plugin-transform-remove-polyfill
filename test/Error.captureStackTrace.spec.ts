import { describe, test } from 'node:test';
import { expect } from './setup.ts';

void Error.captureStackTrace;

describe('Error.captureStackTrace', () => {
  test('typeof', () => {
    expect(typeof Error.captureStackTrace).toBe('function');
  });

  test('transform', async () => {
    await expect(`class b extends Error {
  constructor(e, t, n) {
    super(t),
    this.code = e,
    this.customData = n,
    this.name = "FirebaseError",
    Object.setPrototypeOf(this, b.prototype),
    Error.captureStackTrace && Error.captureStackTrace(this, w.prototype.create)
  }
}`,
    ).toBeTransform(`class b extends Error {
  constructor(e, t, n) {
    super(t), this.code = e, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, b.prototype), Error.captureStackTrace(this, w.prototype.create);
  }
}`,
    );
  });
});
