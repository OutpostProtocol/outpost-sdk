import { AxiosInstance, AxiosResponse } from 'axios';
import * as yup from 'yup';

export type getChallengeParams = {
  readonly address: string;
};

export type getChallengeResult = string;

export type AxiosChallengeResponse = string;

const getChallengeSchema = yup.object().shape({
  address: yup.string().min(1).required(),
});

export default async function getChallenge(
  client: AxiosInstance,
  params: getChallengeParams
): Promise<getChallengeResult> {
  await getChallengeSchema.validate(params);
  const { address } = params;
  const { data } = (await client({
    url: '/relay/get-challenge',
    method: 'post',
    data: {
      address,
    },
  })) as AxiosResponse<AxiosChallengeResponse>;
  return data;
}
