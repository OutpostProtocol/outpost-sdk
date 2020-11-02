import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

const { uploadPost: query } = mutations;

export type uploadPostParams = {
  readonly authToken: string;
  readonly communityTxId: string;
  readonly postUpload: {
    readonly canonicalLink: string;
    readonly postText: string;
    readonly subtitle: string;
    readonly timestamp: number;
    readonly title: string;
  };
};

export type uploadPostResult = {
  readonly txId: string;
  readonly title: string;
  readonly postText: string;
  readonly subtitle: string;
  readonly timestamp: number;
  readonly canonicalLink: string;
  readonly community: {
    readonly name: string;
  };
  readonly user: {
    readonly address: string;
  };
};

export type AxiosUploadPostResponse = {
  readonly data: {
    readonly uploadPost: uploadPostResult;
  };
};

const uploadPostSchema = yup.object().shape({
  authToken: yup.string().required(),
  postUpload: yup.object().shape({
    title: yup.string().min(1).required(),
    subtitle: yup.string().min(0).required(),
    postText: yup.string().min(1).required(),
    canonicalLink: yup.string().min(0),
    timestamp: yup.number().min(0).required(),
    originalTxId: yup.string().nullable(),
  }),
  communityTxId: yup.string().required(),
});

export default async function uploadPost(
  client: AxiosInstance,
  params: uploadPostParams
): Promise<uploadPostResult> {
  await uploadPostSchema.validate(params);
  const { authToken: authorization, communityTxId, postUpload } = params;
  const {
    data: {
      data: { uploadPost },
    },
  } = (await client('graphql', {
    method: 'post',
    url: '/graphql',
    headers: { authorization },
    data: {
      operationName: 'UploadPost',
      query,
      variables: {
        communityTxId,
        postUpload,
      },
    },
  })) as AxiosResponse<AxiosUploadPostResponse>;
  return uploadPost;
}
