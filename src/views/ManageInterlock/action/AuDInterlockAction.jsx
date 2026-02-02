import { RefreshOutlined, UpdateOutlined } from '@mui/icons-material';
import { Button, Typography } from 'antd';
import React from 'react';
import { DeleteOutlined, SaveOutlined, SwitcherFilled, SwitcherOutlined, ThunderboltOutlined } from '@ant-design/icons';

const onSearch = (value) => {
  console.log(value);
};

const AuDInterlockAction = ({

  onClickSave,
  onClickUpdate,
  onClickDelete,
  onClickReset,
  titlePage,
  onClickCopy,
  onClickSaveNewId,

}) => {
  return (
    <div className="flex justify-between items-center py-1">
      <Typography.Title level={5} className="!mb-0 uppercase" style={{ color: '#6b7280', fontWeight: 'bold', paddingLeft: '10px' }}>
        {titlePage}
      </Typography.Title>

      <div className="flex items-center gap-2">

        <Button
          type="text"
          icon={<SaveOutlined style={{ color: '#10b981' }} />}
          onClick={onClickSaveNewId}
        >
          Tạo ID mới
        </Button>
        <Button
          type="text"
          icon={<SaveOutlined style={{ color: '#10b981' }} />}
          onClick={onClickSave}
        >
          Lưu
        </Button>

        <Button
          type="text"
          icon={<DeleteOutlined style={{ color: '#ef4444' }} />}
          onClick={onClickDelete}>
          Xóa
        </Button>
        <Button
          type="text"
          icon={<SwitcherOutlined />}
          onClick={onClickCopy}>
          Sao chép
        </Button>
        <Button
          type="text"
          icon={<ThunderboltOutlined />}
          onClick={onClickReset}>
          Mới
        </Button>
      </div>
    </div>


  );
};

export default AuDInterlockAction;
