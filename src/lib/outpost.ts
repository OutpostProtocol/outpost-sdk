import axios, { AxiosInstance } from 'axios';
import deepmerge from 'deepmerge';

import { getPosts, getPostsParams } from './requests';
import type { getPostsResult } from './requests';

export type createClientParams = {
  readonly baseURL: string;
};

export type createClientResult = {
  readonly getPosts: (params: getPostsParams) => Promise<getPostsResult>;
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
  };
};
