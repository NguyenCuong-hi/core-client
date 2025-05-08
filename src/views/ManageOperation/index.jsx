import React, { useCallback, useEffect, useMemo, useState } from 'react';

// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import OperationTable from './table/OperationTable';
import SearchPageAction from 'component/Actions/SearchPageAction';
import LoadingBlur from 'component/Loader/LoadingBlur';
import { onRowAppended } from 'utils/sheets/onRowAppended';


// ==============================|| OPERATION PAGE ||============================== //

const ManageOperation = ({
  canCreate,
  canEdit,
  canDelete,
  canView,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

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
      trailingRowOptions: {
        disabled: false
      }
    },
    {
      title: t('Mã công đoạn'),
      id: 'OperationId',
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
      title: t('Mã công đoạn'),
      id: 'OperationCode',
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
      title: t('Mô tả công đoạn'),
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
      title: t('Đơn vị'),
      id: 'Unit',
      kind: 'Custom',
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
      title: t('Bước thao tác'),
      id: 'ProcessStep',
      kind: 'Custom',
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
      title: t('Cho phép xử lý hàng loạt'),
      id: 'IsBatchProcess',
      kind: 'Boolean',
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
      title: t('Cho phép sử dụng nhiều thiết bị'),
      id: 'IsMultiEqp',
      kind: 'Boolean',
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
      title: t('Có kiểm tra chất lượng'),
      id: 'IsRequestQa',
      kind: 'Boolean',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    ,
    {
      title: t('Cho phép thay đổi dây chuyền'),
      id: 'IsChangeRoute',
      kind: 'Boolean',
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
      title: t('Cho phép tồn hàng/lưu trữ'),
      id: 'IsStock',
      kind: 'Boolean',
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
      title: t('Kiểm tra nguyên vật liệu'),
      id: 'IsCheckMaterial',
      kind: 'Boolean',
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
      title: t('Sử dụng bước thao tác'),
      id: 'IsUseStep',
      kind: 'Boolean',
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
      title: t('Sử dụng mã lỗi'),
      id: 'LossTable',
      kind: 'Custom',
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
      title: t('Sử dụng mã hoàn thành'),
      id: 'SuccessTable',
      kind: 'Custom',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);

  const [cols, setCols] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_OPERATION_LIST',
      defaultCols.filter((col) => col.visible)
    )
  );
  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);
    const [numRowsToAdd, setNumRowsToAdd] = useState(null);
    const [addedRows, setAddedRows] = useState([]);
      const [editedRows, setEditedRows] = useState([])
    
  
    const handleRowAppend = useCallback(
      (numRowsToAdd) => {
        if (canCreate === false) {
          message.warning('Bạn không có quyền thêm dữ liệu');
          return;
        }
        onRowAppended(cols, setGridData, setNumRows, setAddedRows, numRowsToAdd);
      },
      [canCreate, cols, setGridData, setNumRows, setAddedRows, numRowsToAdd]
    );

  if (loading) {
    return <LoadingBlur />;
  }

  return (
    <>
      <div className="h-full mt-4 pr-4 pl-4">
        <SearchPageAction
          titlePage={"Danh sách công đoạn"}
        />
        <OperationTable
          defaultCols={defaultCols}
          gridData={gridData}
          setGridData={setGridData}
          cols={cols}
          setCols={setCols}
          numRows={numRows}
          setNumRows={setNumRows}
          handleRowAppend={handleRowAppend}
          editedRows={editedRows}
          setEditedRows={setEditedRows}
        />
      </div>
    </>
  );
};

export default ManageOperation;
