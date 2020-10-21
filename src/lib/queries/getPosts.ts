import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

export type getPostsParams = {
  readonly slug: string;
};

export type getPostsResult = AxiosResponse;

export const getPostsSchema = yup.object().shape({
  slug: yup.string().required(),
});

export default async function getPost(
  client: AxiosInstance,
  params: getPostsParams
): Promise<getPostsResult> {
  await getPostsSchema.validate(params);
  const { slug } = params;
  // TODO: Implement formatting of response.
  // TODO: Ensure we generate the schema dynamically.
  return client({
    method: 'post',
    data: {
      operationName: 'posts',
      variables: { slug },
      query: `
query posts($slug: String) {
  posts(communitySlug: $slug) {
    id
    title
    subtitle
    timestamp
    txId
    featuredImg
    community {
      name
      readRequirement
      tokenSymbol
      __typename
    }
    user {
      name
      __typename
    }
    __typename
  }
}
      `,
    },
  });
}
