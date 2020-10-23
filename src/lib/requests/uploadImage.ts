import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

const { uploadImage: query } = mutations;

export type uploadImageParams = {
  readonly image: {
    readonly data: string;
    readonly mimeType: string;
  };
  readonly address: string;
};

export type uploadImageResult = { readonly txId: string };

export type AxiosUploadImageResponse = {
  readonly data: {
    readonly uploadImage: uploadImageResult;
  };
};

const uploadImageSchema = yup.object().shape({
  image: yup
    .object()
    .shape({
      data: yup.string().required(),
      mimeType: yup.string().required(),
    })
    .required(),
  address: yup.string().required(),
});

export default async function uploadImage(
  client: AxiosInstance,
  params: uploadImageParams
): Promise<uploadImageResult> {
  await uploadImageSchema.validate(params);
  const { image, address } = params;
  const {
    data: {
      data: { uploadImage },
    },
  } = (await client({
    method: 'post',
    data: {
      operationName: 'uploadImage',
      query,
      variables: { image, address },
    },
  })) as AxiosResponse<AxiosUploadImageResponse>;
  return uploadImage;
}
