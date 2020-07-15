/**
* @desc model of organize
* @author pika
*/
import immutable from 'immutable';
import { getList, getPeers, getLedgers } from '@/services/organize/index';
import { pathToRegexp } from 'path-to-regexp';

export default {
  namespace: 'organize',
  state: immutable.fromJS({
    // organize list
    list: [],
    // organize info
    info: {},
    // organize peer list
    peers: [],
    // ledgerData in one of peer
    ledgerData: [],
    // modal show
    modelShow: false,
  }),
  subscriptions: {
    setup ({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        const organizeMatch = pathToRegexp('/organize/info/:orgId').exec(pathname);
        const reactObj = {
          '/organize': () => dispatch({
            type: 'getList',
          }),
        };
        /*eslint-disable*/
        reactObj[pathname] && reactObj[pathname]();
        organizeMatch && dispatch({
          type: 'getPeers',
          payload: {
            orgName: organizeMatch[1]
          }
        })
        /* eslint-enable */
      });
    },
  },
  effects: {
    // get organize list
    *getList (action, { call, put }) {
      const { data: { data } } = yield call(getList);
      yield put({
        type: 'save',
        payload: {
          list: data,
        },
      });
    },
    // get peers of organize
    *getPeers ({ payload }, { call, put }) {
      const { data: { data } } = yield call(getPeers, payload);
      yield put({
        type: 'save',
        payload: {
          peers: data,
        },
      });
    },
    // get ledger of peer in organize
    *getLedgers ({ payload }, { call, put }) {
      const { data: { data } } = yield call(getLedgers, payload);
      yield put({
        type: 'save',
        payload: {
          ledgerData: data,
          modelShow: true,
        },
      });
    },
  },
  reducers: {
    save (state, { payload }) {
      return state.merge(payload);
    },
  },
};
