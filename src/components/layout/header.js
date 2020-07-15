import React from 'react'
import { Layout } from 'antd'
const { Header } = Layout;
function CommonHeader () {
  return <Header className="site-layout-background common-header-container">
    <div className="header-l">Admin demo</div>
    <div className="header-r">pika</div>
  </Header>
}
export default CommonHeader