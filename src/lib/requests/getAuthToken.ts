import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

import { mutations } from '../graphql';

const { authAccount: query } = mutations;

export type getAuthTokenParams = {
  readonly address: string;
  readonly signature: string;
};

export type getAuthTokenResult = string;

export type AxiosAuthTokenResponse = {
  readonly data: {
    readonly authAccount: getAuthTokenResult;
  };
};

const getAuthTokenSchema = yup.object().shape({
  address: yup.string().required(),
  signature: yup.mixed(),
});

export default async function getAuthToken(
  client: AxiosInstance,
  params: getAuthTokenParams
): Promise<getAuthTokenResult> {
  await getAuthTokenSchema.validate(params);
  const { address, signature } = params;
  const {
    data: {
      data: { authAccount },
    },
  } = (await client({
    url: '/graphql',
    method: 'post',
    data: {
      operationName: 'auth',
      query,
      variables: {
        addr: address,
        sig: signature,
      },
    },
  })) as AxiosResponse<AxiosAuthTokenResponse>;
  return authAccount;
}
