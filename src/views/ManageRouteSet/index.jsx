import React, { useMemo, useState } from 'react';

// project import

import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import RouteSetTable from './table/RouteSetTable';
import RouteSetAction from './action/RouteSetAction';
import { useNotify } from 'utils/hooks/onNotify';
import { Spin } from 'antd';
import { useFullscreenLoading } from 'utils/hooks/useFullscreenLoading';

// ==============================|| ROUTER SET PAGE ||============================== //

const ManageRouteSetPage = ({}) => {
  const { t } = useTranslation();
  const { notify, contextHolder } = useNotify();
  const { spinning, percent, showLoader } = useFullscreenLoading();

  const handleClick = () => {
    showLoader(3000, () => {
      notify({
        type: 'success',
        message: 'Thành công',
        description: 'Thêm mới thành công'
      })
    });
  };

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
    },
    {
      title: t('Công đoạn'),
      id: 'Operations',
      kind: 'Custom',
      readonly: true,
      width: 800,
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
      'S_ERP_COLS_PAGE_ROUTE_SET',
      defaultCols.filter((col) => col.visible)
    )
  );
  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);

  return (
    <>
      <div className="h-full mt-4 pr-4 pl-4">
        <RouteSetAction
          titlePage={'Danh sách quy trình'}
          onSearch={''}
          onClickSearch={() => notify({
            type: 'success',
            message: 'Thành công',
            description: 'Bạn vừa nhấn tìm kiếm'
          })}
          onClickFilter={''}
          keyword={''}
          setKeyword={''}
          onClickNew={handleClick}
        />
        <RouteSetTable
          defaultCols={defaultCols}
          gridData={gridData}
          setGridData={setGridData}
          cols={cols}
          setCols={setCols}
          numRows={numRows}
          setNumRows={setNumRows}
        />
      </div>
      {contextHolder}
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default ManageRouteSetPage;
