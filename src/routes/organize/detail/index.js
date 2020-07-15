/**
* @desc detail page of organize
* @author pika
*/
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal } from 'antd';
import './style.scss';

class OrgInfo extends Component {
    columns=[{
      title: 'couchDb访问路径',
      dataIndex: 'couchDbUrl',
      key: 'couchDbUrl',
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '节点描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '节点标识',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '节点访问路径',
      dataIndex: 'url',
      key: 'url',
    }, {
      title: '操作',
      key: 'operate',
      render: item => <Button onClick={() => this.viewLedger(item)}>查看账本</Button>,
    }]
    // datasource of ledger
    ledgerColumns=[{
      title: '账本描述',
      dataIndex: 'desc',
      key: 'desc',
    }, {
      title: '账本标识',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '链码列表',
      key: 'url',
      render: item => <div className="chaincode-contain">
        <ul>
          {item.chaincodes.map(chain => <li key={chain.name}>
            <label>{chain.name}：</label>
            <span>{chain.desc}</span>
          </li>)}
        </ul>
      </div>,
    }]
    // review ledger
    viewLedger=(item) => {
      this.props.dispatch({
        type: 'organize/getLedgers',
        payload: {
          peerName: item.name,
        },
      });
    }
    // cancel of modal
    handleCancel=() => {
      this.props.dispatch({
        type: 'organize/save',
        payload: {
          modelShow: false,
        },
      });
    }
    render () {
      const { organize: { peers, modelShow, ledgerData } } = this.props;
      return (<div className="organize-detail-container">
        {/* <Col span={24}>
          <Col span={4}>
            <label>组织描述：</label>
          </Col>
          <Col span={20}>  <span>{info.desc}</span></Col>
        </Col>
        <Col span={24}>
          <Col span={4}>
            <label>组织域名：</label>
          </Col>
          <Col span={20}>  <span>{info.domain}</span></Col>
        </Col>
        <Col span={24}>
          <Col span={4}>
            <label>组织标识：</label>
          </Col>
          <Col span={20}>  <span>{info.name}</span></Col>
        </Col>
        <Col span={24}>
          <Col span={4}>
            <label>节点个数：</label>
          </Col>
          <Col span={20}><span>{info.peerCount}</span></Col>
        </Col> */}
        <h1 style={{ marginBottom: '10px' }}>组织节点列表：</h1>
        <Table dataSource={peers} columns={this.columns} />
        <Modal
          footer={null}
          destroyOnClose
          visible={modelShow}
          onCancel={this.handleCancel}
          title="账本信息"
          width="80%"
          className="bn-modal">
          <Table rowKey={r => r.name} columns={this.ledgerColumns} dataSource={ledgerData} />
        </Modal>
      </div>);
    }
}
export default connect(({ organize }) => ({
  organize: organize.toJS(),
}), null)(OrgInfo);
