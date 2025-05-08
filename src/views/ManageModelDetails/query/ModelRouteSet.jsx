import React, { useMemo, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import RouteTable from '../table/RouteTable';
import ModelRouteDetailsTable from '../table/ModelRouteDetailsTable';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { Typography } from 'antd';

const ModelRouteSet = ({
  defaultCols,
  gridData,
  setGridData,
  cols,
  setCols,
  numRows,
  setNumRows,
  defaultColsModels,
  gridDataModels,
  setGridDataModels,
  colsModels,
  setColsModels,
  numRowsModels,
  setNumRowsModels
}) => {
  
  return (
    <div className="bg-slate-50 rounded-md overflow-auto">
      <Typography.Title className="border-b-1 uppercase border-gray-400 m-2" style={{ fontSize: 'medium', color: '#6b7280' }}>
        Đăng ký thông tin dây chuyền sản xuất
      </Typography.Title>
      <div className="bg-slate-50 rounded-md h-95  ">
        <Splitter className="w-full h-full mb-0 pb-0">
          <SplitterPanel size={25} minSize={10}>
            <RouteTable
              defaultCols={defaultCols}
              gridData={gridData}
              setGridData={setGridData}
              cols={cols}
              setCols={setCols}
              numRows={numRows}
              setNumRows={setNumRows}
              
            />
          </SplitterPanel>

          <SplitterPanel size={25} minSize={10}>
            <ModelRouteDetailsTable
              defaultCols={defaultColsModels}
              gridData={gridDataModels}
              setGridData={setGridDataModels}
              cols={colsModels}
              setCols={setColsModels}
              numRows={numRowsModels}
              setNumRows={setNumRowsModels}
            />
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  );
};

export default ModelRouteSet;
