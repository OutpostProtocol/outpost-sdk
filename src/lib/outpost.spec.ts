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
  const posts = await getPosts({ slug: 'outpost' });
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

test('getPostPreview', async (t) => {
  const { getPosts, getPostPreview } = createClient({
    baseURL: 'http://localhost:4000',
  });
  const [...posts] = await getPosts({ slug: 'unit_tests' });
  t.true(Array.isArray(posts));
  t.true(!!posts.length);

  posts.forEach((post) => {
    const { id, title, subtitle, timestamp, txId, featuredImg } = post;
    t.true(typeof id === 'string');
    t.true(typeof title === 'string');
    t.true(typeof subtitle === 'string');
    t.true(typeof timestamp === 'number');
    t.true(typeof txId === 'string');
    t.true(typeof featuredImg === 'string');
  });

  const [post] = posts;
  const { txId } = post;
  // TODO: @Sam: Why comslug for this call?
  const postPreview = await getPostPreview({
    txId,
    slug: 'unit_tests',
  });
  console.log({ postPreview });
});

//test('uploadImage', async (t) => {
//  const { uploadImage } = createClient({
//    baseURL: 'http://localhost:4000',
//  });
//});
