/**
 * @desc common model in all page
 */

import immutable from 'immutable'
export default {
  namespace: 'system',
  state: immutable.fromJS({ routes: [] }),
  subscriptions: {
    setup () { }
  },
  effects: {
    *fetch ({ payload }, { call, put }) { // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save (state, { payload }) { // eslint-disable-line
      return state.merge(payload)
    },
  },
}