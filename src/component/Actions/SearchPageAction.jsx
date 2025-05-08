import { FilterOutlined, SaveOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip, Typography } from 'antd';
import React from 'react';

const SearchPageAction = ({
  titlePage,
  onSearch,
  onClickSearch,
  onClickFilter,
  keyword,
  setKeyword,


}) => {
  return (
    
    <div className="flex justify-between items-center py-4">
    <Typography.Title level={4} className="!mb-0 uppercase" style={{ color: '#6b7280', fontWeight:'bold' }}>
      {titlePage}
    </Typography.Title>

    <div className="flex items-center gap-2">
      <Input.Search
        placeholder="Search"
        allowClear
        onSearch={onSearch}
        value={keyword}
        style={{ width: 300 }}
      />
      <Tooltip title="Filter">
        <Button 
        type="primary" 
        icon={<FilterOutlined />}
        onClick={onClickFilter} 
        />
      </Tooltip>
      <Button 
      type="primary" 
      icon={<SearchOutlined />}
      onClick={onClickSearch}>
        Search
      </Button>
      <Button 
      type="primary" 
      icon={<SaveOutlined />}
      onClick={onClickSearch}>
        Lưu
      </Button>
    </div>
  </div>


  );
};

export default SearchPageAction;
