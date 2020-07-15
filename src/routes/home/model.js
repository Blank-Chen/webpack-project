/**
 * @desc model from home page
 * @author pika
 */

import immutable from 'immutable'
export default {
    namespace: 'home',
    state: immutable.fromJS({ name: 'home' }),
    subscriptions: {
        setup () { }
    },
    effects: {
        *fetch ({ payload }, { call, put }) {// eslint-disable-line
            yield put({ type: 'save' });
        },
    },

    reducers: {
        save (state, { payload }) {// eslint-disable-line
            return state.merge(payload)
        },
    },
}