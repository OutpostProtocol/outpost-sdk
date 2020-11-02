import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { queries } from '../graphql';

const { getPost: query } = queries;

export type getPostParams = {
  readonly txId: string;
  readonly authToken: string;
};

export type getPostResult = {
  readonly id: string;
  readonly postText: string;
  readonly title: string;
  readonly subtitle: string;
  readonly readRequirement: number;
  readonly timestamp: number;
  readonly featuredImg: string | null;
  readonly canonicalLink: string | null;
  readonly community: {
    readonly name: string;
    readonly slug: string;
    readonly txId: string;
  };
  readonly user: {
    readonly address: string;
    readonly name: string;
    readonly image: string | null;
  };
};

type AxiosPostResultResponse = {
  readonly data: {
    readonly getPost: getPostResult;
  };
};

const getPostSchema = yup.object().shape({
  txId: yup.string().min(1).required(),
  authToken: yup.string().nullable(),
});

export default async function getPost(
  client: AxiosInstance,
  params: getPostParams
): Promise<getPostResult> {
  await getPostSchema.validate(params);
  const { txId, authToken } = params;
  const {
    data: {
      data: { getPost },
    },
  } = (await client({
    url: '/graphql',
    method: 'post',
    headers: {
      authorization: authToken,
    },
    data: {
      operationName: 'getPost',
      query,
      variables: {
        txId,
        userToken: authToken,
      },
    },
  })) as AxiosResponse<AxiosPostResultResponse>;
  return getPost;
}
