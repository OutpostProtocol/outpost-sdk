import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

export type getAuthTokenParams = {
  readonly address: string;
  readonly signature: string;
};

export type getAuthTokenResult = string;

export type AxiosAuthTokenResponse = string;

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
  const { data } = (await client({
    url: '/relay/verify-challenge',
    method: 'post',
    data: {
      address,
      signature,
    },
  })) as AxiosResponse<AxiosAuthTokenResponse>;
  return data;
}
