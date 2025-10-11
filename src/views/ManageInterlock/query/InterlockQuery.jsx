import { Editor } from '@monaco-editor/react';
import { Col, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InterlockQuery = ({ formBasic, ruleTypeData, workModeData, transactionData, typeCheckData, dataGroupDevice, dataGroupEqp, dataOperation }) => {
  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [file, setFile] = useState(null);

  const onChangeRuleTypeCode = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeWorkMode = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeTransactionCode = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeGroupDevice = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeGroupEqp = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeOperation = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeTypeCheck = (value) => {
    console.log(`selected ${value}`);
  };

  const handleImageChange = (file) => {
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    return false;
  };

  return (
    <div className="bg-slate-50 ">
      <Form form={formBasic} layout="vertical">
        <Row gutter={[6, 6]} align={'middle'} className="m-2">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Loại Interlock</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'ruleTypeCode'}
            >
              <Select
                showSearch
                placeholder="Loại Interlock"
                optionFilterProp="label"
                onChange={onChangeRuleTypeCode}
                allowClear
                options={ruleTypeData}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Loại thao tác</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'workMode'}
            >
              <Select
                showSearch
                placeholder="Thao tác"
                optionFilterProp="label"
                onChange={onChangeWorkMode}
                allowClear
                options={workModeData}
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
                // value={ConfigProductName}
                // onChange={(e) => setConfigProductName(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Loại Transaction</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'transactionCode'}
            >
              <Select
                showSearch
                placeholder="Transaction"
                optionFilterProp="label"
                onChange={onChangeTransactionCode}
                allowClear
                options={transactionData}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Nhóm dòng sản phẩm</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'groupDevice'}
            >
              <Select
                showSearch
                placeholder="Dòng sản phẩm"
                optionFilterProp="label"
                onChange={onChangeGroupDevice}
                allowClear
                options={dataGroupDevice}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Nhóm thiết bị</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'groupEqp'}
            >
              <Select
                showSearch
                placeholder="Nhóm thiết bị"
                optionFilterProp="label"
                onChange={onChangeGroupEqp}
                allowClear
                options={dataGroupEqp}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Công đoạn</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'operation'}
            >
              <Select
                showSearch
                placeholder="Công đoạn"
                optionFilterProp="label"
                onChange={onChangeOperation}
                allowClear
                options={dataOperation}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Thiết bị</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'eqpCode'}
            >
              <Select
                showSearch
                placeholder="Thiết bị"
                optionFilterProp="label"
                onChange={onChangeTypeCheck}
                allowClear
                options={dataGroupEqp}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Loại kiểm tra</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'typeCheck'}
            >
              <Select
                showSearch
                placeholder="Procedure/Script"
                optionFilterProp="label"
                onChange={onChangeTypeCheck}
                allowClear
                options={typeCheckData}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Mail</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'mailGroup'}
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
        </Row>

        <Row gutter={[6, 6]} align={'middle'} className="mr-2 flex flex-wrap md:flex-nowrap">
          <Col flex="1 1 300px" className="min-w-[300px]">
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">SQL</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name="textSQL"
            >
              <div className="w-full h-[350px] border rounded">
                <Editor
                  height="100%"
                  defaultLanguage="sql"
                  theme="vs-light"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    scrollBeyondLastLine: false
                  }}
                />
              </div>
            </Form.Item>
          </Col>

          <Col flex="1 1 300px" className="min-w-[250px]">
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Message</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name="errorText"
            >
              <div className="w-full h-[350px] border rounded">
                <Editor
                  height="100%"
                  defaultLanguage="text"
                  theme="vs-light"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    scrollBeyondLastLine: false
                  }}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InterlockQuery;
