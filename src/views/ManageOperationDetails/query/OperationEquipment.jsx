import React, { useMemo, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import EquipmentTable from '../table/EquipmentTable';
import OperationEquipTable from '../table/OperationEquipTable';

const OperationEquipment = ({
  defaultCols,
  gridData,
  setGridData,
  cols,
  setCols,
  numRows,
  setNumRows,

  defaultColsOpEqp,
  gridDataOpEqp,
  setGridDataOpEqp,
  colsRouteOp,
  setColsOpEqp,
  numRowsOpEqp,
  setNumRowsOpEqp,

  onVisibleRegionChanged,
  onCellRouteClicked,
  selection,
  setSelection,

  selectionRouteOp,
  setSelectionRouteOp,
  onCellRouteOpClicked
}) => {
  return (
    <div className="bg-slate-50  h-[calc(100vh-189px)]">
      <Splitter className="w-full h-full ">
        <SplitterPanel size={50} minSize={10}>
          <EquipmentTable
            defaultCols={defaultCols}
            gridData={gridData}
            setGridData={setGridData}
            cols={cols}
            setCols={setCols}
            numRows={numRows}
            setNumRows={setNumRows}
            onVisibleRegionChanged={onVisibleRegionChanged}
            onCellRouteClicked={onCellRouteClicked}
            selection={selection}
            setSelection={setSelection}
          />
        </SplitterPanel>

        <SplitterPanel size={50} minSize={10}>
          <OperationEquipTable
            defaultCols={defaultCols}
            gridData={gridData}
            setGridData={setGridData}
            cols={cols}
            setCols={setCols}
            numRows={numRows}
            setNumRows={setNumRows}
            selection={selection}
            setSelection={setSelection}
            onCellClicked={onCellRouteOpClicked}
          />
        </SplitterPanel>
      </Splitter>
    </div>
  );
};

export default OperationEquipment;
