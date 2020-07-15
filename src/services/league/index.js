/**
* @desc api services of league
* @author pika
*/
import request from '@/utils/request';

// get league list
export function getList () {
  return request('/baas/business/alliance/list', {
    method: 'post',
  });
}

// add league
export function addLeague (data) {
  return request('/baas/business/alliance/create', {
    method: 'post',
    body: JSON.stringify(data),
  });
}
