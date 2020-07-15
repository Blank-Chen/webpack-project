/**
* @desc model of league
* @author pika
*/
import immutable from 'immutable';
import { getList, addLeague } from '@/services/league/index';
import { message } from 'antd';

export default {
  namespace: 'league',
  state: immutable.fromJS({
    list: [],
    saveLoading: false,
  }),
  subscriptions: {
    setup ({ history, dispatch }) {
      return history.listen(({ pathname, search, hash }) => {// eslint-disable-line
        const reactObj = {
          '/league': () => dispatch({
            type: 'getList',
          }),
        };
        reactObj[pathname] && reactObj[pathname](); // eslint-disable-line
      });
    },
  },
  effects: {
    *getList (action, { call, put }) {
      const { data: { data } } = yield call(getList);
      yield put({
        type: 'save',
        payload: {
          list: data,
        },
      });
    },
    *addLeague ({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          saveLoading: true,
        },
      });
      const { data: { code } } = yield call(addLeague, payload);
      /*eslint-disable*/
      if (code === '0000') {
        message.success('添加成功')
        history.back(-1)
      } else {
        message.error('添加失败')
      }
      /* eslint-enable */
      yield put({
        type: 'save',
        payload: {
          saveLoading: false,
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
