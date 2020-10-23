import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

const { uploadImage: query } = mutations;

export type uploadImageParams = {
  readonly base64: string;
  readonly address: string;
};

export type uploadImageResult = unknown;

export type AxiosUploadImageResponse = {
  readonly data: uploadImageResult;
};

const uploadImageSchema = yup.object().shape({
  base64: yup.string().required(),
  address: yup.string().required(),
});

export default async function uploadImage(
  client: AxiosInstance,
  params: uploadImageParams
): Promise<AxiosUploadImageResponse> {
  await uploadImageSchema.validate(params);
  const { base64: image, address } = params;
  const { data } = (await client({
    method: 'post',
    data: {
      operationName: 'uploadImage',
      query,
      variables: { image, address },
    },
  })) as AxiosResponse<AxiosUploadImageResponse>;
  return data;
}
