import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

import { uploadPostResult } from './uploadPost';

const { uploadComment: query } = mutations;

export type uploadCommentParams = {
  readonly commentText: string;
  readonly postTxId: string;
  readonly communityTxId: string;
  readonly timestamp: number;
  readonly authToken: string;
};

export type uploadCommentResult = {
  readonly postText: string;
  readonly timestamp: number;
  readonly user: {
    readonly address: string;
  };
};

type AxiosUploadCommentResponse = {
  readonly data: {
    readonly uploadComment: uploadPostResult;
  };
};

const uploadCommentSchema = yup.object().shape({
  commentText: yup.string().min(1).required(),
  postTxId: yup.string().min(1).required(),
  communityTxId: yup.string().min(1).required(),
  timestamp: yup.number().min(0).required(),
  authToken: yup.string().min(1).required(),
});

export default async function uploadComment(
  client: AxiosInstance,
  params: uploadCommentParams
): Promise<uploadCommentResult> {
  await uploadCommentSchema.validate(params);
  const { commentText, postTxId, communityTxId, timestamp, authToken } = params;
  const {
    data: {
      data: { uploadComment },
    },
  } = (await client('graphql', {
    method: 'post',
    url: '/graphql',
    headers: {
      authorization: authToken,
    },
    data: {
      operationName: 'uploadComment',
      query,
      variables: { commentText, postTxId, communityTxId, timestamp },
    },
  })) as AxiosResponse<AxiosUploadCommentResponse>;
  return uploadComment;
}
