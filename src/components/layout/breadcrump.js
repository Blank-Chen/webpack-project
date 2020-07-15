/**
 * @desc common breadcrump component
 * @author pika
 */

import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Breadcrumb } from 'antd'

const BreadcrumbItem = Breadcrumb.Item

function CommonBreadcrump (props) {
  const { system: { routes } } = props
  return <Breadcrumb>
    {routes.map(route => <BreadcrumbItem key={route.path}><Link to={route.path}>{route.breadcrumbName}</Link></BreadcrumbItem>)}
  </Breadcrumb>
}
export default connect(({ system }) => ({
  system: system.toJS()
}))(CommonBreadcrump)