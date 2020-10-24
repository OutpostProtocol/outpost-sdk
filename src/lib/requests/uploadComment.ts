import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

import { uploadPostResult } from './uploadPost';

const { uploadComment: query } = mutations;

export type uploadCommentParams = {
  readonly commentText: string;
  readonly postTxId: string;
  readonly communityTxId: string;
  readonly address: string;
  readonly timestamp: number;
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
  address: yup.string().min(1).required(),
  timestamp: yup.number().min(0).required(),
});

export default async function uploadComment(
  client: AxiosInstance,
  params: uploadCommentParams
): Promise<uploadCommentResult> {
  await uploadCommentSchema.validate(params);
  const {
    commentText,
    postTxId,
    communityTxId,
    address: ethAddr,
    timestamp,
  } = params;
  const {
    data: {
      data: { uploadComment },
    },
  } = (await client({
    method: 'post',
    data: {
      operationName: 'uploadComment',
      query,
      // TODO: Looks like comments are not authenticated. It's likely that the address should
      //       be taken from the authorization header to prevent fake comments.
      variables: { commentText, postTxId, communityTxId, ethAddr, timestamp },
    },
  })) as AxiosResponse<AxiosUploadCommentResponse>;
  return uploadComment;
}
