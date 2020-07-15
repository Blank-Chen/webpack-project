/**
* @desc common layout
* @author pika
*/
import React from 'react'
import { Layout } from 'antd'
import SideBar from './sideBar'
import CommonHeader from './header'
import CommonBreadcrumb from './breadcrump'

const { Content, Footer } = Layout;

function CommonLayout (props) {
    return (
        <Layout className="common-layout-container">
            <SideBar />
            <Layout className="site-layout">
                <CommonHeader />
                <Content className="common-content-container">
                    <CommonBreadcrumb />
                    <div className="site-layout-background">
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2020 Created by pika</Footer>
            </Layout>
        </Layout>
    )
}
export default CommonLayout