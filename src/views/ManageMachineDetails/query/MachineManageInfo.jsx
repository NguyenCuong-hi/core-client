import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { DeleteOutline } from '@mui/icons-material';
import { Button, Col, DatePicker, Form, Image, Input, Radio, Row, Select, Tooltip, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MachineManageInfo = ({ formBasic, dataUnit, dataVendor, dataType, dataLocation, dataReworkTable }) => {
  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [file, setFile] = useState(null);

  const onChangeVendor = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeLocation = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeType = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeUnitQty = (value) => {
    console.log(`selected ${value}`);
  };

  const onChangeStatus = (value) => {
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

  const handleUploadImage = async () => {
    if (!file) {
      return;
    }
    // if (!ToolSeq) {
    //   return message.error('Vui lòng lưu thiết bị trước khi tải tệp lên!')
    // }

    // const formData = new FormData()
    // formData.append('file', file)
    // formData.append('Type', 'ASSET')
    // formData.append('IdxNo', 1)
    // formData.append('IdSeqAvatar', gridAvatar[0]?.IdSeq || null)

    // setLoading(true)
    // const result = await PostImage(formData, ToolSeq)
    // setLoading(false)
    setPreviewImage(file);

    if (result.success) {
      message.success('Tải ảnh thành công!');
    } else {
      message.error(result.message || 'Tải ảnh thất bại!');
    }
  };

  const handleUploadImage2 = async () => {
    if (!img2) {
      return;
    }
    if (!ToolSeq) {
      return message.error('Vui lòng lưu thiết bị trước khi tải tệp lên!');
    }

    const formData = new FormData();
    formData.append('file', img2);
    formData.append('Type', 'ASSET');
    formData.append('IdxNo', 2);
    formData.append('IdSeqAvatar', gridAvatar[1]?.IdSeq || null);

    setLoading(true);
    const result = await PostImage(formData, ToolSeq);
    setLoading(false);

    if (result.success) {
      message.success('Tải ảnh thành công!');
    } else {
      message.error(result.message || 'Tải ảnh thất bại!');
    }
  };
  const handleDeleteImage = async () => {
    if (!file && !previewImage) return;
    setLoading2(true);

    try {
      const idSeq = gridAvatar[0]?.IdSeq;
      if (idSeq) {
        const res = await AssetFileD([{ IdSeq: idSeq }]);
        setFile(null);
        setPreviewImage(null);
        message.success('Xóa thành công!');
        if (!res?.success) throw new Error(res?.message || 'Xóa ảnh thất bại');
      } else {
        setFile(null);
        setPreviewImage(null);
      }
    } catch {
      console.log('none');
    } finally {
      setLoading2(false);
    }
  };

  const handleDeleteImage2 = async () => {
    if (!img2 && !previewImage2) return;
    setLoading2(true);

    try {
      const idSeq = gridAvatar[1]?.IdSeq;
      if (idSeq) {
        const res = await AssetFileD([{ IdSeq: idSeq }]);
        setImg2(null);
        setPreviewImage2(null);
        message.success('Xóa thành công!');
        if (!res?.success) throw new Error(res?.message || 'Xóa ảnh thất bại');
      } else {
        setImg2(null);
        setPreviewImage2(null);
      }
    } catch {
      console.log('none');
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="bg-slate-50 ">
      <Form form={formBasic} layout="vertical">
        <Row gutter={[6, 6]} align={'middle'} className="m-2">
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Model</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'model'}
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
              label={<span className="uppercase text-[9px] w-[318px]">Nhà cung cấp</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'vendor'}
            >
              <Select showSearch placeholder="Vendor" optionFilterProp="label" onChange={onChangeVendor} allowClear options={dataVendor} />
            </Form.Item>
          </Col>
          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Phân loại</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'type'}
            >
              <Select showSearch placeholder="Type" optionFilterProp="label" onChange={onChangeType} allowClear options={dataType} />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Vị trí</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'location'}
            >
              <Select
                showSearch
                placeholder="Vị trí"
                optionFilterProp="label"
                onChange={onChangeLocation}
                allowClear
                options={dataLocation}
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
                options={dataLocation}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Trung tâm làm việc</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'workCenter'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Mã tài sản</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'assetName'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Sản phẩm áp dụng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'applicableProduct'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Đơn vị lắp ráp</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'assembler'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Giá mua</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'purchasePrice'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Ngày nhập kho</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'warehouseDate'}
            >
              <DatePicker className="w-[150px]" />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Tình trạng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'machineStatus'}
            >
              <Select
                showSearch
                placeholder="Tình trạng"
                optionFilterProp="label"
                onChange={onChangeStatus}
                allowClear
                options={dataLocation}
              />
            </Form.Item>
          </Col>

          <Col xs={{ flex: '100%' }} sm={{ flex: '50%' }} md={{ flex: '40%' }} lg={{ flex: '20%' }} xl={{ flex: '10%' }}>
            <Form.Item
              label={<span className="uppercase text-[9px] w-[150px]">Chiều dài</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'length'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Chiều rộng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'width'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Chiều cao</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'height'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Trọng lượng</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'weight'}
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
              label={<span className="uppercase text-[9px] w-[150px]">Mức tiêu thụ điện</span>}
              style={{ marginBottom: 0 }}
              labelCol={{ style: { marginBottom: 2, padding: 0 } }}
              wrapperCol={{ style: { padding: 0 } }}
              name={'power'}
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
        </Row>
        <Row gutter={[24, 6]} align={'center'} className="ml-2">
          <Col style={{ marginBottom: 2 }}>
            <Form.Item label={<span className="uppercase text-[9px]">{t('Image')}</span>}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  border: '1px solid #d9d9d9',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Avatar1"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    preview={true}
                  />
                ) : (
                  <Upload accept="image/*" showUploadList={false} beforeUpload={handleImageChange}>
                    <Button type="text" icon={<PlusOutlined />}>
                      {t('Chọn ảnh')}
                    </Button>
                  </Upload>
                )}
              </div>
              <div className="mt-1 gap-3 flex items-center">
                <Tooltip title="Cập nhật">
                  <Button shape="circle" loading={loading} onClick={handleUploadImage} icon={<UploadOutlined />} />
                </Tooltip>
                <Upload accept="image/*" showUploadList={false} beforeUpload={handleImageChange}>
                  <Tooltip title="Thêm ảnh">
                    <Button
                      // disabled={dataSheetSearch.length === 0}
                      shape="circle"
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>
                </Upload>
                <Tooltip title="Xóa ảnh">
                  <Button shape="circle" loading={loading2} onClick={handleDeleteImage} icon={<DeleteOutline />} />
                </Tooltip>
              </div>
            </Form.Item>
          </Col>

          <Col style={{ marginBottom: 4 }}>
            <Form.Item label={<span className="uppercase text-[9px]">{t('Image')}</span>}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  border: '1px solid #d9d9d9',
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Avatar1"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    preview={true}
                  />
                ) : (
                  <Upload accept="image/*" showUploadList={false} beforeUpload={handleImageChange}>
                    <Button type="text" icon={<PlusOutlined />}>
                      {t('Chọn ảnh')}
                    </Button>
                  </Upload>
                )}
              </div>
              <div className="mt-1 gap-3 flex items-center">
                <Tooltip title="Cập nhật">
                  <Button shape="circle" loading={loading} onClick={handleUploadImage} icon={<UploadOutlined />} />
                </Tooltip>
                <Upload accept="image/*" showUploadList={false} beforeUpload={handleImageChange}>
                  <Tooltip title="Thêm ảnh">
                    <Button
                      // disabled={dataSheetSearch.length === 0}
                      shape="circle"
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>
                </Upload>
                <Tooltip title="Xóa ảnh">
                  <Button shape="circle" loading={loading2} onClick={handleDeleteImage} icon={<DeleteOutline />} />
                </Tooltip>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MachineManageInfo;
