import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui

// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import ModelDetailsAction from './action/ModelDetailsAction';
import ModelDetailsQuery from './query/ModelDetailsQuery';
import ModelInfomationQuery from './query/ModelInfomationQuery';
import ModelRouteSet from './query/ModelRouteSet';
import ModelGroupCategory from './query/ModelGroupCategory';
import AuDrAction from 'component/Actions/AuDrAction';
import { Typography } from 'antd';


// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPageDetails = () => {
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

  // useEffect(() => {

  //   // setCols(defaultCols.filter((col) => col.visible))
  // }, [gridData, defaultCols])

  return (
    <>
      <div className="h-full pt-4 pr-4 pl-4">

        <AuDrAction
          tilePage={'Đăng ký thông tin hàng hóa'}
        />

        <ModelInfomationQuery />
        <ModelRouteSet />
        <ModelGroupCategory />
      </div>
    </>
  );
};

export default ManageModelPageDetails;
