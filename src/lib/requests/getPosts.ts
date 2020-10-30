import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { queries } from '../graphql';

const { getPosts: query } = queries;

export type getPostsParams = {
  readonly slug: string;
};

export const getPostsSchema = yup.object().shape({
  slug: yup.string().required(),
});

export type Community = {
  readonly name: string;
  readonly readRequirement: number;
  readonly tokenSymbol: string;
};

export type Post = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly timestamp: number;
  readonly txId: string;
  readonly featuredImg: string;
};

export type AxiosPostsResponse = {
  readonly data: {
    readonly posts: getPostsResult;
  };
};

export type getPostsResult = readonly Post[];

export default async function getPosts(
  client: AxiosInstance,
  params: getPostsParams
): Promise<getPostsResult> {
  await getPostsSchema.validate(params);
  const { slug } = params;
  const {
    data: {
      data: { posts },
    },
  } = (await client({
    url: '/graphql',
    method: 'post',
    data: {
      operationName: 'posts',
      variables: { slug },
      query,
    },
  })) as AxiosResponse<AxiosPostsResponse>;
  return posts;
}
