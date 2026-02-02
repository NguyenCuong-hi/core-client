import { Editor } from '@monaco-editor/react';
import { Col, Form, Input, Row, Select } from 'antd';
import PopUpDeviceOnField from 'component/popup/popupDeviceOnField';
import PopupOperationOnField from 'component/popup/popupOperationOnField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InterlockQuery = ({
  formBasic,
  ruleTypeData,
  workModeData,
  transactionData,
  typeCheckData,
  dataGroupDevice,
  dataGroupEqp,
  dataOperation,
  sql,
  setSql,
  message,
  setMessage,
  setTransactionId,
  setGroupDeviceId,
  setGroupEqpId,
  setOperationId,
  setTypeCheckId,
  setWorkModeId,
  eqpName,
  setEqpName,
  setEqpId,

  operation,
  setOperation,
  
}) => {
  const { t } = useTranslation();

  const [dropdownDeviceVisible, setDropdownDeviceVisible] = useState(false);
  const [dropdownOperationVisible, setDropdownOperationVisible] = useState(false);
  const [selectionDevice, setSelectionDevice] = useState([]);
  const [deviceSearchSh, setDeviceSearchSh] = useState('');

  const [selectionOperation, setSelectionOperation] = useState([]);
  const [opeationSearchSh, setOpeationSearchSh] = useState('');

  const onChangeWorkMode = (value) => {
    const data = workModeData.find((item) => item.value === value);
    formBasic.setFieldsValue({
      workMode: data.value
    });
    setWorkModeId(data.id);
  };

  const onChangeTransactionCode = (value) => {
    const data = transactionData.find((item) => item.value === value);
    formBasic.setFieldsValue({
      transactionCode: data.value
    });
    setTransactionId(data.id);
  };

  const onChangeGroupDevice = (value) => {
    const data = dataGroupDevice.find((item) => item.value === value);
    formBasic.setFieldsValue({
      groupDevice: data.value,
      groupDeviceId: data.id
    });
    setGroupDeviceId(data.id);
  };

  const onChangeGroupEqp = (value) => {
    const data = dataGroupEqp.find((item) => item.value === value);
    formBasic.setFieldsValue({
      groupEqp: data.value
    });
    setGroupEqpId(data.id);
  };

  const onChangeOperation = (value) => {
    const data = dataOperation.find((item) => item.value === value);
    formBasic.setFieldsValue({
      operation: data.value
    });
    setOperationId(data.id);
  };

  const onChangeTypeCheck = (value) => {
    const data = typeCheckData.find((item) => item.value === value);
    formBasic.setFieldsValue({
      typeCheck: data.value
    });
    setTypeCheckId(data.id);
  };

  const onChangeMessageError = (value) => {
    setMessage(value);
  };

  const onChangeSql = (value) => {
    setSql(value);
  };

  return (
    <div className="bg-slate-50 ">
      <Form form={formBasic} layout="vertical">
        <Row gutter={[6, 6]} align={'middle'} className="m-2">
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
            >

              <Input
                placeholder="Công đoạn"
                className="w-[250px]"
                size="middle"
                value={operation}
                onFocus={() => setDropdownOperationVisible(true)}
                style={{ backgroundColor: '#e8f0ff' }}
              />
              {dropdownOperationVisible && (
                <PopupOperationOnField
                  data={dataGroupDevice}
                  nameCodeHelp={'Công đoạn'}
                  modalVisible={dropdownOperationVisible}
                  setModalVisible={setDropdownOperationVisible}
                  searchSh={opeationSearchSh}
                  setDeviceSearchSh={setOpeationSearchSh}
                  selectionData={selectionOperation}
                  setSelectionData={setSelectionOperation}
                  name={operation}
                  setName={setOperation}
                  setId={setOperationId}
                />
              )}
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Thiết bị</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
            >
              <Input
                placeholder="Thiết bị"
                className="w-[250px]"
                size="middle"
                value={eqpName}
                onFocus={() => setDropdownDeviceVisible(true)}
                style={{ backgroundColor: '#e8f0ff' }}
              />
              {dropdownDeviceVisible && (
                <PopUpDeviceOnField
                  data={dataGroupDevice}
                  nameCodeHelp={'Thiết bị'}
                  modalVisible={dropdownDeviceVisible}
                  setModalVisible={setDropdownDeviceVisible}
                  searchSh={deviceSearchSh}
                  setDeviceSearchSh={setDeviceSearchSh}
                  selectionData={selectionDevice}
                  setSelectionData={setSelectionDevice}
                  eqpName={eqpName}
                  setEqpName={setEqpName}
                  setId={setEqpId}
                />
              )}
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
                  value={sql}
                  onChange={onChangeSql}
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
                  value={message}
                  onChange={onChangeMessageError}
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
