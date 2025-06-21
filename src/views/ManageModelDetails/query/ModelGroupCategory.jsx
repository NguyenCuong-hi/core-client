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
      <div className="bg-slate-50  h-[calc(100vh-255px)]">
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

  );
};

export default ModelGroupCategory;
