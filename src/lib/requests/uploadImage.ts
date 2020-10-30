import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { ImageMimeTypeRegex, splitBase64String } from '../constants';

export type uploadImageParams = {
  readonly base64: string;
  readonly authToken: string;
};

export type uploadImageResult = string;

export type AxiosUploadImageResponse = {
  readonly txId: string;
};

const uploadImageSchema = yup.object().shape({
  base64: yup.string().required(),
  authToken: yup.string().min(1).required(),
});

export default async function uploadImage(
  client: AxiosInstance,
  params: uploadImageParams
): Promise<uploadImageResult> {
  await uploadImageSchema.validate(params);
  const { base64, authToken } = params;
  const maybeSplitBase64 = splitBase64String(base64);
  if (!maybeSplitBase64) {
    return Promise.reject(new Error('Malformed base64 string.'));
  }
  const { rawData, mimeType } = maybeSplitBase64;
  if (!ImageMimeTypeRegex.test(mimeType)) {
    return Promise.reject(
      new Error(`${mimeType} is not a supported image upload type.`)
    );
  }
  const {
    data: { txId },
  } = (await client({
    method: 'post',
    url: '/relay/image-upload',
    headers: {
      authorization: authToken,
    },
    data: {
      rawData,
      mimeType,
    },
  })) as AxiosResponse<AxiosUploadImageResponse>;
  return txId;
}
