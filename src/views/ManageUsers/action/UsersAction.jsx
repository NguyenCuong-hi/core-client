import { Button, Typography, Upload } from 'antd';
import React from 'react';
import { DeleteOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';

const onSearch = (value) => {
  console.log(value);
};

const UsersAction = ({ onClickSave, onClickUpdate, onClickDelete, onClickImport }) => {

  return (
    <div className="flex justify-between items-center py-4">
      <Typography.Title level={4} className="!mb-0 uppercase" style={{ color: '#6b7280', fontWeight: 'bold' }}>
        Quản lý tài khoản
      </Typography.Title>

      <div className="flex items-center gap-2">
        <Button type="primary" icon={<SaveOutlined />} onClick={onClickSave}>
          Lưu
        </Button>

        <Button type="primary" icon={<DeleteOutlined />} onClick={onClickDelete}>
          Xóa
        </Button>
        <Upload accept=".xlsx,.xls" showUploadList={false} beforeUpload={onClickImport}>
          <Button type="primary" icon={<UploadOutlined />}>
            Import
          </Button>
        </Upload>
      </div>
    </div>
  );
};

export default UsersAction;
