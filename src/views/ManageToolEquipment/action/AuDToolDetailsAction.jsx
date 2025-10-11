import { RefreshOutlined, UpdateOutlined } from '@mui/icons-material';
import { Button, Input, Tooltip, Typography } from 'antd';
import React from 'react';
import { DeleteOutlined, FilterOutlined, ImportOutlined, SaveOutlined, SwitcherFilled, SwitcherOutlined, ThunderboltOutlined } from '@ant-design/icons';

const onSearch = (value) => {
  console.log(value);
};

const AuDToolDetailAction = ({
  keyword,
  setKeyword,
  onClickSave,
  onClickUpdate,
  onClickDelete,
  onClickImport,
  titlePage,
  onClickCopy,
  onClickFilter
}) => {
  return (
    <div className="flex justify-between items-center py-1">
      <Typography.Title level={5} className="!mb-0 uppercase" style={{ color: '#6b7280', fontWeight: 'bold', paddingLeft: '10px' }}>
        {titlePage}
      </Typography.Title>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search"
          allowClear
          onSearch={onSearch}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 300 }}
        />
        <Tooltip title="Filter">
          <Button icon={<FilterOutlined />} onClick={onClickFilter} />
        </Tooltip>

        <Button type="text" icon={<SaveOutlined style={{ color: '#10b981' }} />} onClick={onClickSave}>
          Lưu
        </Button>

        <Button type="text" icon={<DeleteOutlined style={{ color: '#ef4444' }} />} onClick={onClickDelete}>
          Xóa
        </Button>

        <Button type="text" icon={<ImportOutlined style={{ color: '#ef4444' }} />} onClick={onClickImport}>
          Import
        </Button>
        
      </div>
    </div>
  );
};

export default AuDToolDetailAction;
