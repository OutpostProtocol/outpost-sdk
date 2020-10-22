import test from 'ava';

import * as Lib from '.';

test('library', (t) => {
  t.true(typeof Lib.queries === 'object');
  t.true(typeof Lib.mutations === 'object');
  t.true(typeof Lib.createClient === 'function');
  t.true(typeof Lib.defaultOptions === 'object');
});
