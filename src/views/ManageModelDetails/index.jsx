import React, { useCallback, useEffect, useMemo, useState } from 'react';

// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import ModelInfomationQuery from './query/ModelInfomationQuery';
import ModelRouteSet from './query/ModelRouteSet';
import ModelGroupCategory from './query/ModelGroupCategory';
import AuDrAction from 'component/Actions/AuDrAction';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { Form } from 'antd';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPageDetails = ({ canCreate, canEdit, canDelete, canView }) => {
  const { t } = useTranslation();

  const defaultCols = useMemo(() => [
    {
      title: '',
      id: 'Status',
      kind: 'Text',
      readonly: true,
      width: 50,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderLookup,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã dây chuyền'),
      id: 'RouteId',
      kind: 'Text',
      readonly: true,
      width: 10,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã dây chuyền'),
      id: 'RouteCode',
      kind: 'Text',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Tên dây chuyền'),
      id: 'RouteName',
      kind: 'Text',
      readonly: true,
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
      'S_ERP_COLS_PAGE_IQC_OUTSOURCE_STATUS_LIST',
      defaultCols.filter((col) => col.visible)
    )
  );
  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);

  const defaultColsCategory = useMemo(() => [
    {
      title: '',
      id: 'Status',
      kind: 'Text',
      readonly: true,
      width: 50,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderLookup,
      trailingRowOptions: {
        disabled: false
      }
    },
    {
      title: t('Mã thuộc tính'),
      id: 'PrompId',
      kind: 'Text',
      readonly: true,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Tên thuộc tính'),
      id: 'PrompName',
      kind: 'Custom',
      readonly: true,
      width: 250,
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
      readonly: true,
      width: 500,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Bắt buộc nhập'),
      id: 'MustInput',
      kind: 'Boolean',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('ID giá trị thuộc tính'),
      id: 'PrompValueId',
      kind: 'Boolean',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Giá trị thuộc tính'),
      id: 'PrompValue',
      kind: 'Boolean',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);

  const [colsCategory, setColsCategory] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_PRODUCT_CATEGORY',
      defaultColsCategory.filter((col) => col.visible)
    )
  );
  const [gridDataCategory, setGridDataCategory] = useState([]);
  const [numRowsCategory, setNumRowsCategory] = useState(0);
  const [numRowsToAddCategory, setNumRowsToAddCategory] = useState(null);
  const [addedRowsCategory, setAddedRowsCategory] = useState([]);

  const handleRowAppend = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsCategory, setGridDataCategory, setNumRowsCategory, setAddedRowsCategory, numRowsToAddCategory);
    },
    [colsCategory, setGridDataCategory, setNumRowsCategory, setAddedRowsCategory, numRowsToAddCategory]
  );

  //  Data Input
  const [formModelBasic] = Form.useForm();

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      DatePeriod: values.DatePeriod?.format('YYYY-MM-DD') || null,
    };
  
    console.log('Giá trị sau khi format:', formattedValues);
  }


  return (
    <>
      <div className="h-full pt-4 pr-4 pl-4">
        <AuDrAction
          titlePage={'Đăng ký chi tiết cấu hình sản phẩm'}
          onClickDelete={() => {}}
          onClickSave={() => formModelBasic.submit()}
          onClickUpdate={() => {}}
          onClickReset={() => {}}
        />

        <ModelInfomationQuery 
          formModelBasic={formModelBasic}
          onFinish={onFinish}
        />
        <ModelRouteSet
          defaultCols={defaultCols}
          gridData={gridData}
          setGridData={setGridData}
          cols={cols}
          setCols={setCols}
          numRows={numRows}
          setNumRows={setNumRows}
          defaultColsModels={defaultCols}
          gridDataModels={gridData}
          setGridDataModels={setGridData}
          colsModels={cols}
          setColsModels={setCols}
          numRowsModels={numRows}
          setNumRowsModels={setNumRows}
        />
        <ModelGroupCategory
          defaultCols={defaultColsCategory}
          gridData={gridDataCategory}
          setGridData={setGridDataCategory}
          cols={colsCategory}
          setCols={setColsCategory}
          numRows={numRowsCategory}
          setNumRows={setNumRowsCategory}
          handleRowAppend={handleRowAppend}
        />
      </div>
    </>
  );
};

export default ManageModelPageDetails;
