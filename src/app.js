'use strict';
import dva from 'dva'
import { createBrowserHistory } from 'history'
import { PUBLIC_PATH } from '@/constants'
import 'antd/dist/antd.less';
import '@/assets/style/global.scss';
const dvaOpts = {
  history: createBrowserHistory({
    basename: PUBLIC_PATH
  })
}
const app = dva(dvaOpts)
app.router(require('./routes').default)
// app.use()
app.model(require('@/models/system').default)
app.start('#root')