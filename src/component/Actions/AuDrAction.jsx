import { RefreshOutlined, UpdateOutlined } from '@mui/icons-material';
import { Button, Typography } from 'antd';
import React from 'react';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';

const onSearch = (value) => {
  console.log(value);
};

const AuDrAction = ({

  onClickSave,
  onClickUpdate,
  onClickDelete,
  onClickReset,
  titlePage,

}) => {
  return (
    <div className="flex justify-between items-center py-4">
      <Typography.Title level={4} className="!mb-0 uppercase" style={{ color: '#6b7280', fontWeight: 'bold' }}>
        {titlePage}
      </Typography.Title>

      <div className="flex items-center gap-2">

        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={onClickSave}
        >
          Lưu
        </Button>
        {/* <Button
          type="primary"
          icon={<UpdateOutlined />}
          onclick={onClickUpdate}
        >
          Sửa
        </Button> */}
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onclick={onClickDelete}>
          Xóa
        </Button>
        <Button
          type="primary"
          icon={<RefreshOutlined />}
          onclick={onClickReset}>
          Làm mới
        </Button>
      </div>
    </div>


  );
};

export default AuDrAction;
