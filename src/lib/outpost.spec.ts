import test from 'ava';
import { ethers } from 'ethers';

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

test('getSignInToken', async (t) => {
  const wallet = ethers.Wallet.createRandom();
  const { address } = wallet;
  const { getSignInToken } = createClient({ baseURL: 'http://localhost:4000' });
  t.true(typeof getSignInToken === 'function');
  const signInToken = await getSignInToken({ address });
  t.true(typeof signInToken === 'string');
  t.true(!!signInToken.length);
});

test('getAuthToken', async (t) => {
  const wallet = ethers.Wallet.createRandom();
  const { address } = wallet;
  const { getSignInToken, getAuthToken } = createClient({
    baseURL: 'http://localhost:4000',
  });
  const signInToken = await getSignInToken({ address });
  const signature = await wallet.signMessage(signInToken);
  const authToken = await getAuthToken({
    address,
    signature,
  });
  t.true(typeof authToken === 'string');
  t.true(!!authToken.length);
});
