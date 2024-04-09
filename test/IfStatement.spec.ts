import { describe, test } from 'node:test';
import { expect } from './setup';

describe('IfStatement replace logic', () => {
  test('should remove IfStatement', async () => {
    await expect('if (!Date.now) console.log(1);').toBeTransform('');
  });

  test('should replace `test=false` and remove `alternate` (else)', async () => {
    await expect('if (Date.now) console.log(1); else console.log(2)')
      .toBeTransform('if (true) console.log(1);');
  });

  test('should replace `test=false` and `consequent=empty`', async () => {
    await expect('if (!Date.now) console.log(1); else console.log(2)')
      .toBeTransform('if (false) ;else console.log(2);');
  });
});
