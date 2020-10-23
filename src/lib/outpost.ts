import axios, { AxiosInstance } from 'axios';
import deepmerge from 'deepmerge';

import {
  getAuthToken,
  getAuthTokenParams,
  getAuthTokenResult,
  getPostPreview,
  getPostPreviewParams,
  getPostPreviewResult,
  getPosts,
  getPostsParams,
  getSignInToken,
  getSignInTokenParams,
  getSignInTokenResult,
  uploadImage,
  uploadImageParams,
  uploadImageResult,
  uploadPost,
  uploadPostParams,
  uploadPostResult,
} from './requests';
import type { getPostsResult } from './requests';

export type createClientParams = {
  readonly baseURL: string;
};

export type createClientResult = {
  readonly getPosts: (params: getPostsParams) => Promise<getPostsResult>;
  readonly getSignInToken: (
    params: getSignInTokenParams
  ) => Promise<getSignInTokenResult>;
  readonly getAuthToken: (
    params: getAuthTokenParams
  ) => Promise<getAuthTokenResult>;
  readonly getPostPreview: (
    params: getPostPreviewParams
  ) => Promise<getPostPreviewResult>;
  readonly uploadImage: (
    params: uploadImageParams
  ) => Promise<uploadImageResult>;
  readonly uploadPost: (params: uploadPostParams) => Promise<uploadPostResult>;
};

export const defaultOptions = Object.freeze({
  // XXX: By default, we're on production.
  baseURL: 'https://outpost-api-v2.herokuapp.com',
}) as createClientParams;

export const createClient = (
  options: createClientParams = defaultOptions
): createClientResult => {
  const { baseURL } = deepmerge(defaultOptions, options);
  const client = axios.create({ baseURL }) as AxiosInstance;
  return {
    getPosts: (params: getPostsParams) => getPosts(client, params),
    getSignInToken: (params: getSignInTokenParams) =>
      getSignInToken(client, params),
    getAuthToken: (params: getAuthTokenParams) => getAuthToken(client, params),
    getPostPreview: (params: getPostPreviewParams) =>
      getPostPreview(client, params),
    uploadImage: (params: uploadImageParams) => uploadImage(client, params),
    uploadPost: (params: uploadPostParams) => uploadPost(client, params),
  };
};
