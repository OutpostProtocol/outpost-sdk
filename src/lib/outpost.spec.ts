import test from 'ava';
import { ethers } from 'ethers';

import { createClient } from './outpost';

const keystore = {
  address: '3cb0660b9419b06521aed844ad6d5a7b355bd055',
  crypto: {
    cipher: 'aes-128-ctr',
    ciphertext:
      '04e12a9012d54fcfbc1f887d8ea83466ae133d566b181731725a1b679beabdcc',
    cipherparams: { iv: '080123224b9ddf47db08d5936f6cbee6' },
    kdf: 'scrypt',
    kdfparams: {
      dklen: 32,
      n: 262144,
      p: 1,
      r: 8,
      salt: '227ae883383fd341ddbccf04efe792872291e8a89f311e03619dd1cca7042328',
    },
    mac: 'dc36c8066fa41e78792ad539148a8402b0e6dcb03c5295cd2ca02ada69770184',
  },
  id: '9d38549a-61a0-40a2-9396-df417bc3e534',
  version: 3,
};

const password = '20e2dc8a-c81e-4cdb-ac5f-e79836a5a0d8';
const wallet = ethers.Wallet.fromEncryptedJsonSync(
  JSON.stringify(keystore),
  password
);

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
  const { getPosts } = createClient({
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
    t.true(typeof featuredImg === 'string' || featuredImg === null);
  });

  // const [post] = posts;
  // const { txId } = post;
  // TODO: @Sam: Why comslug for this call?
  // .           This doesn't appear to work. Not sure why!
  //const postPreview = await getPostPreview({
  //  txId,
  //  slug: 'unit_tests',
  //});
  //console.log({ postPreview });
});

//test('uploadImage', async (t) => {});
