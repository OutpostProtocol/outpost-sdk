import { AxiosInstance, AxiosResponse } from 'axios';

import { queries } from '../graphql';

const { getAllCommunities: query } = queries;

export type Community = unknown;

type AxiosGetAllCommunitiesResponse = {
  readonly data: {
    readonly allCommunities: readonly Community[];
  };
};

export default async function getAllCommunities(
  client: AxiosInstance
): Promise<readonly Community[]> {
  const {
    data: {
      data: { allCommunities },
    },
  } = (await client({
    method: 'post',
    data: {
      query,
      variables: {},
    },
  })) as AxiosResponse<AxiosGetAllCommunitiesResponse>;
  return allCommunities;
}
