import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { ImageMimeTypes, splitBase64String } from '../constants';
import { mutations } from '../graphql';

const { uploadImage: query } = mutations;

export type uploadImageParams = {
  readonly base64: string;
  readonly address: string;
};

export type uploadImageResult = { readonly txId: string };

export type AxiosUploadImageResponse = {
  readonly data: {
    readonly uploadImage: uploadImageResult;
  };
};

const uploadImageSchema = yup.object().shape({
  base64: yup.string().required(),
  address: yup.string().required(),
});

export default async function uploadImage(
  client: AxiosInstance,
  params: uploadImageParams
): Promise<uploadImageResult> {
  await uploadImageSchema.validate(params);
  const { base64, address } = params;
  const maybeSplitBase64 = splitBase64String(base64);
  if (!maybeSplitBase64) {
    return Promise.reject(new Error('Malformed base64 string.'));
  }
  const { data, mimeType } = maybeSplitBase64;
  if (ImageMimeTypes.indexOf(mimeType) < 0) {
    return Promise.reject(
      new Error(`${mimeType} is not a supported image upload type.`)
    );
  }
  const {
    data: {
      data: { uploadImage },
    },
  } = (await client({
    method: 'post',
    data: {
      operationName: 'uploadImage',
      query,
      variables: { image: { data, mimeType }, address },
    },
  })) as AxiosResponse<AxiosUploadImageResponse>;
  return uploadImage;
}
