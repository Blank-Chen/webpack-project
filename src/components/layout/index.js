/**
* @desc common layout
* @author pika
*/
import React, { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'dva/router'
import './style.scss'

const { Content, Footer, Header } = Layout;

function CommonLayout (props) {
    useEffect(() => {
        // do sth here just like update page routes
        return () => {

        }
    })
    return (
        <Layout className="common-layout-container">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/league">Menu1</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/league/add">Menu1-1</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2020 Created by pika</Footer>
        </Layout>
    )
}
export default CommonLayout