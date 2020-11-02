import { gql } from '@apollo/client';
import test from 'ava';

import { mutations, queries } from './graphql';

const { uploadPost, verifyToken, uploadImage, uploadComment } = mutations;

test('mutations', (t) => {
  t.true(!!mutations);
  t.true(typeof mutations === 'object');
  t.true(typeof uploadPost === 'string');
  t.true(typeof verifyToken === 'string');
  t.true(typeof uploadImage === 'string');
  t.true(typeof uploadComment === 'string');
  try {
    Object.values(mutations).map((e) => gql(e));
  } catch (e) {
    t.false(e);
  }
});

const {
  getAllCommunities,
  getPosts,
  getPost,
  getPostPreview,
  getUser,
  isNameAvailable,
  getUserRoles,
} = queries;

test('queries', (t) => {
  t.true(!!queries);
  t.true(typeof queries === 'object');
  t.true(typeof getAllCommunities === 'string');
  t.true(typeof getPosts === 'string');
  t.true(typeof getPost === 'string');
  t.true(typeof getPostPreview === 'string');
  t.true(typeof getUser === 'string');
  t.true(typeof isNameAvailable === 'string');
  t.true(typeof getUserRoles === 'string');
  try {
    Object.values(queries).map((e) => gql(e));
  } catch (e) {
    t.false(e);
  }
});
