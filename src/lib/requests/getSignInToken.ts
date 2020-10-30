import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

export type getSignInTokenParams = {
  readonly address: string;
};

export type getSignInTokenResult = string;

export type AxiosSignInTokenResponse = string;

const getSignInTokenSchema = yup.object().shape({
  address: yup.string().min(1).required(),
});

export default async function getSignInToken(
  client: AxiosInstance,
  params: getSignInTokenParams
): Promise<getSignInTokenResult> {
  await getSignInTokenSchema.validate(params);
  const { address } = params;
  const { data } = (await client({
    url: '/relay/get-challenge',
    method: 'post',
    data: {
      address,
    },
  })) as AxiosResponse<AxiosSignInTokenResponse>;
  return data;
}
