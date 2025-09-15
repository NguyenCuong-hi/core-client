import { Col, Form, Row, Select } from 'antd';
import React from 'react';

const OperationManageInfo = ({
  formBasic,
  dataUnit,
  dataStep,
  dataLossTable,
  dataSuccessTable,
  dataReworkTable,
  dataInParam,
  dataOutParam,
  dataBonusTable
}) => {
  const onChangeSuccessTable = (value) => {
    if (value !== undefined) {
      const unit = dataSuccessTable.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeUnitQty = (value) => {
    if (value !== undefined) {
      const unit = dataUnit.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeStep = (value) => {
    if (value !== undefined) {
      const unit = dataStep.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeLossTable = (value) => {
    if (value !== undefined) {
      const unit = dataLossTable.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeInParam = (value) => {
    if (value !== undefined) {
      const unit = dataInParam.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeOutParam = (value) => {
    if (value !== undefined) {
      const unit = dataOutParam.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeReworkParam = (value) => {
    if (value !== undefined) {
      const unit = dataReworkTable.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  const onChangeBonusParam = (value) => {
    if (value !== undefined) {
      const unit = dataBonusTable.find((x) => x.value === value);
      formBasic.setFieldsValue({
        unitQty: unit.value
      });
    }
  };

  return (
    <div className="bg-slate-50 ">
      <Form form={formBasic} layout="vertical">
        <Row className="gap-3 flex items-center ml-2 justify-around">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Đơn vị cơ bản</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'unitQty'}
            >
              <Select showSearch placeholder="Đơn vị" optionFilterProp="label" onChange={onChangeUnitQty} allowClear options={dataUnit} />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Bước thao tác</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'step'}
            >
              <Select showSearch placeholder="Thao tác" optionFilterProp="label" onChange={onChangeStep} allowClear options={dataStep} />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Mã lỗi</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'lossTable'}
            >
              <Select
                showSearch
                placeholder="Mã lỗi"
                optionFilterProp="label"
                onChange={onChangeLossTable}
                allowClear
                options={dataLossTable}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Mã hoàn thành</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'successTable'}
            >
              <Select
                showSearch
                placeholder="Mã hoàn thành"
                optionFilterProp="label"
                onChange={onChangeSuccessTable}
                allowClear
                options={dataSuccessTable}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Tham số đầu vào</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'inParam'}
            >
              <Select
                showSearch
                placeholder="Tham số đầu vào"
                optionFilterProp="label"
                onChange={onChangeInParam}
                allowClear
                options={dataSuccessTable}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Tham số đầu ra</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'outParam'}
            >
              <Select
                showSearch
                placeholder="Tham số đầu ra"
                optionFilterProp="label"
                onChange={onChangeOutParam}
                allowClear
                options={dataSuccessTable}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Tham số thao tác lại</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'reworkParam'}
            >
              <Select
                showSearch
                placeholder="Tham số thao tác lại"
                optionFilterProp="label"
                onChange={onChangeReworkParam}
                allowClear
                options={dataSuccessTable}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[200px]">Tham số thao bổ sung</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'bonusParam'}
            >
              <Select
                showSearch
                placeholder="Tham số thao bổ sung"
                optionFilterProp="label"
                onChange={onChangeBonusParam}
                allowClear
                options={dataSuccessTable}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default OperationManageInfo;
