import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { queries } from '../graphql';

const { getPosts: query } = queries;

export type getPostsParams = {
  readonly slug: string;
};

export type getPostsResult = AxiosResponse;

export const getPostsSchema = yup.object().shape({
  slug: yup.string().required(),
});

export default async function getPosts(
  client: AxiosInstance,
  params: getPostsParams
): Promise<getPostsResult> {
  await getPostsSchema.validate(params);
  const { slug } = params;
  // TODO: Implement formatting of response.
  return client({
    method: 'post',
    data: {
      operationName: 'posts',
      variables: { slug },
      query,
    },
  });
}
