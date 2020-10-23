import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { queries } from '../graphql';

const { getPostPreview: query } = queries;

export type getPostPreviewParams = {
  readonly txId: string;
  readonly slug: string;
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
  slug: yup.string().required(),
});

export default async function getPostPreview(
  client: AxiosInstance,
  params: getPostPreviewParams
): Promise<getPostPreviewResult> {
  await getPostPreviewSchema.validate(params);
  const { txId, slug } = params;
  const {
    data: {
      data: { postPreview },
    },
  } = (await client({
    method: 'post',
    data: {
      query,
      variables: { txId, slug },
    },
  })) as AxiosResponse<AxiosGetPostPreviewResponse>;
  return postPreview;
}
