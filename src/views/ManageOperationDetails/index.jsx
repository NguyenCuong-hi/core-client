import React, { useCallback, useMemo, useState } from 'react';

// project import

import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import AuDrAction from 'component/Actions/AuDrAction';
import OperationInfomationQuery from './query/OperationInfomationQ';
import OperationUseEQPQuery from './query/OperationUseEqpQ';
import OperationParameterQuery from './query/OperationParameterQ';
import { Form } from 'antd';

// ==============================||  PAGE ||============================== //

const ManageOperationDetails = ({ canCreate, canEdit, canDelete, canView }) => {
  const { t } = useTranslation();

  const defaultColsEqp = useMemo(() => [
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
      title: t('Mã thiết bị'),
      id: 'EqpCode',
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
      title: t('Tên thiết bị'),
      id: 'EqpName',
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

  const [colsEqp, setColsEqp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_EQP_LIST',
      defaultColsEqp.filter((col) => col.visible)
    )
  );
  const [gridDataEqp, setGridDataEqp] = useState([]);
  const [numRowsEqp, setNumRowsEqp] = useState(0);

  const defaultColsOPEqp = useMemo(() => [
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
      title: t('OperationId'),
      id: 'OperationId',
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
      title: t('Mã thiết bị'),
      id: 'EqpCode',
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
      title: t('Tên thiết bị'),
      id: 'EqpName',
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

  const [colsOPEqp, setColsOPEqp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_OP_EQP_LIST',
      defaultColsOPEqp.filter((col) => col.visible)
    )
  );
  const [gridDataOPEqp, setGridDataOPEqp] = useState([]);
  const [numRowsOPEqp, setNumRowsOPEqp] = useState(0);


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
          titlePage={'Đăng ký thông tin công đoạn'}
          onClickSave={() => formDataBasic.submit()}
          onClickCancel={() => {}}
          onClickDelete={() => {}}
          onClickAdd={() => {}}
        />
        <OperationInfomationQuery formDataBasic={formDataBasic} onFinish={onFinish} />
        <OperationUseEQPQuery 
          defaultColsEqp={defaultColsEqp}
          gridDataEqp={gridDataEqp}
          setGridDataEqp={setGridDataEqp}
          colsEqp={colsEqp}
          setColsEqp={setColsEqp}
          numRowsEqp={numRowsEqp}
          setNumRowsEqp={setNumRowsEqp}

          defaultColsOPEqp={defaultColsOPEqp}
          gridDataOPEqp={gridDataOPEqp}
          setGridDataOPEqp={setGridDataOPEqp}
          colsOPEqp={colsOPEqp}
          setColsOPEqp={setColsOPEqp}
          numRowsOPEqp={numRowsOPEqp}
          setNumRowsOPEqp={setNumRowsOPEqp}


        />
        <OperationParameterQuery 
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

export default ManageOperationDetails;
