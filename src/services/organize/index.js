/**
* @desc api services of organize
* @author pika
*/
import request from '@/utils/request';

// get organize list
export function getList () {
  return request('/baas/business/org/list', {
    method: 'post',
  });
}

// add organize
export function addOrganize (data) {
  return request('/baas/business/alliance/create', {
    method: 'post',
    body: JSON.stringify(data),
  });
}

// get peers of organize
export function getPeers (data) {
  return request('/baas/business/org/listPeer', {
    method: 'post',
    body: JSON.stringify(data),
  });
}

// get ledgers in peer of organize
export function getLedgers (data) {
  return request('/baas/business/peer/listLedger', {
    method: 'post',
    body: JSON.stringify(data),
  });
}
