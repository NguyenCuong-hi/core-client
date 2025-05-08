import { Typography } from 'antd';
import CategoryTable from 'component/Sheets/CategoryTable';
import React from 'react';

const ModelGroupCategory = ({
  defaultCols,
  gridData,
  setGridData,
  cols,
  setCols,
  numRows,
  setNumRows,
  handleRowAppend
}) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onCellEdited = (cell, value) => {
    console.log('cell', cell, 'value', value);
  }
  const cellConfig = {
    
  };
  return (
    <div className="bg-slate-50 rounded-md overflow-auto mb-4 pb-10">
      <Typography.Title className="border-b-1 uppercase border-gray-400 m-2" style={{ fontSize: 'medium', color: '#6b7280' }}>
        Đăng ký thông tin danh mục sản phẩm
      </Typography.Title>
      <div className="bg-slate-50 rounded-md h-95 ">
        <CategoryTable
          
          defaultCols={defaultCols}
          gridData={gridData}
          setGridData={setGridData}
          cols={cols}
          setCols={setCols}
          numRows={numRows}
          setNumRows={setNumRows}
          onCellEdited={onCellEdited}
          cellConfig={cellConfig}
          handleRowAppend = {handleRowAppend}
        />
      </div>
    </div>
  );
};

export default ModelGroupCategory;
