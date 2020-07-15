/**
 * @desc 联盟
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Table } from 'antd';
import './style.scss';

class League extends Component {
     columns=[{
       title: '联盟描述',
       dataIndex: 'allianceDesc',
       key: 'allianceDesc',
     }, {
       title: '联盟标识',
       dataIndex: 'allianceName',
       key: 'allianceName',
     }, {
       title: 'API服务地址',
       dataIndex: 'apiServiceAddr',
       key: 'apiServiceAddr',
     }, {
       title: '创建时间',
       dataIndex: 'createTime',
       key: 'createTime',
     }, {
       title: '背书策略',
       dataIndex: 'endorsePolicy',
       key: 'endorsePolicy',
     }, {
       title: '账本描述',
       dataIndex: 'ledgerDesc',
       key: 'ledgerDesc',
     }, {
       title: '联盟成员',
       dataIndex: 'memberCount',
       key: 'memberCount',
     }, {
       title: '状态',
       key: 'status',
       render: record => ['初始', '创建中', '完成创建'][record.status],
     }]
     render () {
       const { league: { list } } = this.props;
       return <div className="league-container">
         <section>
           <Button type="primary" style={{ float: 'right' }}>
             <Link to="/league/add">新增联盟</Link>
           </Button>
         </section>
         <section style={{ marginTop: '10px' }}>
           <Table rowKey={row => row.allianceName} dataSource={list} columns={this.columns} />
         </section>
       </div>;
     }
}
export default connect(({ league }) => ({
  league: league.toJS(),
}), null)(League);
