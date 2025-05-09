import React, { useCallback, useMemo, useState } from 'react';

// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import AuDrAction from 'component/Actions/AuDrAction';
import { Form } from 'antd';
import RouteInfomationQuery from './query/RouteInfomation';
import RouteParameterQuery from './query/OperationParameterq';
import RouteOperationReworkQuery from './query/RouteOperationReworkQ';
import RouteOperationQuery from './query/RouteOperationQ';

// ==============================||  PAGE ||============================== //

const ManageRouteSetDetails = ({ canCreate, canEdit, canDelete, canView }) => {
  const { t } = useTranslation();

  const defaultColsOp = useMemo(() => [
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
      title: t('ID'),
      id: 'id',
      kind: 'Text',
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
      title: t('Mã công đoạn'),
      id: 'OperationCode',
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
      title: t('Tên công đoạn'),
      id: 'OperationName',
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
      title: t('Mô tả'),
      id: 'Description',
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

  const [colsOp, setColsOp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_OP_LIST',
      defaultColsOp.filter((col) => col.visible)
    )
  );
  const [gridDataOp, setGridDataOp] = useState([]);
  const [numRowsOp, setNumRowsOp] = useState(0);

  const defaultColsRouteOp = useMemo(() => [
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
      title: t('RouteId'),
      id: 'RouteId',
      kind: 'Text',
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
      title: t('Id'),
      id: 'Id',
      kind: 'Text',
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
      title: t('Tên công đoạn'),
      id: 'OperationName',
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
      title: t('Trạng thái'),
      id: 'Status',
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

  const [colsRouteOp, setColsRouteOp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_ROUTE_OP_LIST',
      defaultColsRouteOp.filter((col) => col.visible)
    )
  );
  const [gridDataRouteOp, setGridDataRouteOp] = useState([]);
  const [numRowsRouteOp, setNumRowsRouteOp] = useState(0);

  const defaultColsOpRework = useMemo(() => [
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
      title: t('RouteId'),
      id: 'RouteId',
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
      title: t('ID'),
      id: 'id',
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
      title: t('Mã công đoạn'),
      id: 'OperationCode',
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
      title: t('Mã dây chuyền Rework'),
      id: 'RouteCodeRework',
      kind: 'Custom',
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
      title: t('Mã dây chuyền Rework'),
      id: 'RouteCodeRework',
      kind: 'Custom',
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
      title: t('Mã công đoạn Rework'),
      id: 'OperationCodeRework',
      kind: 'Custom',
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
      title: t('Mã dây chuyền Return'),
      id: 'RouteCodeReturn',
      kind: 'Custom',
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
      title: t('Mã công đoạn Return'),
      id: 'OperationCodeReturn',
      kind: 'Custom',
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
      title: t('Ghi chú'),
      id: 'note',
      kind: 'text',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    
  ]);

  const [colsOpRework, setColsOpRework] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_OP_REWORK',
      defaultColsOpRework.filter((col) => col.visible)
    )
  );
  const [gridDataOpRework, setGridDataOpRework] = useState([]);
  const [numRowsOpRework, setNumRowsOpRework] = useState(0);
  const [numRowsToAddOpRework, setNumRowsToAddOpRework] = useState(null);
  const [addedRowsOpRework, setAddedRowsOpRework] = useState([]);

  const handleRowAppendOpRework = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsOpRework, setGridDataOpRework, setNumRowsOpRework, setAddedRowsOpRework, numRowsToAddOpRework);
    },
    [colsOpRework, setGridDataOpRework, setNumRowsOpRework, setAddedRowsOpRework, numRowsToAddOpRework]
  );

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

  const [formDataBasic] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <div className="h-full pt-4 pr-4 pl-4">
        <AuDrAction
          titlePage={'Đăng ký thông tin dây chuyền'}
          onClickSave={() => formDataBasic.submit()}
          onClickCancel={() => {
            
          }}
          onClickDelete={() => {}}
          onClickAdd={() => {}}
        />
        <RouteInfomationQuery formDataBasic={formDataBasic} onFinish={onFinish} />
        <RouteOperationQuery
          defaultColsOp={defaultColsOp}
          gridDataOp={gridDataOp}
          setGridDataOp={setGridDataOp}
          colsOp={colsOp}
          setColsOp={setColsOp}
          numRowsOp={numRowsOp}
          setNumRowsOp={setNumRowsOp}

          defaultColsRouteOp={defaultColsRouteOp}
          gridDataRouteOp={gridDataRouteOp}
          setGridDataRouteOp={setGridDataRouteOp}
          colsRouteOp={colsRouteOp}
          setColsRouteOp={setColsRouteOp}
          numRowsRouteOp={numRowsRouteOp}
          setNumRowsRouteOp={setNumRowsRouteOp}
        />
        <RouteOperationReworkQuery
          defaultCols={defaultColsOpRework}
          gridData={gridDataOpRework}
          setGridData={setGridDataOpRework}
          cols={colsOpRework}
          setCols={setColsOpRework}
          numRows={numRowsOpRework}
          setNumRows={setNumRowsOpRework}
          handleRowAppend={handleRowAppendOpRework}
        />
        <RouteParameterQuery
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

export default ManageRouteSetDetails;
