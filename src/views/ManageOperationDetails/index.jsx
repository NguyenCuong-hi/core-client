import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { CompactSelection, GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import AuDrAction from 'component/Actions/AuDrAction';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { Button, Form, Menu, message, Spin, TreeSelect } from 'antd';
import {
  ApartmentOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  CaretDownFilled,
  CaretUpFilled,
  ClusterOutlined,
  ConsoleSqlOutlined,
  DashboardOutlined,
  DownCircleFilled,
  LoadingOutlined,
  MinusCircleFilled,
  MinusOutlined,
  MonitorOutlined,
  PartitionOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SaveOutlined,
  SearchOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useFullscreenLoading } from 'utils/hooks/useFullscreenLoading';
import { useNotify } from 'utils/hooks/onNotify';
import { useSelector } from 'react-redux';
import useDynamicFilter from 'utils/hooks/useDynamicFilter';
import { SearchRouteBy } from 'services/ModelManage/SearchRouteBy';
import { filterAndSelectColumns } from 'utils/sheets/filterUorA';

import { DeleteCategoryBy } from 'services/ModelManage/DeleteCategoryBy';
import Splitter from 'antd/es/splitter/Splitter';
import { SplitterPanel } from 'primereact/splitter';

import { SearchRouteTree } from 'services/RouteSetManage/SearchRouteTree';
import { SearchOperationBy } from 'services/RouteSetManage/SearchOperationBy';
import { CreateRouteOperationByService } from 'services/RouteSetManage/CreateRouteOperationBy';
import { DeleteRouteOpBy } from 'services/RouteSetManage/DeleteRouteOpBy';
import { getRouteOpByRouteId } from 'services/RouteSetManage/GetRouteOpByRouteId';
import { getCategoryByRouteId } from 'services/RouteSetManage/GetCategoryByRouteId';
import OperationTable from './table/EquipmentTable';
import OperationInfoQuery from './query/OperationInfoQuery';
import OperationManageInfo from './query/OperationManageInfo';
import OperationPropertiesTable from './table/OperationPropertiesTable';
import OperationStepTable from './table/OperationStepTable';
import CategoryTable from 'component/Sheets/CategoryTable';
import { SearchCategory } from 'services/ManageCategorySys/SearchCategory';
import OperationEquipTable from './table/OperationEquipTable';
import EquipmentTable from './table/EquipmentTable';
import { createOperationBy } from 'services/OperationManage/CreateRouteByService';
import { updateIndexNo } from 'utils/sheets/updateIndexNo';
import { getOperationById } from 'services/OperationManage/GetOperationById';
import { searchEquipmentBy } from 'services/EquipmentManage/SearchBy';
import { deleteOperationById } from 'services/EquipmentManage/DeleteOperationById';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageOperationDetails = ({ canCreate, canEdit, canDelete, canView }) => {
  const { t } = useTranslation();
  const { notify, contextHolder } = useNotify();
  const { spinning, percent, showLoader, hideLoader } = useFullscreenLoading();
  const controllers = useRef({});
  const selectedData = useSelector((state) => state.selectedRow);
  const [isAPISuccess, setIsAPISuccess] = useState(true);
  const loadingBarRef = useRef(null);
  const [lastLoadedRow, setLastLoadedRow] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isMinusClicked, setIsMinusClicked] = useState(false);
  const [lastClickedCell, setLastClickedCell] = useState(null);
  const [clickedRowData, setClickedRowData] = useState(null);

  const [selection, setSelection] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionCategory, setSelectionCategory] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionOperationStep, setSelectionOperationStep] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionOpIndicate, setSelectionOpIndicate] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const [selectionOpProperties, setSelectionOpProperties] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionOpEqp, setSelectionOpEqp] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [operationSelected, setOperationSelected] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(null);
  const [editedRows, setEditedRows] = useState([]);
  const [editedRowsCategory, setEditedRowsCategory] = useState([]);

  const [categorySelected, setCategorySelected] = useState([]);
  const [routeOpSelected, setRouteOpSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [routeTree, setRouteTree] = useState([]);
  const [routeTreeSelected, setRouteTreeSelected] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectNode, setSelectNode] = useState(null);

  const [dataLossTable, setDataLossTable] = useState([]);
  const [dataSuccessTable, setDataSuccessTable] = useState([]);
  const [dataStep, setDataStep] = useState([]);
  const [dataUnit, setDataUnit] = useState([]);
  const [dataOpEqpTable, setDataReworkTable] = useState([]);
  const [dataBonusTable, setDataBonusTable] = useState([]);
  const [inParameterData, setInParameterData] = useState([]);
  const [outParameterData, setOutParameterData] = useState([]);

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
      title: t('Mã công đoạn'),
      id: 'id',
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
      title: t('Tên công đoạn'),
      id: 'operationName',
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
      title: t('Mã công đoạn'),
      id: 'operationCode',
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
      id: 'description',
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
      'S_DETAIL_MODEL',
      defaultCols.filter((col) => col.visible)
    )
  );

  const defaultColsOpProperties = useMemo(() => [
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
      title: t('Mã thuộc tính '),
      id: 'id',
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
      title: t('Thuộc tính'),
      id: 'opProperties',
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
      title: t('Áp dụng'),
      id: 'isUse',
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

  const [colsOpProperties, setColsOpProperties] = useState(() =>
    loadFromLocalStorageSheet(
      'S_OPERTATION_PROPERTY',
      defaultColsOpProperties.filter((col) => col.visible)
    )
  );
  const [gridDataOpProperties, setGridDataOpProperties] = useState([]);
  const [numRowsOpProperties, setNumRowsOpProperties] = useState(0);

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
      title: t('Tên thuộc tính'),
      id: 'promptName',
      kind: 'Custom',
      readonly: false,
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
      id: 'description',
      kind: 'Text',
      readonly: false,
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
      id: 'mustInput',
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
      title: t('ID giá trị thuộc tính'),
      id: 'promptValueId',
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
      title: t('Giá trị thuộc tính'),
      id: 'promptValueName',
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

  const [colsCategory, setColsCategory] = useState(() =>
    loadFromLocalStorageSheet(
      'S_DETAIL_CATEGORY',
      defaultColsCategory.filter((col) => col.visible)
    )
  );
  const [gridDataCategory, setGridDataCategory] = useState([]);
  const [numRowsCategory, setNumRowsCategory] = useState(0);
  const [numRowsToAddCategory, setNumRowsToAddCategory] = useState(null);
  const [addedRowsCategory, setAddedRowsCategory] = useState([]);

  const defaultColsOpEqp = useMemo(() => [
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
      title: t('Mã'),
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
      id: 'operationId',
      kind: 'Text',
      readonly: false,
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
      id: 'operationCode',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Tên công đoạn'),
      id: 'operationName',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã thiết bị'),
      id: 'eqpCode',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Tên thiết bị'),
      id: 'eqpName',
      kind: 'Custom',
      readonly: false,
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
      id: 'description',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);

  const [colsOperationEqp, setColsOperationEqp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ROUTE_OPERATION_EQP',
      defaultColsOpEqp.filter((col) => col.visible)
    )
  );
  const [gridDataOpEqp, setGridDataOpEqp] = useState([]);
  const [numRowsOpEqp, setNumRowsOpEqp] = useState(0);
  const [numRowsToAddOpProperties, setNumRowsToAddOpEqp] = useState(null);
  const [addedRowsOpProperties, setAddedRowsOpProperties] = useState([]);

  const [colsEqp, setColsEqp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ROUTE_OPERATION_EQP',
      defaultColsOpEqp.filter((col) => col.visible)
    )
  );
  const [gridDataEqp, setGridDataEqp] = useState([]);
  const [numRowsEqp, setNumRowsEqp] = useState(0);

  const defaultColsOpStep = useMemo(() => [
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
      title: t('Mã công đoạn'),
      id: 'operationId',
      kind: 'Text',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Tên công đoạn'),
      id: 'operationName',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Mã công đoạn'),
      id: 'operationCode',
      kind: 'Text',
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
      id: 'description',
      kind: 'Text',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Bảng mã lỗi'),
      id: 'lossName',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã lỗi'),
      id: 'lossId',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Bảng mã bổ sung'),
      id: 'bonusName',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã bổ sung'),
      id: 'bonusId',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Bảng mã thao tác lại'),
      id: 'reworkName',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã thao tác lại'),
      id: 'reworkId',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Bảng mã sửa chữa'),
      id: 'repairName',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã sửa chữa'),
      id: 'repairId',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Yêu cầu hoàn thành'),
      id: 'wipRequestPack',
      kind: 'Boolean',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);

  const [colsOpStep, setColsOpStep] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ROUTE_OP_STEP',
      defaultColsOpStep.filter((col) => col.visible)
    )
  );
  const [gridDataOpStep, setGridDataOpStep] = useState([]);
  const [numRowsOpStep, setNumRowsOpStep] = useState(0);
  const [numRowsToAddOpStep, setNumRowsToAddOpStep] = useState(null);
  const [addedRowsOpStep, setAddedRowsOpStep] = useState([]);

  const [OpStepSelected, setOpStepSelected] = useState([]);
  const [editedRowsOpStep, setEditedRowsOpStep] = useState([]);

  const [isSent, setIsSent] = useState(false);
  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const fieldsToTrack = ['IdxNo'];
  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridData, fieldsToTrack);

  const [operationId, setOperationId] = useState(null);
  const [operationCode, setOperationCode] = useState(null);
  const [operationName, setOperationName] = useState(null);

  //  Data Input
  const [formBasic] = Form.useForm();
  const [formInfo] = Form.useForm();

  const dataCategoryValue = [
    { MinorName: '8080', Value: 1 },
    { MinorName: '8000', Value: 2 },
    { MinorName: '3000', Value: 3 }
  ];

  const [checkPageA, setCheckPageA] = useState(false);
  const [current, setCurrent] = useState('1');

  const onClickSave = useCallback(async () => {
    const requiredColumns = ['configProdName'];

    const columnEqpOp = ['id', 'operationId', 'operationCode', 'operationName', 'eqpCode', 'eqpName', 'description', 'status'];

    const columnOpStep = [
      'id',
      'operationId',
      'operationStepId',
      'operationStepCode',
      'operationStepName',
      'description',
      'lossId',
      'lossCode',
      'bonusId',
      'bonusName',
      'reworkId',
      'reworkName',
      'repairId',
      'repairName',
      'wipRequestPack'
    ];

    const columnsCategory = [
      'IdxNo',
      'id',
      'configProdNameId',
      'operationId',
      'eventId',
      'operationId',
      'promptId',
      'promptName',
      'description',
      'mustInput',
      'promptValueId',
      'promptValueName',
      'promptType',
      'IDX_NO'
    ];

    const validEntries = filterValidEntries();
    setCount(validEntries.length);
    const lastEntry = findLastEntry(validEntries);

    if (lastWordEntryRef.current?.Id !== lastEntry?.Id) {
      lastWordEntryRef.current = lastEntry;
    }

    const missingIds = findMissingIds(lastEntry);
    if (missingIds.length > 0) {
      message.warning('Vui lòng kiểm tra lại các mục được tạo phải theo đúng thứ tự tuần tự trước khi lưu!');
      return;
    }

    if (isSent) return;
    setIsSent(true);

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
      const data = await formBasic.getFieldValue();

      const dataOpEqpA = filterAndSelectColumns(gridDataOpEqp, columnEqpOp, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || ''
      }));

      const dataOpEqpU = filterAndSelectColumns(gridDataOpEqp, columnEqpOp, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || ''
      }));

      const dataOpStepA = filterAndSelectColumns(gridDataOpStep, columnOpStep, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || ''
      }));

      const dataOpStepU = filterAndSelectColumns(gridDataOpStep, columnOpStep, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || ''
      }));

      const dataCategoryA = filterAndSelectColumns(gridDataCategory, columnsCategory, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || ''
      }));

      const dataCategoryU = filterAndSelectColumns(gridDataCategory, columnsCategory, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        operationId: operationId || ''
      }));

      const dataOpEqp = [...dataOpEqpA, ...dataOpEqpU];
      const dataOpStep = [...dataOpStepA, ...dataOpStepU];

      const dataCategory = [...dataCategoryA, ...dataCategoryU];
      const dto = {
        opReqDto: {
          ...data
        },
        promptCateList: dataCategory,
        opEqpList: dataOpEqp,
        opStepList: dataOpStep
      };
      try {
        const result = await createOperationBy(dto);

        if (result.success) {
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Cập nhật thành công!'
          });

          const { opEqpList, opResDto, opStepList, promptCateList } = result?.data;

          const dataOp = [opResDto];
          setIsSent(false);
          setEditedRows([]);
          console.log('dataOp', dataOp);

          setGridData((prev) => {
            const updated = prev.map((item) => {
              const found = dataOp.find((x) => x?.IDX_NO === item?.IdxNo);
              console.log('found', found);

              return found ? { ...item, Status: '', IdSeq: found?.IdSeq } : item;
            });
            return updateIndexNo(updated);
          });
        } else {
          setIsSent(false);
          notify({
            type: 'error',
            message: 'Lỗi',
            description: 'Không thể lưu dữ liệu. Vui lòng thử lại sau.'
          });
        }
      } catch (error) {
        console.log('error', error);
        setIsSent(false);
        message.error(error.message || 'Có lỗi xảy ra khi lưu dữ liệu');
      } finally {
        onFetchOperation();

        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }, [formBasic, gridDataCategory, gridDataOpProperties, isAPISuccess, operationId, gridDataOpEqp, gridDataOpStep]);

  const onVisibleRegionChanged = useCallback(
    ({ y, height }) => {
      const lastVisibleRow = y + height;
      if (lastVisibleRow >= numRows && lastVisibleRow > lastLoadedRow) {
        setLastLoadedRow(lastVisibleRow);
        loadMoreData();
      }
    },
    [numRows, lastLoadedRow]
  );

  const loadMoreData = useCallback(() => {
    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = SearchRouteBy(data);
      const fetchedData = response.data || [];

      setGridData((prev) => [...prev, ...fetchedData]);
      setNumRows((prev) => prev + fetchedData.length);
    } catch (error) {
      message.error(error.message);
    }
  }, [numRows]);

  const onFetchRoute = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchRoute) {
      controllers.current.onFetchRoute.abort();
      controllers.current.onFetchRoute = null;
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

    controllers.current.onFetchRoute = controller;

    setIsAPISuccess(false);

    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = await SearchRouteTree(data);
      const fetchedData = response.data || [];

      const dataTree = fetchedData.map((item) => ({
        title: item.route.operationCode,
        value: item.route.id,
        key: item.route.id,
        icon: <ClusterOutlined />,
        children: item.routeOperations.map((operation) => ({
          title: operation.operationCode,
          value: operation.id,
          key: operation.id,
          icon: <ApiOutlined />
        }))
      }));

      setRouteTree(dataTree);
    } catch (error) {
      setRouteTree([]);
      setIsAPISuccess(true);
      notify({
        type: 'false',
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
      controllers.current.onFetchRoute = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [keyword, pageIndex, pageSize, isAPISuccess]);

  const onFetchOperation = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchOperation) {
      controllers.current.onFetchOperation.abort();
      controllers.current.onFetchOperation = null;
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

    controllers.current.onFetchOperation = controller;

    setIsAPISuccess(false);

    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = await SearchOperationBy(data);
      const fetchedData = response.data || [];

      setGridData(fetchedData);
      setNumRows(fetchedData.length);
    } catch (error) {
      setGridData([]);
      setNumRows(0);
      setIsAPISuccess(true);
      notify({
        type: 'false',
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
      controllers.current.onFetchOperation = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [gridData, numRows, keyword, pageIndex, pageSize, isAPISuccess]);

    const onFetchEquipment = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchEquipment) {
      controllers.current.onFetchEquipment.abort();
      controllers.current.onFetchEquipment = null;
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

    controllers.current.onFetchEquipment = controller;

    setIsAPISuccess(false);

    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = await searchEquipmentBy(data);
      const fetchedData = response.data || [];

      setGridDataEqp(fetchedData);
      setNumRowsEqp(fetchedData.length);
    } catch (error) {
      setGridDataEqp([]);
      setNumRowsEqp(0);
      setIsAPISuccess(true);
      notify({
        type: 'false',
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
      controllers.current.onFetchOperation = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [gridDataEqp, numRowsEqp, keyword, pageIndex, pageSize, isAPISuccess]);

  const getSelectedRowsData = () => {
    const selectedRows = selection.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridData[start + i]).filter((row) => row !== undefined)
    );
  };

  const getSelectedRowsCategoryData = () => {
    const selectedRows = selectionCategory.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridDataCategory[start + i]).filter((row) => row !== undefined)
    );
  };

  const getSelectedRowsRouteDetailsData = () => {
    const selectedRows = selectionOpProperties.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridDataOpProperties[start + i]).filter((row) => row !== undefined)
    );
  };

  const onCellOperationClicked = useCallback(
    (cell, event) => {
      let rowIndex;

      if (cell[0] === -1) {
        rowIndex = cell[1];
        setIsMinusClicked(true);
      } else {
        rowIndex = cell[1];
        setIsMinusClicked(false);
      }

      if (lastClickedCell && lastClickedCell[0] === cell[0] && lastClickedCell[1] === cell[1]) {
        setLastClickedCell(null);
        setClickedRowData(null);
        return;
      }
      if (cell[0] === -1) {
        if (rowIndex >= 0 && rowIndex < gridData.length) {
          const rowData = gridData[rowIndex];
          fetchDataOperationById(rowData.id);
        }
      }
    },
    [gridData, getSelectedRowsData, operationSelected]
  );

  const onCellOpPropertiesClicked = useCallback(
    (cell, event) => {
      let rowIndex;

      if (cell[0] === -1) {
        rowIndex = cell[1];
        setIsMinusClicked(true);
      } else {
        rowIndex = cell[1];
        setIsMinusClicked(false);
      }

      if (lastClickedCell && lastClickedCell[0] === cell[0] && lastClickedCell[1] === cell[1]) {
        setLastClickedCell(null);
        setClickedRowData(null);
        return;
      }
      if (cell[0] === -1) {
        if (rowIndex >= 0 && rowIndex < gridDataOpProperties.length) {
          const isSelected = selectionOpProperties.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionOpProperties.rows.remove(rowIndex);
            setRouteOpSelected(getSelectedRowsRouteDetailsData());
          } else {
            newSelected = selectionOpProperties.rows.add(rowIndex);
            setRouteOpSelected([]);
          }
        }
      }
    },
    [gridDataOpProperties, getSelectedRowsRouteDetailsData, routeOpSelected]
  );

  const fetchDataOperationById = useCallback(
    async (id) => {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.fetchDataOperationById) {
        controllers.current.fetchDataOperationById.abort();
        controllers.current.fetchDataOperationById = null;
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

      controllers.current.fetchDataOperationById = controller;

      setIsAPISuccess(false);

      try {
        const response = await getOperationById(id);
        const fetchedData = response.data || [];

        const { opEqpList, opResDto, opStepList, promptCateList } = fetchedData;

        formBasic.setFieldsValue({
          operationName: opResDto.operationName,
          description: opResDto.description,
          lossTable: opResDto.operationCode,
          successTable: opResDto.operationCode,
        });

        formInfo.setFieldsValue({
          unitQty: opResDto.operationName,
          step: opResDto.description,
        });

        const {
          isBatchProcess,
          isMultiEquipment,
          isRequestQA,
          isChangeRoute,
          isStock,
          isCheckMaterial,
          isUseStep,
          lossTable,
          successTable
        } = opResDto;

        const flags = {
          isBatchProcess,
          isMultiEquipment,
          isRequestQA,
          isChangeRoute,
          isStock,
          isCheckMaterial,
          isUseStep,
          lossTable,
          successTable
        };

        const arr = Object.entries(flags).map(([key, value]) => ({
          opProperties: key,
          isUse: value
        }));

        setOperationId(opResDto.id);
        setOperationCode(opResDto.operationCode);
        setOperationName(opResDto.operationName);

        setGridDataOpProperties(arr || []);
        setNumRowsOpProperties(arr?.length || 0);

        setGridDataOpEqp(opEqpList || []);
        setNumRowsOpEqp(opEqpList?.length || 0);

        setGridDataOpStep(opStepList || []);
        setNumRowsOpStep(opStepList?.length || 0);

        setGridDataCategory(promptCateList || []);
        setNumRowsCategory(promptCateList?.length || 0);
      } catch (error) {
        console.log(error);
        setGridDataOpProperties([]);
        setNumRowsOpProperties(0);
        setGridDataOpEqp([]);
        setNumRowsOpEqp(0);
        setGridDataOpStep([]);
        setNumRowsOpStep(0);
        setGridDataCategory([]);
        setNumRowsCategory(0);
        setIsAPISuccess(true);
        notify({
          type: 'error',
          message: 'Lỗi',
          description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
        });
      } finally {
        setIsAPISuccess(true);
        controllers.current.onFetchRoute = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    },
    [
      formBasic,
      formInfo,
      operationId,
      operationCode,
      operationName,
      gridDataOpProperties,
      gridDataOpEqp,
      gridDataOpStep,
      gridDataCategory,
      isAPISuccess,
      numRows,
      numRowsOpProperties,
      numRowsOpEqp,
      numRowsOpStep,
      numRowsCategory
    ]
  );

  const onCellCategoryClicked = useCallback(
    (cell, event) => {
      let rowIndex;

      if (cell[0] === -1) {
        rowIndex = cell[1];
        setIsMinusClicked(true);
      } else {
        rowIndex = cell[1];
        setIsMinusClicked(false);
      }

      if (lastClickedCell && lastClickedCell[0] === cell[0] && lastClickedCell[1] === cell[1]) {
        setLastClickedCell(null);
        setClickedRowData(null);
        return;
      }
      if (cell[0] === -1) {
        if (rowIndex >= 0 && rowIndex < gridDataCategory.length) {
          const isSelected = selectionCategory.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionCategory.rows.remove(rowIndex);
            setCategorySelected(getSelectedRowsCategoryData());
          } else {
            newSelected = selectionCategory.rows.add(rowIndex);
            setCategorySelected([]);
          }
        }
      }
    },
    [gridDataCategory, getSelectedRowsCategoryData, categorySelected]
  );

  const onFetchDropdownData = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchDropdownData) {
      controllers.current.onFetchDropdownData.abort();
      controllers.current.onFetchDropdownData = null;
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

    controllers.current.onFetchDropdownData = controller;

    setIsAPISuccess(false);

    try {
      const [unitData, stepData, lostData, successData, inParameterData, outParameterData, reworkParameterData, bonusParameterData] =
        await Promise.all([
          SearchCategory(1, 'fmOperationRegister', '', '', pageIndex, pageSize, keyword),
          SearchCategory(2, 'fmOperationRegister', '', '', pageIndex, pageSize, keyword),
        
        ],
          
      );

      console.log(stepData)

      setDataUnit(unitData.data);
      setDataStep(stepData.data);
      // setDataLossTable(lostData.data.data.content);
      // setDataSuccessTable(successData.data.data.content);
      // setInParameterData(inParameterData.data.data.content);
      // setOutParameterData(outParameterData.data.data.content);
      // setDataReworkTable(reworkParameterData.data.data.content);
      // setDataBonusTable(bonusParameterData.data.data.content);
    } catch (error) {
      console.log(error);
      setDataUnit([]);
      setDataStep([]);
      setDataLossTable([]);
      setDataSuccessTable([]);
      setInParameterData([]);
      setOutParameterData([]);
      setDataReworkTable([]);
      setDataBonusTable([]);
      setIsAPISuccess(true);
      notify({
        type: 'error',
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
      controllers.current.onFetchDropdownData = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [
    loadingBarRef,
    dataUnit,
    dataStep,
    dataLossTable,
    dataSuccessTable,
    inParameterData,
    outParameterData,
    dataOpEqpTable,
    dataBonusTable,
    keyword,
    pageIndex,
    pageSize,
    isAPISuccess
  ]);

  useEffect(() => {
    onFetchOperation();
    onFetchEquipment();
  }, [selectedData]);

  useEffect(() => {
    onFetchDropdownData();
  }, []);

  const onInsertRow = useCallback(async () => {
    if (!Array.isArray(operationSelected) || operationSelected.length === 0) {
      console.warn('operationSelected is empty or invalid');
      return;
    }

    try {
      const dto = operationSelected.map((item) => ({
        operationId: operationId,
        operationCode: operationCode,
        operationName: operationName,

        operationId: item.id,
        operationCode: item.operationCode,
        operationName: item.operationName,
        description: item.description
      }));

      const result = await CreateRouteOperationByService(dto);

      if (result.success) {
        notify({
          type: 'success',
          message: 'Thành công',
          description: 'Cập nhật thành công!'
        });
      } else {
        notify({
          type: 'success',
          message: 'Thành công',
          description: 'Cập nhật thành công!'
        });
      }
    } catch (error) {
      console.error('Error in onInsertRow:', error);
      message.error('Có lỗi xảy ra khi thêm dòng mới');
      return;
    } finally {
      fetchDataOperationById(operationId);
    }

    setGridDataOpProperties((prevGridData) => {
      const updatedGridData = [...prevGridData];

      let addedCount = 0;

      operationSelected.forEach((newItem) => {
        const existingIndex = updatedGridData.findIndex(
          (item) => item.id === newItem.operationId || item.operationCode === newItem.operationCode
        );

        if (existingIndex !== -1) {
          updatedGridData[existingIndex] = {
            ...updatedGridData[existingIndex],
            ...newItem
          };
        } else {
          updatedGridData.push({
            ...newItem,
            IdxNo: updatedGridData.length + 1
          });
          addedCount++;
        }
      });

      setNumRowsOpProperties((prevNumRows) => prevNumRows + addedCount);

      return updatedGridData;
    });
  }, [operationSelected, operationId, operationCode, operationName]);

  const removeRow = useCallback(
    async (rowIndex) => {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.removeRow) {
        controllers.current.removeRow.abort();
        controllers.current.removeRow = null;
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

      controllers.current.removeRow = controller;

      setIsAPISuccess(false);

      try {
        if (routeOpSelected.length === 0 && categorySelected.length === 0) {
          message.warning('Vui lòng chọn ít nhất một dòng để xóa');
          return;
        }
        let response;
        if (routeOpSelected.length > 0) {
          const ids = routeOpSelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await DeleteRouteOpBy(ids);
          const Ops = await getRouteOpByRouteId(operationId);
          setGridDataOpProperties(Ops.data);
          setNumRowsOpProperties(Ops.data.length);
        }
        if (categorySelected.length > 0) {
          const idCategory = categorySelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await DeleteCategoryBy(idCategory);
          const category = await getCategoryByRouteId(operationId);
          setGridDataCategory(category.data);
          setNumRowsCategory(category.data.length);
        }
        const fetchedData = response || [];

        if (!fetchedData.success) {
          notify({
            type: 'error',
            message: 'Lỗi',
            description: 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
          });
          return;
        } else {
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Xóa dữ liệu thành công!'
          });
        }
        setIsAPISuccess(true);
        controllers.current.onClickSearch = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      } catch (error) {
        console.log('error', error);
        setIsAPISuccess(true);
        notify({
          type: 'error',
          message: 'Lỗi',
          description: error.message || 'Vui lòng thử lại sau.'
        });
      } finally {
        setIsAPISuccess(true);
        onFetchRoute();
        controllers.current.removeRow = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    },
    [gridDataOpProperties, gridDataCategory, categorySelected, routeOpSelected]
  );

  const handleRowAppendCategory = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsCategory, setGridDataCategory, setNumRowsCategory, setAddedRowsCategory, numRowsToAdd);
    },
    [colsCategory, setGridDataCategory, setNumRowsCategory, setAddedRowsCategory, numRowsToAddCategory]
  );

  const handleRowAppendOpProperties = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsOpProperties, setGridDataOpProperties, setNumRowsOpProperties, setAddedRowsOpProperties, numRowsToAdd);
    },
    [colsOpProperties, setGridDataOpProperties, setNumRowsOpProperties, setAddedRowsOpProperties, numRowsToAddOpProperties]
  );

  const handleRowAppendOpStep = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsOpStep, setGridDataOpStep, setNumRowsOpStep, setAddedRowsOpStep, numRowsToAdd);
    },
    [colsOpStep, setGridDataOpStep, setNumRowsOpStep, setAddedRowsOpStep, numRowsToAddOpStep]
  );

  const onClickDelete = useCallback(async () => {

    console.log('operationId', operationId);
    if (!operationId) {
      message.warning('Vui lòng chọn dữ liệu để xóa');
      return;
    }

    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onClickDelete) {
      controllers.current.onClickDelete.abort();
      controllers.current.onClickDelete = null;
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

    controllers.current.onClickDelete = controller;

    setIsAPISuccess(false);

    try {
      let response = {};
      if (operationId) {

        response = await deleteOperationById(operationId);
      }

      if (!response.success) {
        notify({
          type: 'error',
          message: 'Lỗi',
          description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
        });
        return;
      } else {
        setGridDataCategory([]);
        setNumRowsCategory(0);
        setGridDataOpProperties([]);
        setNumRowsOpProperties(0);
        formBasic.resetFields();

        notify({
          type: 'success',
          message: 'Thành công',
          description: 'Xóa dữ liệu thành công!'
        });
      }
      setIsAPISuccess(true);
      controllers.current.onClickDelete = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    } catch (error) {
      setIsAPISuccess(true);
      notify({
        type: 'error',
        message: 'Lỗi',
        description: error.message || 'Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
    
      controllers.current.onClickDelete = null;
      onFetchOperation();
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [operationId, gridDataOpProperties, gridDataCategory, formBasic, isAPISuccess]);

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  return (
    <>
      <div className="h-full mt-4">
        <AuDrAction
          titlePage={'Đăng ký công đoạn sản xuất'}
          onClickDelete={onClickDelete}
          onClickSave={onClickSave}
          onClickUpdate={() => {}}
          onClickReset={() => {}}
        />
        <Splitter className="w-full h-full ">
          <SplitterPanel size={30} minSize={10}>
            <div className="w-full  h-full bg-white  overflow-x-hidden overflow-hidden  ">
              <div className="w-full h-[30px]  items-center border-b border-gray-200 ">
                <div className="w-full h-full flex gap-2">
                  {isLoading ? <LoadingOutlined className="animate-spin" /> : <SearchOutlined />}
                  <input
                    value={keyword}
                    onChange={onSearch}
                    onKeyDown={onKeyDown}
                    highlight={true}
                    autoFocus={true}
                    className="border-none focus:outline-none hover:border-none bg-inherit"
                  />
                </div>
              </div>
              <OperationTable
                defaultCols={defaultCols}
                gridData={gridData}
                setGridData={setGridData}
                cols={cols}
                setCols={setCols}
                numRows={numRows}
                setNumRows={setNumRows}
                onVisibleRegionChanged={onVisibleRegionChanged}
                onCellClicked={onCellOperationClicked}
                selection={selection}
                setSelection={setSelection}
              />
            </div>
          </SplitterPanel>
          <SplitterPanel size={75} minSize={10}>
            <OperationInfoQuery formBasic={formBasic} />

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
                <span className="flex items-center gap-1 text-sm font-bold">
                  <ApartmentOutlined style={{ fontSize: 12 }} />
                  {t('Thông tin')}
                </span>
              </Menu.Item>

              <Menu.Item key="2">
                <span className="flex items-center gap-1 text-sm font-bold">
                  <SyncOutlined style={{ fontSize: 12 }} />
                  {t('Thiết bị')}
                </span>
              </Menu.Item>

              <Menu.Item key="3">
                <span className="flex items-center gap-1 text-sm font-bold">
                  <AppstoreAddOutlined style={{ fontSize: 12 }} />
                  {t('Trình tự công đoạn')}
                </span>
              </Menu.Item>

              <Menu.Item key="4">
                <span className="flex items-center gap-1 text-sm font-bold">
                  <DashboardOutlined style={{ fontSize: 12 }} />
                  {t('Danh mục')}
                </span>
              </Menu.Item>

              {current === '2' && (
                <Menu.Item
                  key="buttons"
                  disabled
                  style={{
                    marginLeft: 'auto',
                    cursor: 'default',
                    background: 'transparent'
                  }}
                >
                  <div className="flex gap-1 items-center">
                    <Button type="text" icon={<PlusCircleFilled style={{ color: '#10b981', padding: 0 }} />} onClick={onInsertRow}>
                      Chèn
                    </Button>
                    <Button type="text" icon={<MinusCircleFilled style={{ color: '#ef4444' }} />} onClick={removeRow}>
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
              )}
            </Menu>
            {current === '1' && (
              <div className="bg-slate-50  h-[calc(100vh-170px)]">
                <Splitter className="w-full h-full ">
                  <SplitterPanel size={50} minSize={10}>
                    <OperationManageInfo
                      formBasic={formInfo}
                      dataUnit={dataUnit}
                      dataStep={dataStep}
                      dataLossTable={dataLossTable}
                      dataSuccessTable={dataSuccessTable}
                      dataOpEqpTable={dataOpEqpTable}
                    />
                  </SplitterPanel>

                  <SplitterPanel size={50} minSize={10}>
                    <OperationPropertiesTable
                      defaultCols={defaultColsOpProperties}
                      gridData={gridDataOpProperties}
                      setGridData={setGridDataOpProperties}
                      cols={colsOpProperties}
                      setCols={setColsOpProperties}
                      numRows={numRowsOpProperties}
                      setNumRows={setNumRowsOpProperties}
                      selection={selectionOpProperties}
                      setSelection={setSelectionOpProperties}
                    />
                  </SplitterPanel>
                </Splitter>
              </div>
            )}
            {current === '2' && (
              <div className="bg-slate-50  h-[calc(100vh-170px)]">
                <Splitter className="w-full h-full ">
                  <SplitterPanel size={50} minSize={10}>
                    <EquipmentTable
                      defaultCols={defaultColsOpEqp}
                      gridData={gridDataEqp}
                      setGridData={setGridDataEqp}
                      cols={colsEqp}
                      setCols={setColsEqp}
                      numRows={numRowsEqp}
                      setNumRows={setNumRowsEqp}
                      onVisibleRegionChanged={onVisibleRegionChanged}
                      onCellOperationClicked={onCellOperationClicked}
                      selection={selection}
                      setSelection={setSelection}
                    />
                  </SplitterPanel>

                  <SplitterPanel size={50} minSize={10}>
                    <OperationEquipTable
                      defaultCols={defaultColsOpEqp}
                      gridData={gridDataOpEqp}
                      setGridData={setGridDataOpEqp}
                      cols={colsOperationEqp}
                      setCols={setColsOperationEqp}
                      numRows={numRowsOpEqp}
                      setNumRows={setNumRowsOpEqp}
                      selection={selectionOpEqp}
                      setSelection={setSelectionOpEqp}
                    />
                  </SplitterPanel>
                </Splitter>
              </div>
            )}

            {current === '3' && (
              <div className="bg-slate-50  h-[calc(100vh-170px)]">
                <OperationStepTable
                  setSelection={setSelectionOperationStep}
                  selection={selectionOperationStep}
                  setEditedRows={setEditedRowsOpStep}
                  setGridData={setGridDataOpStep}
                  gridData={gridDataOpStep}
                  numRows={numRowsOpStep}
                  handleRowAppend={handleRowAppendOpStep}
                  setCols={setColsOpStep}
                  cols={colsOpStep}
                  defaultCols={defaultColsOpStep}
                  canEdit={canEdit}
                  controllers={controllers}
                  loadingBarRef={loadingBarRef}
                  setIsAPISuccess={setIsAPISuccess}
                  isAPISuccess={isAPISuccess}
                />
              </div>
            )}
            {current === '4' && (
              <div className="bg-slate-50  h-[calc(100vh-170px)]">
                <CategoryTable
                  dataCategoryValue={dataCategoryValue}
                  defaultCols={defaultColsCategory}
                  gridData={gridDataCategory}
                  setGridData={setGridDataCategory}
                  cols={colsCategory}
                  setCols={setColsCategory}
                  numRows={numRowsCategory}
                  setNumRows={setNumRowsCategory}
                  handleRowAppend={handleRowAppendCategory}
                  setEditedRows={setEditedRowsCategory}
                  selection={selectionCategory}
                  setSelection={setSelectionCategory}
                  onCellClicked={onCellCategoryClicked}
                />
              </div>
            )}
          </SplitterPanel>
        </Splitter>
      </div>

      {contextHolder}
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default ManageOperationDetails;
