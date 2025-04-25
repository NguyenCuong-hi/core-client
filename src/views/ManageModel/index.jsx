import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Typography } from '@mui/material';

// project import

import ModelAction from './action/ModelAction';
import ModelTable from './table/ModelTable';
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { message } from 'antd';
import SearchPageAction from 'component/Actions/SearchPageAction';


// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPage = (
  canCreate
) => {
  const { t } = useTranslation();

  const defaultCols = useMemo(() => [
    {
      title: '',
      id: 'Status',
      kind: 'Text',
      readonly: false,
      width: 50,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderLookup,
    },
    {
      title: t('Dòng sản phẩm'),
      id: 'ModelId',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
    },
    {
      title: t('Tên dòng sản phẩm'),
      id: 'ModelName',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mô tả'),
      id: 'Description',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Chấp nhận'),
      id: 'isApprove',
      kind: 'Text',
      readonly: false,
      width: 150,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Đang áp dụng'),
      id: 'isContinue',
      kind: 'Boolean',
      readonly: false,
      width: 150,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
    ,
    {
      title: t('Loại dây chuyền (NPI/MP)'),
      id: 'ProcessTypeId',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Loại dây chuyền (NPI/MP)'),
      id: 'ProcessType',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Model'),
      id: 'Model',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Khách hàng'),
      id: 'Customer',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Khách hàng'),
      id: 'CustomerId',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Thiết bị khách hàng'),
      id: 'CustomerDevice',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
  ]);

  const [cols, setCols] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_MODEL_LIST',
      defaultCols.filter((col) => col.visible)
    )
  );

  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [addedRows, setAddedRows] = useState([])
  const [numRowsToAdd, setNumRowsToAdd] = useState(null)
  const [editedRows, setEditedRows] = useState([])


  const handleRowAppend = useCallback(
    (numRowsToAdd) => {
        if (canCreate === false) {
            message.warning('Bạn không có quyền thêm dữ liệu')
            return
        }
        onRowAppended(cols, setGridData, setNumRows, setAddedRows, numRowsToAdd)
    },
    [cols, setGridData, setNumRows, setAddedRows, numRowsToAdd],
)
  return (
    <>
      <div className="h-full mt-4 pr-4 pl-4">
        <SearchPageAction 
          titlePage={"Danh sách dòng sản phẩm"}
        />
        <ModelTable
          defaultCols={defaultCols}
          gridData={gridData}
          setGridData={setGridData}
          cols={cols}
          setCols={setCols}
          numRows={numRows}
          setNumRows={setNumRows}
          handleRowAppend={handleRowAppend}
          numRowsToAdd={numRowsToAdd}
          setNumRowsToAdd={setNumRowsToAdd}
          addedRows= {addedRows}
          setAddedRows={setAddedRows}
          setEditedRows={setEditedRows}
        />
      </div>
    </>
  );
};

export default ManageModelPage;
