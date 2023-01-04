import {request} from '@/utils';

export async function getCaptcha() {
  return request.post(`/v1/captcha`);
}

export async function getMeta() {
  return request.get('/v1/meta');
}

export async function getUserInfo() {
  return request.get(`/v1/me`);
}
