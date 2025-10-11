import { Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React from 'react';

const EventInfoQuery = ({ formBasic, dataChangeConfirm, dataStatus, dataCategory, dataAfterChange, }) => {


    const onChangeStatus = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeAfterChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeCategory = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeConfirm = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="bg-slate-50 ">
      <Form form={formBasic} layout="vertical">
        <Row className="gap-3 flex items-center mb-2 ml-2">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Tên sự kiện</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'eventName'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
                // value={ConfigProductName}
                // onChange={(e) => setConfigProductName(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Mã sự kiện</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'eventCode'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
                // value={ConfigProductName}
                // onChange={(e) => setConfigProductName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Mô tả</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'description'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
                // value={Description}
                // onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Trạng thái</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'status'}
            >
              <Select
                showSearch
                placeholder="Trạng thái"
                optionFilterProp="label"
                onChange={onChangeStatus}
                allowClear
                options={dataStatus}
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Danh mục</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'category'}
            >
              <Select
                showSearch
                placeholder="Danh mục"
                optionFilterProp="label"
                onChange={onChangeCategory}
                allowClear
                options={dataCategory}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Trạng thái sau khi thay đổi</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'afterChange'}
            >
              <Select
                showSearch
                placeholder="Trạng thái"
                optionFilterProp="label"
                onChange={onChangeAfterChange}
                allowClear
                options={dataAfterChange}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Xác nhận sau khi thay đổi</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'status'}
            >
              <Select
                showSearch
                placeholder="Trạng thái"
                optionFilterProp="label"
                onChange={onChangeConfirm}
                allowClear
                options={dataChangeConfirm}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EventInfoQuery;
