import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { queries } from '../graphql';

const { getPostPreview: query } = queries;

export type getPostPreviewParams = {
  readonly txId: string;
};

export type getPostPreviewResult = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly timestamp: number;
  readonly txId: string;
  readonly featuredImg: string | null;
  readonly canonicalLink: string;
};

export type AxiosGetPostPreviewResponse = {
  readonly data: {
    readonly postPreview: getPostPreviewResult;
  };
};

const getPostPreviewSchema = yup.object().shape({
  txId: yup.string().required(),
});

export default async function getPostPreview(
  client: AxiosInstance,
  params: getPostPreviewParams
): Promise<getPostPreviewResult> {
  await getPostPreviewSchema.validate(params);
  const { txId } = params;
  const {
    data: {
      data: { postPreview },
    },
  } = (await client({
    method: 'post',
    url: '/graphql',
    data: {
      query,
      variables: { txId },
    },
  })) as AxiosResponse<AxiosGetPostPreviewResponse>;
  return postPreview;
}
