import React, { useMemo, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import RouteTable from '../table/RouteTable';
import ModelRouteDetailsTable from '../table/ModelRouteDetailsTable';

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
      <div className="bg-slate-50 h-[calc(100vh-280px)]">
        <Splitter className="w-full h-full ">
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

  );
};

export default ModelRouteSet;
