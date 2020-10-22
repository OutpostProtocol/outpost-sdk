import test from 'ava';

import { createClient } from './outpost';

test('createClient', (t) => {
  t.true(typeof createClient === 'function');
  t.true(!!createClient());
  t.true(!!createClient({ baseURL: '' }));
});

test('getPosts', async (t) => {
  const { getPosts } = createClient({ baseURL: 'http://localhost:4000' });
  t.true(typeof getPosts === 'function');
  const posts = await getPosts({ slug: 'jamm' });
  t.true(Array.isArray(posts));
});
