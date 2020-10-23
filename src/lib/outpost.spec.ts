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

// TODO: Unknown operation named "postpage".
// test('getPostPreview', async (t) => {
//   const { getPosts, getPostPreview } = createClient({
//     baseURL: 'http://localhost:4000',
//   });
//   const [...posts] = await getPosts({ slug: 'unit_tests' });
//   t.true(Array.isArray(posts));
//   t.true(!!posts.length);

//   posts.forEach((post) => {
//     const { id, title, subtitle, timestamp, txId, featuredImg } = post;
//     t.true(typeof id === 'string');
//     t.true(typeof title === 'string');
//     t.true(typeof subtitle === 'string');
//     t.true(typeof timestamp === 'number');
//     t.true(typeof txId === 'string');
//     t.true(typeof featuredImg === 'string' || featuredImg === null);
//   });

//   const [post] = posts;
//   const { txId } = post;
//   try {
//     // TODO: @Sam: Why comslug for this call?
//     //             This doesn't appear to work. Not sure why!
//     const postPreview = await getPostPreview({
//       txId,
//       slug: 'unit_tests:development',
//     });
//     console.log({ postPreview });
//   } catch (e) {
//     console.log(e.response.data);
//   }
// });

// TODO: This should be uploadUserImage.
test('uploadImage', async (t) => {
  const { address } = wallet;
  const { uploadImage } = createClient({
    baseURL: 'http://localhost:4000',
  });
  // TODO: This looks dangerous. Should require auth.
  const base64 =
    'data:image/png;base64,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';
  const { txId } = await uploadImage({
    address,
    base64,
  });
  t.true(!!txId);
  t.true(!!txId.length);
  // TODO: Think we'd need a way to monitor the upload status.
  // TODO: Return this to the caller.
  //const imageUrl = `https://arweave.net/${txId}`;
});

test('uploadPost', async (t) => {
  const { address } = wallet;
  const { getSignInToken, getAuthToken, uploadPost } = createClient({
    baseURL: 'http://localhost:4000',
  });
  const signInToken = await getSignInToken({ address });
  const signature = await wallet.signMessage(signInToken);
  const authToken = await getAuthToken({
    address,
    signature,
  });
  // TODO: Need a way to list communities
  const communityTxId = 'unit_tests:development';
  const timestamp = 1000;
  const result = await uploadPost({
    authToken,
    communityTxId,
    postUpload: {
      title: `Evil Automated Testing Post ${timestamp}`,
      subtitle: 'This is an automatic post. Nothing to see here!',
      postText: "<i>Hello, world.</i><script>alert('hi')</script>",
      // TODO: What is this?
      canonicalLink: '',
      timestamp,
    },
  });
  t.true(!!result);
  t.true(typeof result === 'object');
  const {
    txId,
    title,
    postText,
    subtitle,
    canonicalLink,
    community,
    user,
  } = result;
  t.true(typeof txId === 'string');
  t.true(typeof title === 'string');
  t.true(typeof postText === 'string');
  t.true(typeof subtitle === 'string');
  t.true(typeof canonicalLink === 'string');
  t.true(!!community);
  t.true(typeof community === 'object');
  t.true(typeof user === 'object');
  const { name } = community;
  t.true(typeof name === 'string');
});

test('getAllCommunities', async (t) => {
  const { getAllCommunities } = createClient({
    baseURL: 'http://localhost:4000',
  });
  const result = await getAllCommunities();
  t.true(Array.isArray(result));
  t.true(!!result.length);
  result.forEach(({ id, name, txId, description, imageTxId, slug }) => {
    t.true(typeof id === 'string');
    t.true(typeof name === 'string');
    t.true(typeof txId === 'string');
    t.true(typeof description === 'string');
    t.true(typeof imageTxId === 'string');
    t.true(typeof slug === 'string');
  });
});
