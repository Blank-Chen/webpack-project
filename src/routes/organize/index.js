/**
 * @desc 组织
 * @author pika
 */
import React, { Component } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Table } from 'antd';
import './style.scss';

class Organize extends Component {
     columns=[{
       title: '组织描述',
       dataIndex: 'desc',
       key: 'desc',
     }, {
       title: '组织域名',
       dataIndex: 'domain',
       key: 'domain',
     }, {
       title: '组织标识',
       dataIndex: 'name',
       key: 'name',
     }, {
       title: '节点个数',
       dataIndex: 'peerCount',
       key: 'peerCount',
     }, {
       title: '创建时间',
       dataIndex: 'createTime',
       key: 'createTime',
     }, {
       title: '操作',
       key: 'operate',
       render: item => <Link to={`/organize/info/${item.name}`}>详情</Link>,
     }]

     // to organize detail
     toDetail=(item) => {
       const { dispatch, history } = this.props;
       dispatch({
         type: 'organize/save',
         payload: {
           info: item,
         },
       });
       history.push(`/organize/info/${item.name}`);
     }
     render () {
       const { organize: { list } } = this.props;
       return <div className="league-container">
         <section>
           {/* <Button type="primary" style={{ float: 'right' }}>
             <Link to="/organize/add">新增组织</Link>
           </Button> */}
         </section>
         <section style={{ marginTop: '10px' }}>
           <Table rowKey={row => row.name} dataSource={list} columns={this.columns} />
         </section>
       </div>;
     }
}
export default connect(({ organize }) => ({
  organize: organize.toJS(),
}), null)(Organize);
