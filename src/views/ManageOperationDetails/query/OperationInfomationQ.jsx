import { Approval, Description, Label, Note } from '@mui/icons-material';
import { Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd';
import React from 'react';

const OperationInfomationQuery = ({ formDataBasic, onFinish }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <div className="bg-slate-50 rounded-md overflow-auto">
      <Typography.Title className="border-b-1 uppercase border-gray-400 m-2" style={{ fontSize: 'medium', color: '#6b7280' }}>
        Đăng ký thông tin cơ bản
      </Typography.Title>
      <Form form={formDataBasic} onFinish={onFinish} layout="vertical">
        <Row className="gap-3 flex items-center m-2 ">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Mã công đoạn</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'OperationCode'}
            >
              <Input placeholder="" className="w-[150px]" size="middle" />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Mô tả</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0, width: 300 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'Description'}
            >
              <Input placeholder="" className="w-[300px]" size="middle" />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Đơn vị số lượng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'UnitQty'}
            >
              <Input placeholder="" className="w-[150px]" size="middle" />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              name={'Step'}
              label={<span className="uppercase text-[9px]">Bước thao tác</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
            >
              <Select
                showSearch
                placeholder="Bước thao tác"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                allowClear
                options={[
                  {
                    value: '1',
                    label: 'Kết thúc'
                  },
                  {
                    value: '2',
                    label: 'Bắt đầu và kết thúc'
                  },
                  {
                    value: '3',
                    label: 'Thao tác lại'
                  }
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Cho phép xử lý hàng loạt</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isBatchProcess'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Sử dụng nhiều thiết bị</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isMultiEquipment'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>
        {/* </Row>
        <Row className="gap-3 flex items-center m-2 "> */}
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Kiểm tra chất lượng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isRequestQA'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Thay đổi dây chuyền</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isChangeRoute'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Lưu trữ/Tồn hàng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isStock'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Kiểm tra nguyên vật liệu</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isCheckMaterial'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Áp dụng bước thao tác</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'isUseStep'}
            >
              <Checkbox onChange={(e) => onChange(e.target.checked)}>Áp dụng</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px]">Mã lỗi</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'LossTable'}
            >
              <Select
                showSearch
                placeholder="Mã lỗi"
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
              label={<span className="uppercase text-[9px]">Mã thành công</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'SuccessTable'}
            >
              <Select
                showSearch
                placeholder="Mã thành công"
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
        </Row>
      </Form>
    </div>
  );
};

export default OperationInfomationQuery;
