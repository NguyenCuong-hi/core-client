import React, { useCallback, useMemo, useState } from 'react';

// project import
import ModelTable from './table/ModelTable';
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { message } from 'antd';
import SearchPageAction from 'component/Actions/SearchPageAction';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPage = (canCreate) => {
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
      trailingRowOptions: {
        disabled: false
      }
    },
    {
      title: t('Dòng sản phẩm'),
      id: 'ConfigProductCode',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID
    },
    {
      title: t('Tên dòng sản phẩm'),
      id: 'ConfigProductName',
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
      kind: 'Boolean',
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
      title: t('Trạng thái'),
      id: 'status',
      kind: 'Custom',
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
    {
      title: t('Nhãn hiệu'),
      id: 'Label',
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
      title: t('Quy trình sản xuất'),
      id: 'RouterName',
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
      title: t('Quy trình sản xuất'),
      id: 'RouterCode',
      kind: 'Custom',
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
      title: t('Quy trình sản xuất'),
      id: 'RouterId',
      kind: 'Custom',
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
      title: t('Người tạo'),
      id: 'UserRegister',
      kind: 'Text',
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
      'S_ERP_COLS_PAGE_MODEL_LIST',
      defaultCols.filter((col) => col.visible)
    )
  );

  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [addedRows, setAddedRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(null);
  const [editedRows, setEditedRows] = useState([]);

  const handleRowAppend = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(cols, setGridData, setNumRows, setAddedRows, numRowsToAdd);
    },
    [cols, setGridData, setNumRows, setAddedRows, numRowsToAdd]
  );

    const [openFilter, setOpenFilter] = useState(false);

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onClickSearch = () => {
    console.log('click search');
  };

  const onClickFilter = () => {
    setOpenFilter(true);
  };

  const onClickSave = () => {
    console.log('click search');
  };

  return (
    <>
      <div className="h-full mt-4">
        <SearchPageAction
          titlePage={'Danh sách cấu hình sản phẩm'}
          onSearch={onSearch}
          onClickSearch={onClickSearch}
          onClickFilter={onClickFilter}
          // keyword={keyword}
          // setKeyword={setKeyword}
          onClickSave={onClickSave}
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
          addedRows={addedRows}
          setAddedRows={setAddedRows}
          setEditedRows={setEditedRows}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
        />
      </div>
    </>
  );
};

export default ManageModelPage;
