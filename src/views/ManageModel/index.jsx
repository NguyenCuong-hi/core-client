import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Typography } from '@mui/material';

// project import

import ModelAction from './action/ModelAction';
import ModelTable from './table/ModelTable';
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPage = () => {
  const { t } = useTranslation()

  const defaultCols = useMemo(
    () => [
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
          disabled: true,
        },
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
          disabled: true,
        },
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
          disabled: true,
        },
      },
    ]
  )

  const [cols, setCols] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_IQC_OUTSOURCE_STATUS_LIST',
      defaultCols.filter((col) => col.visible),
    ),
  )
  const [gridData, setGridData] = useState([])
  const [numRows, setNumRows] = useState(0)


  // useEffect(() => {

  //   // setCols(defaultCols.filter((col) => col.visible))
  // }, [gridData, defaultCols])

  return (
    <>
      <div className="w-100 p-0 h-100 ">
        <ModelAction />
        <ModelTable
          defaultCols={defaultCols}
          gridData={gridData}
          setGridData={setGridData}
          cols={cols}
          setCols={setCols}
          numRows={numRows}
          setNumRows={setNumRows}

        />
 
      </div>



    </>
  );
};

export default ManageModelPage;
