import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

const { getSignInToken: query } = mutations;

export type getSignInTokenParams = {
  readonly address: string;
};

export type getSignInTokenResult = string;

export type AxiosSignInTokenResponse = {
  readonly data: {
    readonly getSignInToken: getSignInTokenResult;
  };
};

const getSignInTokenSchema = yup.object().shape({
  address: yup.string().min(1).required(),
});

export default async function getSignInToken(
  client: AxiosInstance,
  params: getSignInTokenParams
): Promise<getSignInTokenResult> {
  await getSignInTokenSchema.validate(params);
  const { address } = params;
  const {
    data: {
      data: { getSignInToken },
    },
  } = (await client({
    method: 'post',
    data: {
      operationName: 'getToken',
      query,
      variables: { addr: address },
    },
  })) as AxiosResponse<AxiosSignInTokenResponse>;
  return getSignInToken;
}
