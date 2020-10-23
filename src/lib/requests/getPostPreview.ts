import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { queries } from '../graphql';

const { getPostPreview: query } = queries;

export type getPostPreviewParams = {
  readonly txId: string;
  readonly slug: string;
};

export type getPostPreviewResult = unknown;

export type AxiosGetPostPreviewResponse = {
  readonly data: getPostPreviewResult;
};

const getPostPreviewSchema = yup.object().shape({
  txId: yup.string().required(),
  slug: yup.string().required(),
});

export default async function getPostPreview(
  client: AxiosInstance,
  params: getPostPreviewParams
): Promise<getPostPreviewResult> {
  await getPostPreviewSchema.validate(params);
  const { txId, slug } = params;
  const { data } = (await client({
    method: 'post',
    data: {
      operationName: 'postpage',
      query,
      variables: { txId, slug },
    },
  })) as AxiosResponse<AxiosGetPostPreviewResponse>;
  return data;
}
