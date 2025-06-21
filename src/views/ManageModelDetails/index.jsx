import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import ModelInfomationQuery from './query/ModelInfomationQuery';
import ModelRouteSet from './query/ModelRouteSet';
import ModelGroupCategory from './query/ModelGroupCategory';
import AuDrAction from 'component/Actions/AuDrAction';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { Button, Form, Menu, message, Spin } from 'antd';
import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  CaretDownFilled,
  CaretUpFilled,
  DownCircleFilled,
  MinusCircleFilled,
  MinusOutlined,
  MonitorOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useFullscreenLoading } from 'utils/hooks/useFullscreenLoading';
import { useNotify } from 'utils/hooks/onNotify';
import { useSelector } from 'react-redux';
import useDynamicFilter from 'utils/hooks/useDynamicFilter';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPageDetails = ({ canCreate, canEdit, canDelete, canView }) => {
  const { t } = useTranslation();
  const { notify, contextHolder } = useNotify();
  const { spinning, percent, showLoader, hideLoader } = useFullscreenLoading();
  const controllers = useRef({});
  const selectedData = useSelector((state) => state.selectedRow);
  const [isAPISuccess, setIsAPISuccess] = useState(true);

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
        disabled: false
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

  const [gridDataRoute, setGridDataRoute] = useState([]);
  const [numRowsRoute, setNumRowsRoute] = useState(0);

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

  const [isSent, setIsSent] = useState(false);
  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const fieldsToTrack = ['IdxNo'];
  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridData, fieldsToTrack);

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
      DatePeriod: values.DatePeriod?.format('YYYY-MM-DD') || null
    };

    console.log('Giá trị sau khi format:', formattedValues);
  };

  const [checkPageA, setCheckPageA] = useState(false);
  const [current, setCurrent] = useState('1');

  const onClickSave = useCallback(async () => {
    try {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.onClickSave) {
        controllers.current.onClickSave.abort();
        controllers.current.onClickSave = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.continuousStart();
        }
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }
      const controller = new AbortController();
      const signal = controller.signal;

      controllers.current.onClickSave = controller;
      const data = await formModelBasic.validateFields();
      try {
        const result = await CreateListByService(data);

        if (result.success) {
          if (index === 0) {
            message.success('Thêm thành công!');
          } else {
            message.success('Cập nhật  thành công!');
          }

          setIsSent(false);
          setEditedRows([]);
          resetTable();
        } else {
          setIsSent(false);
          setErrorData(result.data.errors);
          message.error('Có lỗi xảy ra khi lưu dữ liệu');
        }
      } catch (error) {
        console.log('error', error);
        setIsSent(false);
        message.error(error.message || 'Có lỗi xảy ra khi lưu dữ liệu');
      } finally {
        onClickSearch();
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }, [formModelBasic]);

  return (
    <>
      <div className="h-full pt-4">
        <AuDrAction
          titlePage={'Đăng ký chi tiết cấu hình sản phẩm'}
          onClickDelete={() => {}}
          onClickSave={onClickSave}
          onClickUpdate={() => {}}
          onClickReset={() => {}}
        />
        <ModelInfomationQuery formModelBasic={formModelBasic} onFinish={onFinish} />

        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          style={{
            height: 30,
            lineHeight: '30px',
            paddingTop: 2,
            paddingBottom: 0,
            minHeight: 0
          }}
          onClick={(e) => {
            if (!checkPageA) {
              setCurrent(e.key);
            } else {
              message.warning(t('870000042'));
            }
          }}
        >
          <Menu.Item key="1">
            <span className="flex items-center gap-1 text-sm">
              <ApartmentOutlined style={{ fontSize: 12 }} />
              {t('Đăng ký thông tin dây chuyền sản xuất')}
            </span>
          </Menu.Item>

          <Menu.Item key="2">
            <span className="flex items-center gap-1 text-sm">
              <AppstoreAddOutlined style={{ fontSize: 12 }} />
              {t('Đăng ký thông tin danh mục sản phẩm')}
            </span>
          </Menu.Item>

          <Menu.Item
            key="buttons"
            disabled
            style={{
              marginLeft: 'auto',
              cursor: 'default',
              background: 'transparent'
            }}
          >
            <div className="flex gap-2 items-center">
              <Button type="text" icon={<PlusCircleFilled style={{ color: '#10b981' }} />} onClick={() => handleRowAppend(1)}>
                Chèn
              </Button>
              <Button type="text" icon={<MinusCircleFilled style={{ color: '#ef4444' }} />} onClick={() => {}}>
                Xóa
              </Button>
              <Button type="text" icon={<CaretUpFilled style={{ color: '#3333ff' }} />} onClick={() => {}}>
                Up
              </Button>
              <Button type="text" icon={<CaretDownFilled style={{ color: '#ff5c33' }} />} onClick={() => {}}>
                Down
              </Button>
            </div>
          </Menu.Item>
        </Menu>
        {current === '1' && (
          <ModelRouteSet
            defaultCols={defaultCols}
            gridData={gridData}
            setGridData={setGridData}
            cols={cols}
            setCols={setCols}
            numRows={numRows}
            setNumRows={setNumRows}
            defaultColsModels={defaultCols}
            gridDataModels={gridDataRoute}
            setGridDataModels={setGridDataRoute}
            colsModels={cols}
            setColsModels={setCols}
            numRowsModels={numRows}
            setNumRowsModels={setNumRows}
          />
        )}
        {current === '2' && (
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
        )}
      </div>

      {contextHolder}
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default ManageModelPageDetails;
