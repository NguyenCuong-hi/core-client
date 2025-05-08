import React, { useMemo, useState } from 'react';

// project import

import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import AuDrAction from 'component/Actions/AuDrAction';
import OperationInfomationQuery from './query/OperationInfomationQ';
import OperationUseEQPQuery from './query/OperationUseEqpQ';
import OperationParameterQuery from './query/OperationParameterq';
import { Form } from 'antd';

// ==============================||  PAGE ||============================== //

const ManageOperationDetails = ({ canCreate, canEdit, canDelete, canView }) => {
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
      title: t('Quy trình'),
      id: 'FactUnitName',
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
      title: t('Tên đơn vị sản xuất'),
      id: 'FactUnitName',
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
        <OperationUseEQPQuery />
        <OperationParameterQuery />
      </div>
    </>
  );
};

export default ManageOperationDetails;
