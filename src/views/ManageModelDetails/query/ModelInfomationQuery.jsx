import { Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React from 'react';

const ModelInfomationQuery = ({
  formModelBasic,
  onFinish
}) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <div className="bg-slate-50 ">
      <Form form={formModelBasic} onFinish={onFinish} layout="vertical">
        <Row className="gap-3 flex items-center ml-2">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Tên cấu hình sản phẩm</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'configProdName'}
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
              label={<span className="uppercase text-[9px]">Mô tả</span>}
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
              label={<span className="uppercase text-[9px]">Ghi chú</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'approval'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
                // value={Note}
                // onChange={(e) => setNote(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              name={'approval'}
              label={<span className="uppercase text-[9px]">Chấp nhận</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
            >
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Trạng thái</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'status'}
            >
              <Select
                showSearch
                placeholder="Trạng thái"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                allowClear
                options={[
                  {
                    value: '1',
                    label: 'Đang hoạt động'
                  },
                  {
                    value: '2',
                    label: 'Không hoạt động'
                  },
                  {
                    value: '3',
                    label: 'Chờ duyệt'
                  }
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Khách hàng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'customer'}
            >
              <Input placeholder="" className="w-[150px]" size="middle" />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Người đăng ký</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'userRegister'}
            >
              <Input placeholder="" className="w-[150px]" size="middle" />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Hạn dùng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'dateExpire'}
            >
              <DatePicker
                // value={DatePeriod}
                // onChange={(date, dateString) => setDatePeriod(dateString)}
                format="YYYY-MM-DD"
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="gap-3 flex items-center m-2 ">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Loại sản phẩm L</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'modelTypeL'}
            >
              <Select
                showSearch
                placeholder="Loại sản phẩm"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                allowClear
                options={[
                  {
                    value: 'L-1',
                    label: 'L-1'
                  },
                  {
                    value: 'L-2',
                    label: 'L-2'
                  },
                  {
                    value: 'L-3',
                    label: 'L-3'
                  }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Loại sản phẩm M</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'modelTypeM'}
            >
              <Select
                showSearch
                placeholder="Loại sản phẩm "
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                allowClear
                options={[
                  {
                    value: 'M-1',
                    label: 'M-1'
                  },
                  {
                    value: 'M-2',
                    label: 'M-2'
                  },
                  {
                    value: 'M-3',
                    label: 'M-3'
                  }
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Loại sản phẩm S</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'modelTypeS'}
            >
              <Select
                showSearch
                placeholder="Loại sản phẩm"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                allowClear
                options={[
                  {
                    value: 'S-1',
                    label: 'S-1'
                  },
                  {
                    value: 'S-2',
                    label: 'S-2'
                  },
                  {
                    value: 'S-3',
                    label: 'S-3'
                  }
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Khách hàng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'customer'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Nhãn hiệu</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'label'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Thiết bị khách hàng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'deviceCustomer'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Dự án</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'projectName'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
              />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Người nhận hàng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'consignee'}
            >
              <Input
                placeholder=""
                className="w-[150px]"
                size="middle"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ModelInfomationQuery;
