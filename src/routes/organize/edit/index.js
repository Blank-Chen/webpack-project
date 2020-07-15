/**
* @desc page of add organize
* @author pika
*/
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Col, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../style.scss';

const FormItem = Form.Item;
const FormList = Form.List;
const { TextArea } = Input;
const { Option } = Select;

class OrganizeAdd extends Component {
 onSubmit = (values) => {
   const { dispatch } = this.props;
   const orgList = values.orgs.map(org => ({
     desc: org,
   }));
   /*eslint-disable*/
   delete values.orgs;
   /* eslint-enable */
   dispatch({
     type: 'organize/addOrganize',
     payload: { ...values, orgs: orgList },
   });
 }
 render () {
   return <div className="organize-add-container" >
     <Form name="multiple-form" labelCol={{ span: 2 }} wrapperCol={{ span: 18 }} onFinish={this.onSubmit}>
       <FormItem required label="联盟描述" name="allianceDesc">
         <TextArea rows={4} placeholder="请输入联盟描述" />
       </FormItem>
       <FormItem required label="共识机制" initialValue="RAFT" name="consensus">
         <Select>
           <Option value="RAFT">RAFT</Option>
         </Select>
       </FormItem>
       <FormItem required label="账本背书策略" initialValue="ANY" name="endorsePolicy">
         <Select>
           <Option value="ANY">ANY</Option>
           <Option value="ALL">ALL</Option>
         </Select>
       </FormItem>
       <FormItem required label="账本描述" name="ledgerDesc">
         <TextArea rows={4} />
       </FormItem>
       <FormItem required label="组织节点个数" name="orgPeerCount">
         <Input type="number" />
       </FormItem>
       <FormList required name="orgs">
         {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <FormItem
                  label="组织"
                  required
                  key={field.key}
                >
                  <Col span={24} style={{ display: 'flex' }}>
                    <Col span={24}><FormItem
                      {...field}
                  >
                      <TextArea rows={2} placeholder="请输入组织描述" />
                    </FormItem></Col>
                    <Col span={2}>{fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ fontSize: '20px', margin: '5px' }}
                        onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}</Col>
                  </Col>
                </FormItem>
              ))}
              <FormItem label="组织">
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> 添加
                </Button>
              </FormItem>
            </div>
          );
        }}
       </FormList>
       <Col span={24} style={{ textAlign: 'center' }}><Button type="primary" htmlType="submit">保存</Button></Col>
     </Form>
   </div>;
 }
}
export default connect(({ organize }) => ({
  organize: organize.toJS(),
}), null)(OrganizeAdd);

