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
  DashboardOutlined,
  LoadingOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
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

import { DeleteRouteOpBy } from 'services/RouteSetManage/DeleteRouteOpBy';
import CategoryTable from 'component/Sheets/CategoryTable';
import { SearchCategory } from 'services/ManageCategorySys/SearchCategory';
import EquipmentTable from './table/EquipmentTable';
import MachineInfoQuery from './query/MachineInfoQuery';
import MachineManageInfo from './query/MachineManageInfo';
import OperationTable from 'views/ManageRouteSet/table/OperationTable';
import OperationEquipTable from 'views/ManageOperationDetails/table/OperationEquipTable';
import EventTable from 'views/ManageMachineEvent/table/EventTable';
import EquipmentEventTable from './table/EquipmentEventTable';
import ToolTable from 'views/ManageMachineTool/table/ToolTable';
import EquipmentToolTable from './table/EquipmentEventTable';
import { SearchEquipment } from 'services/EquipmentManage/SearchEquipment';
import { getEquipmentById } from 'services/EquipmentManage/GetEquipmentById';
import { SearchOperationBy } from 'services/OperationManage/SearchOperationBy';
import { eventSearchBy } from 'services/EventManage/EventSearchBy';
import { toolSearchBy } from 'services/ToolManage/ToolSearchBy';
import { createEquipmentBy } from 'services/EquipmentManage/CreateEquipmentByService';
import { updateIndexNo } from 'utils/sheets/updateIndexNo';
import { deleteEqpEventById } from 'services/EquipmentManage/DeleteEqpEventById';
import { deleteEqpToolById } from 'services/EquipmentManage/DeleteEqpToolById';
import { deleteEqpOpBy } from 'services/OperationManage/DeleteEqpOpBy';
import { eq } from 'lodash';
import { deleteEqpOperationBy } from 'services/EquipmentManage/DeleteEqpOperationBy';
import { deleteEquipmentById } from 'services/EquipmentManage/DeleteEquipmentById';
import { toolDetailsSearchBy } from 'services/ToolManage/ToolDetailsSearchBy';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageMachineDetails = ({ canCreate, canEdit, canDelete, canView }) => {
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

  const [selectionEvent, setSelectionEvent] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionEqpEvent, setSelectionEqpEvent] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionTool, setSelectionTool] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionEqpTool, setSelectionEqpTool] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionOpProperties, setSelectionOpProperties] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionEqpOp, setSelectionEqpOp] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [operationSelected, setOperationSelected] = useState([]);
  const [eventSelected, setEventSelected] = useState([]);
  const [toolSelected, setToolSelected] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(null);
  const [editedRows, setEditedRows] = useState([]);
  const [editedRowsCategory, setEditedRowsCategory] = useState([]);

  const [categorySelected, setCategorySelected] = useState([]);
  const [eqpOpSelected, setEqpOpSelected] = useState([]);
  const [eqpEventSelected, setEqpEventSelected] = useState([]);
  const [eqpToolSelected, setEqpToolSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [selectedEqp, setEqpSelected] = useState(null);

  const [dataLossTable, setDataLossTable] = useState([]);
  const [dataSuccessTable, setDataSuccessTable] = useState([]);
  const [dataStep, setDataStep] = useState([]);
  const [dataUnit, setDataUnit] = useState([]);
  const [dataOpEqpTable, setDataReworkTable] = useState([]);
  const [dataBonusTable, setDataBonusTable] = useState([]);
  const [inParameterData, setInParameterData] = useState([]);
  const [outParameterData, setOutParameterData] = useState([]);

  const cellConfig = {};

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
      'S_OPERTATION_LIST',
      defaultCols.filter((col) => col.visible)
    )
  );

  const [gridDataOp, setGridDataOp] = useState([]);
  const [numRowsOp, setNumRowsOp] = useState(0);
  const [selectionOp, setSelectionOp] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const defaultColsEqp = useMemo(() => [
    {
      title: '',
      id: 'Status',
      kind: 'Text',
      readonly: true,
      width: 50,
      hasMenu: true,
      visible: false,
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
      width: 100,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã thiết bị'),
      id: 'equipmentId',
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
      title: t('Mã thiết bị'),
      id: 'eqpCode',
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
      title: t('Tên thiết bị'),
      id: 'eqpName',
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
    },
    {
      title: t('Nhãn hiệu'),
      id: 'model',
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
      title: t('Nhà cung cấp'),
      id: 'vendor',
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
      title: t('Khu vực lắp đặt'),
      id: 'location',
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
      title: t('Trạng thái thiết bị'),
      id: 'status',
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
      title: t('Trung tâm hoạt động'),
      id: 'workCenter',
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
      title: t('Mã tài sản'),
      id: 'assetName',
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
      title: t('Sản phẩm áp dụng'),
      id: 'applicableProduct',
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
      title: t('Đơn vị lắp ráp'),
      id: 'assembler',
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
      title: t('Giá mua'),
      id: 'purchasePrice',
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
      title: t('Ngày nhập kho'),
      id: 'warehouseDate',
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
      title: t('Tình trạng'),
      id: 'machineStatus',
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
      title: t('Chiều dài'),
      id: 'length',
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
      title: t('Chiều rộng'),
      id: 'width',
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
      title: t('Chiều cao'),
      id: 'height',
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
      title: t('Cân nặng'),
      id: 'weight',
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
      title: t('Mức tiêu thụ điện'),
      id: 'power',
      kind: 'Text',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);
  const [colsOpEqp, setColsOpEqp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EQUIPMENT',
      defaultColsEqp.filter((col) => col.visible)
    )
  );
  const [gridDataEqpOp, setGridDataEqpOp] = useState([]);
  const [numRowsEqpOp, setNumRowsEqpOp] = useState(0);

  const defaultColsEqpProperties = useMemo(() => [
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
      defaultColsEqpProperties.filter((col) => col.visible)
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

  const [numRowsToAddOpProperties, setNumRowsToAddOpEqp] = useState(null);
  const [addedRowsOpProperties, setAddedRowsOpProperties] = useState([]);

  const [colsEqp, setColsEqp] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EQUIPMENT',
      defaultColsEqp.filter((col) => col.visible)
    )
  );
  const [gridDataEqp, setGridDataEqp] = useState([]);
  const [numRowsEqp, setNumRowsEqp] = useState(0);

  const defaultColsEvent = useMemo(() => [
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
      title: t('Mã trạng thái'),
      id: 'id',
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
      title: t('Mã trạng thái'),
      id: 'eventCode',
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
      title: t('Tên trạng thái'),
      id: 'eventName',
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
    }
  ]);

  const [colsEvent, setColsEvent] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EVENT',
      defaultColsEvent.filter((col) => col.visible)
    )
  );
  const [gridDataEvent, setGridDataEvent] = useState([]);
  const [numRowsEvent, setNumRowsEvent] = useState(0);

  const defaultColsEqpEvent = useMemo(() => [
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
      title: t('Mã trạng thái'),
      id: 'id',
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
      title: t('Mã thiết bị'),
      id: 'equipmentId',
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
      title: t('Mã trạng thái'),
      id: 'eventId',
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
      title: t('Mã trạng thái'),
      id: 'eventCode',
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
      title: t('Tên trạng thái'),
      id: 'eventName',
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
    }
  ]);

  const [colsEqpEvent, setColsEqpEvent] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EQP_EVENT',
      defaultColsEqpEvent.filter((col) => col.visible)
    )
  );

  const [gridDataEqpEvent, setGridDataEqpEvent] = useState([]);
  const [numRowsEqpEvent, setNumRowsEqpEvent] = useState(0);

  const defaultColsTool = useMemo(() => [
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
      title: t('Mã phụ kiện'),
      id: 'id',
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
      title: t('Mã phụ kiện'),
      id: 'toolCode',
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
      title: t('Tên phụ kiện'),
      id: 'toolName',
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
      title: t('Phân loại'),
      id: 'toolType',
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
    }
  ]);

  const [colsTool, setColsTool] = useState(() =>
    loadFromLocalStorageSheet(
      'S_TOOL',
      defaultColsTool.filter((col) => col.visible)
    )
  );
  const [gridDataTool, setGridDataTool] = useState([]);
  const [numRowsTool, setNumRowsTool] = useState(0);

  const defaultColsEqpTool = useMemo(() => [
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
      title: t('Mã phụ kiện'),
      id: 'id',
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
      title: t('Mã phụ kiện'),
      id: 'toolId',
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
      title: t('Mã phụ kiện'),
      id: 'toolCode',
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
      title: t('Tên phụ kiện'),
      id: 'toolName',
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
      title: t('Mã công đoạn'),
      id: 'operationId',
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
      title: t('Mã công đoạn'),
      id: 'operationCode',
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
      title: t('equipmentId'),
      id: 'equipmentId',
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
      title: t('Mã thiết bị'),
      id: 'equipmentCode',
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
    }
  ]);

  const [colsEqpTool, setColsEqpTool] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EQP_TOOL',
      defaultColsEqpTool.filter((col) => col.visible)
    )
  );
  const [gridDataEqpTool, setGridDataEqpTool] = useState([]);
  const [numRowsEqpTool, setNumRowsEqpTool] = useState(0);

  const [isSent, setIsSent] = useState(false);
  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const fieldsToTrack = ['IdxNo'];
  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridData, fieldsToTrack);

  const [equipId, setEquipId] = useState('');

  //  Data Input
  const [formBasic] = Form.useForm();
  const [formData] = Form.useForm();

  const dataCategoryValue = [
    { MinorName: '8080', Value: 1 },
    { MinorName: '8000', Value: 2 },
    { MinorName: '3000', Value: 3 }
  ];

  const [checkPageA, setCheckPageA] = useState(false);
  const [current, setCurrent] = useState('1');

  const onClickSave = useCallback(async () => {
    const requiredColumns = ['configProdName'];

    const columnEqpOp = ['id', 'equipmentId', 'operationId', 'operationCode', 'operationName', 'description'];
    const columnEqpEvent = ['id', 'operationId', 'operationCode', 'eventId', 'eventCode', 'eventName', 'description'];

    const columnEqpTool = [
      'id',
      'toolId',
      'toolCode',
      'toolName',
      'operationId',
      'operationCode',
      'operationName',
      'equipmentId',
      'equipmentCode',
      'equipmentName'
    ];

    const columnsCategory = [
      'IdxNo',
      'id',
      'configProdNameId',
      'equipId',
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
      const dataForm = await formData.getFieldValue();

      const dataOpEqpA = filterAndSelectColumns(gridDataEqpOp, columnEqpOp, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataOpEqpU = filterAndSelectColumns(gridDataEqpOp, columnEqpOp, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataOpEventA = filterAndSelectColumns(gridDataEqpEvent, columnEqpEvent, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataOpEventU = filterAndSelectColumns(gridDataEqpEvent, columnEqpEvent, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataCategoryA = filterAndSelectColumns(gridDataCategory, columnsCategory, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataCategoryU = filterAndSelectColumns(gridDataCategory, columnsCategory, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataToolA = filterAndSelectColumns(gridDataEqpTool, columnEqpTool, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataToolU = filterAndSelectColumns(gridDataEqpTool, columnEqpTool, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        equipmentId: equipId || ''
      }));

      const dataOpEqp = [...dataOpEqpA, ...dataOpEqpU];
      const dataOpEvent = [...dataOpEventA, ...dataOpEventU];
      const dataTool = [...dataToolA, ...dataToolU];

      const dataCategory = [...dataCategoryA, ...dataCategoryU];
      const dto = {
        equipment: {
          id: equipId || '',
          ...data,
          ...dataForm
        },
        operations: dataOpEqp,
        events: dataOpEvent,
        tools: dataTool,
        categories: dataCategory
      };
      try {
        const result = await createEquipmentBy(dto);

        if (result.success) {
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Cập nhật thành công!'
          });

          setIsSent(false);
          setEditedRows([]);
          const { categories, equipment, events, operations, tools } = result.data;

          setGridDataEqpOp((prev) => {
            const updated = prev.map((item) => {
              const found = operations.find((x) => x?.id === item?.id);

              return found
                ? {
                    ...item,
                    Status: '',
                    id: found?.id
                  }
                : {
                    ...item,
                    Status: '',
                    id: found?.id
                  };
            });
            return updateIndexNo(updated);
          });

          setGridDataEqpEvent((prev) => {
            const updated = prev.map((item) => {
              const found = events.find((x) => x?.id === item?.id);

              return found
                ? {
                    ...item,
                    Status: '',
                    id: found?.id
                  }
                : {
                    ...item,
                    Status: '',
                    id: found?.id
                  };
            });
            return updateIndexNo(updated);
          });

          setGridDataEqpTool((prev) => {
            const updated = prev.map((item) => {
              const found = tools.find((x) => x?.id === item?.id);

              return found
                ? {
                    ...item,
                    Status: '',
                    id: found?.id
                  }
                : {
                    ...item,
                    Status: '',
                    id: found?.id
                  };
            });
            return updateIndexNo(updated);
          });

          setGridDataCategory((prev) => {
            const updated = prev.map((item) => {
              const found = categories.find((x) => x?.id === item?.id);

              return found
                ? {
                    ...item,
                    Status: '',
                    id: found?.id
                  }
                : {
                    ...item,
                    Status: '',
                    id: found?.id
                  };
            });
            return updateIndexNo(updated);
          });

          setGridDataEqp((prev) => {
            const updated = prev.map((item) => {
              return equipment
                ? {
                    ...item,
                    Status: '',
                    id: equipment?.id
                  }
                : {
                    ...item,
                    Status: '',
                    id: equipment?.id
                  };
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
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }, [formBasic, gridDataCategory, gridDataEqpEvent, isAPISuccess, equipId, gridDataEqpOp, gridDataEqpTool]);

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

      const response = await SearchEquipment(data);
      const fetchedData = response.data || [];

      setGridDataEqp(fetchedData);
      setNumRowsEqp(fetchedData.length);
      setIsAPISuccess(true);
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
      controllers.current.onFetchEquipment = null;
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

      setGridDataOp(fetchedData);
      setNumRowsOp(fetchedData.length);
    } catch (error) {
      setGridDataOp([]);
      setNumRowsOp(0);
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
  }, [gridDataOp, numRowsOp, keyword, pageIndex, pageSize, isAPISuccess]);

  const onFetchEvent = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchEvent) {
      controllers.current.onFetchEvent.abort();
      controllers.current.onFetchEvent = null;
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

    controllers.current.onFetchEvent = controller;

    setIsAPISuccess(false);

    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = await eventSearchBy(data);
      const fetchedData = response.data || [];

      setGridDataEvent(fetchedData);
      setNumRowsEvent(fetchedData.length);
    } catch (error) {
      setGridDataEvent([]);
      setNumRowsEvent(0);
      setIsAPISuccess(true);
      notify({
        type: 'false',
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
      controllers.current.onFetchEvent = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [gridDataEvent, numRowsEvent, keyword, pageIndex, pageSize, isAPISuccess]);

  const onFetchTool = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchTool) {
      controllers.current.onFetchTool.abort();
      controllers.current.onFetchTool = null;
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

    controllers.current.onFetchTool = controller;

    setIsAPISuccess(false);

    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = await toolDetailsSearchBy(data);
      const fetchedData = response.data || [];

      setGridDataTool(fetchedData);
      setNumRowsTool(fetchedData.length);
    } catch (error) {
      setGridDataTool([]);
      setNumRowsTool(0);
      setIsAPISuccess(true);
      notify({
        type: 'false',
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
      });
    } finally {
      setIsAPISuccess(true);
      controllers.current.onFetchTool = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [gridDataTool, numRowsTool, keyword, pageIndex, pageSize, isAPISuccess]);

  const onFetchEquipmentById = useCallback(
    async (id) => {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.onFetchEquipmentById) {
        controllers.current.onFetchEquipmentById.abort();
        controllers.current.onFetchEquipmentById = null;
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

      controllers.current.onFetchEquipmentById = controller;

      setIsAPISuccess(false);

      try {
        const data = {
          Keyword: keyword,
          PageIndex: pageIndex,
          PageSize: pageSize
        };

        const response = await getEquipmentById(id);
        const fetchedData = response.data || [];

        const { equipment, events, operations, tools, categories } = fetchedData;

        formBasic.setFieldsValue({
          eqpName: equipment.eqpName,
          eqpCode: equipment.eqpCode,
          description: equipment.description
        });

        formData.setFieldsValue({
          model: equipment.model,
          vendor: equipment.vendor,
          location: equipment.location,
          status: equipment.status,
          workCenter: equipment.workCenter,
          assetName: equipment.assetName,
          applicableProduct: equipment.applicableProduct,
          assembler: equipment.assembler,
          purchasePrice: equipment.purchasePrice,
          warehouseDate: equipment.warehouseDate,
          machineStatus: equipment.machineStatus,
          length: equipment.length,
          width: equipment.width,
          height: equipment.height,
          weight: equipment.weight,
          power: equipment.power
        });
        setEquipId(equipment.id);

        setGridDataEqpOp(operations || []);
        setNumRowsEqpOp((operations || []).length);

        setGridDataEqpEvent(events || []);
        setNumRowsEqpEvent((events || []).length);

        setGridDataEqpTool(tools || []);
        setNumRowsEqpTool((tools || []).length);

        setGridDataCategory(categories || []);
        setNumRowsCategory((categories || []).length);

        setIsAPISuccess(true);
      } catch (error) {
        setGridDataEqp([]);
        setNumRowsEqp(0);

        setGridDataEqpOp([]);
        setNumRowsEqpOp(0);

        setGridDataEqpEvent([]);
        setNumRowsEqpEvent(0);

        setGridDataEqpTool([]);
        setNumRowsEqpTool(0);

        setGridDataCategory([]);
        setNumRowsCategory(0);
        setIsAPISuccess(true);
        notify({
          type: 'false',
          message: 'Lỗi',
          description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
        });
      } finally {
        setIsAPISuccess(true);
        controllers.current.onFetchEquipmentById = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    },
    [keyword, gridDataEqp, gridDataEqpOp, gridDataEqpEvent, gridDataEqpTool, gridDataCategory, pageIndex, pageSize, isAPISuccess]
  );

  const getSelectedRowsData = (gridData, selection) => {
    const selectedRows = selection.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridData[start + i]).filter((row) => row !== undefined)
    );
  };

  const getSelectedRowsOpData = () => {
    const selectedRows = selectionOp.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridDataOp[start + i]).filter((row) => row !== undefined)
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

  const onCellOpClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataOp.length) {
          const isSelected = selectionOp.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionOp.rows.remove(rowIndex);
            setOperationSelected(getSelectedRowsData(gridDataOp, selectionOp));
          } else {
            newSelected = selectionOp.rows.add(rowIndex);
            setOperationSelected([]);
          }
        }
      }
    },
    [gridData, getSelectedRowsOpData, operationSelected, selectionOp]
  );

  const onCellEventClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataEvent.length) {
          const isSelected = selectionEvent.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionEvent.rows.remove(rowIndex);
            setEventSelected(getSelectedRowsData(gridDataEvent, selectionEvent));
          } else {
            newSelected = selectionEvent.rows.add(rowIndex);
            setEventSelected([]);
          }
        }
      }
    },
    [gridData, getSelectedRowsData, eventSelected]
  );

  const onCellToolClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataTool.length) {
          const isSelected = selectionTool.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionTool.rows.remove(rowIndex);
            setToolSelected(getSelectedRowsData(gridDataTool, selectionTool));
          } else {
            newSelected = selectionTool.rows.add(rowIndex);
            setToolSelected([]);
          }
        }
      }
    },
    [gridDataTool, getSelectedRowsData, toolSelected]
  );

  const onCellEqpOpClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataEqpOp.length) {
          const isSelected = selectionEqpOp.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionEqpOp.rows.remove(rowIndex);
            setEqpOpSelected(getSelectedRowsData(gridDataEqpOp, selectionEqpOp));
          } else {
            newSelected = selectionEqpOp.rows.add(rowIndex);
            setEqpOpSelected([]);
          }
        }
      }
    },
    [gridDataEqpOp, getSelectedRowsData, eqpOpSelected]
  );

  const onCellEqpEventClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataEqpEvent.length) {
          const isSelected = selectionEqpEvent.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionEqpEvent.rows.remove(rowIndex);
            setEqpEventSelected(getSelectedRowsData(gridDataEqpEvent, selectionEqpEvent));
          } else {
            newSelected = selectionEqpEvent.rows.add(rowIndex);
            setEqpEventSelected([]);
          }
        }
      }
    },
    [gridDataEqpEvent, getSelectedRowsData, eqpEventSelected]
  );

  const onCellEqpToolClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataEqpTool.length) {
          const isSelected = selectionEqpTool.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionEqpTool.rows.remove(rowIndex);
            setEqpToolSelected(getSelectedRowsData(gridDataEqpTool, selectionEqpTool));
          } else {
            newSelected = selectionEqpTool.rows.add(rowIndex);
            setEqpToolSelected([]);
          }
        }
      }
    },
    [gridDataEqpTool, getSelectedRowsData, eqpToolSelected]
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

  const onCellEqpClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataEqp.length) {
          const isSelected = selection.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selection.rows.remove(rowIndex);
            setEqpSelected(getSelectedRowsData(gridDataEqp, selection));
          } else {
            newSelected = selection.rows.add(rowIndex);
            setEqpSelected([]);
          }
        }
      }
    },
    [gridDataEqp, getSelectedRowsData, selection, selectedEqp]
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
        await Promise.all([SearchCategory(1, 'fmOperationRegister', '', '', pageIndex, pageSize, keyword)]);

      setDataUnit(unitData.data);
      // setDataStep(stepData.data.data.content);
      // setDataLossTable(lostData.data.data.content);
      // setDataSuccessTable(successData.data.data.content);
      // setInParameterData(inParameterData.data.data.content);
      // setOutParameterData(outParameterData.data.data.content);
      // setDataReworkTable(reworkParameterData.data.data.content);
      // setDataBonusTable(bonusParameterData.data.data.content);
    } catch (error) {
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
    if (selectedEqp) {
      onFetchEquipmentById(selectedEqp[0]?.id);
    }
  }, [selectedEqp]);

  useEffect(() => {
    onFetchDropdownData();
    onFetchOperation();
    onFetchEquipment();
    onFetchEvent();
    onFetchTool();
  }, []);

  const onInsertRow = () => {
    if (current === '2') {
      onInsertRowEqpOp();
    } else if (current === '3') {
      onInsertRowEqpEvent();
    } else if (current === '4') {
      onInsertRowEqpTool();
    }
  };

  const onInsertRowTemp = useCallback(() => {
    if (!Array.isArray(selectedEqp) || selectedEqp.length === 0) {
      notify({
        type: 'warning',
        message: 'Warning',
        description: 'Chưa lựa chọn thiết bị để thêm!'
      });
      return;
    }

    try {
      const dto = selectedEqp.map((item) => ({
        eqpId: item.id,
        operationId: operationId || item.operationId,
        operationCode: operationCode || item.operationCode,
        operationName: operationName || item.operationName,
        eqpCode: item.eqpCode,
        eqpName: item.eqpName,
        description: item.description,
        Status: 'A'
      }));

      setGridDataEq((prev) => {
        const updated = [...prev];

        dto.forEach((newRow) => {
          const idx = updated.findIndex((x) => x.eqpId === newRow.eqpId && x.operationId === newRow.operationId);
          if (idx >= 0) {
            updated[idx] = { ...updated[idx], ...newRow };
          } else {
            updated.push(newRow);
          }
        });

        setNumRowsOpEqp(updated.length);
        return updateIndexNo(updated);
      });
    } catch (error) {
      console.error('Error in onInsertRow:', error);
      message.error('Có lỗi xảy ra khi thêm dòng mới');
    }
  }, [selectedEqp, equipId]);

  const onInsertRowEqpOp = useCallback(() => {
    if (!Array.isArray(operationSelected) || operationSelected.length === 0) {
      notify({
        type: 'warning',
        message: 'Warning',
        description: 'Chưa lựa chọn công đoạn để thêm!'
      });
      return;
    }

    try {
      const dto = operationSelected.map((item) => ({
        eqpId: item.equipmentId,
        operationId: item.id,
        operationCode: item.operationCode,
        operationName: item.operationName,
        eqpCode: item.eqpCode,
        eqpName: item.eqpName,
        description: item.description,
        Status: 'A'
      }));

      setGridDataEqpOp((prev) => {
        const updated = [...prev];

        dto.forEach((newRow) => {
          const idx = updated.findIndex((x) => x.eqpId === newRow.eqpId && x.operationId === newRow.operationId);
          if (idx >= 0) {
            updated[idx] = { ...updated[idx], ...newRow };
          } else {
            updated.push(newRow);
          }
        });

        setNumRowsEqpOp(updated.length);
        return updateIndexNo(updated);
      });
    } catch (error) {
      console.error('Error in onInsertRow:', error);
      message.error('Có lỗi xảy ra khi thêm dòng mới');
    }
  }, [gridDataEqpOp, operationSelected]);

  const onInsertRowEqpEvent = useCallback(() => {
    if (!Array.isArray(eventSelected) || eventSelected.length === 0) {
      notify({
        type: 'warning',
        message: 'Warning',
        description: 'Chưa lựa chọn công đoạn để thêm!'
      });
      return;
    }

    try {
      const dto = eventSelected.map((item) => ({
        eqpId: item.equipmentId,
        equipmentId: item.equipmentId,
        eventId: item.id,
        eventCode: item.eventCode,
        eventName: item.eventName,
        description: item.description,
        Status: 'A'
      }));

      setGridDataEqpEvent((prev) => {
        const updated = [...prev];

        dto.forEach((newRow) => {
          const idx = updated.findIndex((x) => x.eqpId === newRow.eqpId && x.eventId === newRow.eventId);
          if (idx >= 0) {
            updated[idx] = { ...updated[idx], ...newRow };
          } else {
            updated.push(newRow);
          }
        });

        setNumRowsEqpEvent(updated.length);
        return updateIndexNo(updated);
      });
    } catch (error) {
      console.error('Error in onInsertRow:', error);
      message.error('Có lỗi xảy ra khi thêm dòng mới');
    }
  }, [gridDataEqpEvent, eventSelected]);

  const onInsertRowEqpTool = useCallback(() => {
    if (!Array.isArray(toolSelected) || toolSelected.length === 0) {
      notify({
        type: 'warning',
        message: 'Warning',
        description: 'Chưa lựa chọn công đoạn để thêm!'
      });
      return;
    }

    try {
      const dto = toolSelected.map((item) => ({
        eqpId: item.equipmentId,
        toolId: item.id,
        toolCode: item.toolCode,
        toolName: item.toolName,
        operationId: item.operationId,
        operationCode: item.operationCode,
        equipmentId: item.equipmentId,
        equipmentCode: item.equipmentCode,
        description: item.description,
        Status: 'A'
      }));

      setGridDataEqpTool((prev) => {
        const updated = [...prev];

        dto.forEach((newRow) => {
          const idx = updated.findIndex((x) => x.eqpId === newRow.eqpId && x.eventId === newRow.eventId);
          if (idx >= 0) {
            updated[idx] = { ...updated[idx], ...newRow };
          } else {
            updated.push(newRow);
          }
        });

        setNumRowsEqpTool(updated.length);
        return updateIndexNo(updated);
      });
    } catch (error) {
      console.error('Error in onInsertRow:', error);
      message.error('Có lỗi xảy ra khi thêm dòng mới');
    }
  }, [gridDataEqpTool, toolSelected]);

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
        if (eqpOpSelected.length === 0 && categorySelected.length === 0 && eqpEventSelected.length === 0 && eqpToolSelected.length === 0) {
          message.warning('Vui lòng chọn ít nhất một dòng để xóa');
          return;
        }
        let response;
        if (eqpOpSelected.length > 0) {
          const ids = eqpOpSelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await deleteEqpOperationBy(ids);
          const updatedData = gridDataEqpOp.filter((row) => !ids.includes(row.id));
          setGridDataEqpOp(updateIndexNo(updatedData));
          setNumRowsEqpOp(updatedData.length);
        }
        if (eqpEventSelected.length > 0) {
          const ids = eqpEventSelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await deleteEqpEventById(ids);
          const updatedData = gridDataEqpEvent.filter((row) => !ids.includes(row.id));
          setGridDataEqpEvent(updateIndexNo(updatedData));
          setNumRowsEqpEvent(updatedData.length);
        }
        if (eqpToolSelected.length > 0) {
          const ids = eqpToolSelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await deleteEqpToolById(ids);
          const updatedData = gridDataEqpTool.filter((row) => !ids.includes(row.id));
          setGridDataEqpTool(updateIndexNo(updatedData));
          setNumRowsEqpTool(updatedData.length);
        }
        if (categorySelected.length > 0) {
          const idCategory = categorySelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await DeleteCategoryBy(idCategory);
          const updatedData = gridDataCategory.filter((row) => !ids.includes(row.id));
          setGridDataCategory(updateIndexNo(updatedData));
          setNumRowsCategory(updatedData.length);
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
        controllers.current.removeRow = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    },
    [gridDataEqpOp, gridDataEqpEvent, gridDataEqpTool, gridDataCategory, categorySelected, eqpOpSelected, eqpEventSelected, eqpToolSelected]
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

  const onClickDelete = useCallback(async () => {
    if (!equipId) {
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
      if (equipId) {
        response = await deleteEquipmentById(equipId);
        const updatedData = gridDataEqp.filter((row) => row.id !== equipId);
        setGridDataEqp(updateIndexNo(updatedData));
        setNumRowsEqp(updatedData.length);
      }

      if (!response.success) {
        notify({
          type: 'error',
          message: 'Lỗi',
          description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
        });
        return;
      } else {
        onClickResetAll();

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
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [equipId, formBasic, isAPISuccess]);

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  const onClickCopy = () => {
    setEquipId('');
  };

  const onClickResetAll = () => {
    formBasic.resetFields();
    formData.resetFields();

    setGridDataCategory([]);
    setNumRowsCategory(0);

    setGridDataEqpOp([]);
    setNumRowsEqpOp(0);

    setGridDataEqpEvent([]);
    setNumRowsEqpEvent(0);

    setGridDataEqpTool([]);
    setNumRowsEqpTool(0);

    setEquipId('');
  };

  return (
    <>
      <div className="h-full mt-4">
        <AuDrAction
          titlePage={'Đăng ký thiết bị'}
          onClickDelete={onClickDelete}
          onClickSave={onClickSave}
          onClickUpdate={() => {}}
          onClickReset={onClickResetAll}
          onClickCopy={onClickCopy}
        />
        <Splitter className="w-full h-full border">
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
              <EquipmentTable
                defaultCols={defaultColsEqp}
                gridData={gridDataEqp}
                setGridData={setGridDataEqp}
                cols={colsEqp}
                setCols={setColsEqp}
                numRows={numRowsEqp}
                setNumRows={setNumRowsEqp}
                onVisibleRegionChanged={onVisibleRegionChanged}
                onCellClicked={onCellEqpClicked}
                selection={selection}
                setSelection={setSelection}
              />
            </div>
          </SplitterPanel>
          <SplitterPanel size={75} minSize={10}>
            <MachineInfoQuery formBasic={formBasic} />

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
                <span className="flex items-center text-sm font-bold">
                  <ApartmentOutlined style={{ fontSize: 12 }} />
                  {t('Thông tin')}
                </span>
              </Menu.Item>

              <Menu.Item key="2">
                <span className="flex items-center text-sm font-bold">
                  <SyncOutlined style={{ fontSize: 12 }} />
                  {t('Cài đặt công đoạn')}
                </span>
              </Menu.Item>

              <Menu.Item key="3">
                <span className="flex items-center  text-sm font-bold">
                  <AppstoreAddOutlined style={{ fontSize: 12 }} />
                  {t('Cài đặt trạng thái')}
                </span>
              </Menu.Item>

              <Menu.Item key="4">
                <span className="flex items-center text-sm font-bold">
                  <AppstoreAddOutlined style={{ fontSize: 12 }} />
                  {t('Cài đặt phụ kiện')}
                </span>
              </Menu.Item>

              <Menu.Item key="5">
                <span className="flex items-center text-sm font-bold">
                  <DashboardOutlined style={{ fontSize: 12 }} />
                  {t('Danh mục')}
                </span>
              </Menu.Item>

              {(current === '2' || current === '3' || current === '4') && (
                <Menu.Item
                  key="buttons"
                  disabled
                  style={{
                    marginLeft: 'auto',
                    cursor: 'default',
                    background: 'transparent'
                  }}
                >
                  <div className="flex items-center">
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
              <div className="bg-slate-50  h-[calc(100vh-190px)]">
                <MachineManageInfo
                  formBasic={formData}
                  dataUnit={dataUnit}
                  dataStep={dataStep}
                  dataLossTable={dataLossTable}
                  dataSuccessTable={dataSuccessTable}
                  dataOpEqpTable={dataOpEqpTable}
                />
              </div>
            )}
            {current === '2' && (
              <div className="bg-slate-50  h-[calc(100vh-180px)]">
                <Splitter className="w-full h-full ">
                  <SplitterPanel size={50} minSize={10}>
                    <OperationTable
                      defaultCols={defaultCols}
                      gridData={gridDataOp}
                      setGridData={setGridDataOp}
                      cols={cols}
                      setCols={setCols}
                      numRows={numRowsOp}
                      setNumRows={setNumRowsOp}
                      onVisibleRegionChanged={onVisibleRegionChanged}
                      onCellClicked={onCellOpClicked}
                      selection={selectionOp}
                      setSelection={setSelectionOp}
                    />
                  </SplitterPanel>

                  <SplitterPanel size={50} minSize={10}>
                    <OperationEquipTable
                      defaultCols={defaultCols}
                      gridData={gridDataEqpOp}
                      setGridData={setGridDataEqpOp}
                      cols={cols}
                      setCols={setCols}
                      numRows={numRowsEqpOp}
                      setNumRows={setNumRowsEqpOp}
                      selection={selectionEqpOp}
                      setSelection={setSelectionEqpOp}
                      onCellClicked={onCellEqpOpClicked}
                    />
                  </SplitterPanel>
                </Splitter>
              </div>
            )}

            {current === '3' && (
              <div className="bg-slate-50  h-[calc(100vh-180px)]">
                <Splitter className="w-full h-full ">
                  <SplitterPanel size={50} minSize={10}>
                    <EventTable
                      defaultCols={defaultColsEvent}
                      gridData={gridDataEvent}
                      setGridData={setGridDataEvent}
                      cols={colsEvent}
                      setCols={setColsEvent}
                      numRows={numRowsEvent}
                      setNumRows={setNumRowsEvent}
                      onVisibleRegionChanged={onVisibleRegionChanged}
                      onCellClicked={onCellEventClicked}
                      selection={selectionEvent}
                      setSelection={setSelectionEvent}
                    />
                  </SplitterPanel>

                  <SplitterPanel size={50} minSize={10}>
                    <EquipmentEventTable
                      defaultCols={defaultColsEqpEvent}
                      gridData={gridDataEqpEvent}
                      setGridData={setGridDataEqpEvent}
                      cols={colsEqpEvent}
                      setCols={setColsEqpEvent}
                      numRows={numRowsEqpEvent}
                      setNumRows={setNumRowsEqpEvent}
                      selection={selectionEqpEvent}
                      setSelection={setSelectionEqpEvent}
                      onCellClicked={onCellEqpEventClicked}
                    />
                  </SplitterPanel>
                </Splitter>
              </div>
            )}

            {current === '4' && (
              <div className="bg-slate-50  h-[calc(100vh-180px)]">
                <Splitter className="w-full h-full ">
                  <SplitterPanel size={50} minSize={10}>
                    <ToolTable
                      defaultCols={defaultColsTool}
                      gridData={gridDataTool}
                      setGridData={setGridDataTool}
                      cols={colsTool}
                      setCols={setColsTool}
                      numRows={numRowsTool}
                      setNumRows={setNumRowsTool}
                      onVisibleRegionChanged={onVisibleRegionChanged}
                      onCellClicked={onCellToolClicked}
                      selection={selectionTool}
                      setSelection={setSelectionTool}
                      cellConfig={cellConfig}
                      
                    />
                  </SplitterPanel>

                  <SplitterPanel size={50} minSize={10}>
                    <EquipmentToolTable
                      defaultCols={defaultColsEqpTool}
                      gridData={gridDataEqpTool}
                      setGridData={setGridDataEqpTool}
                      cols={colsEqpTool}
                      setCols={setColsEqpTool}
                      numRows={numRowsEqpTool}
                      setNumRows={setNumRowsEqpTool}
                      selection={selectionEqpTool}
                      setSelection={setSelectionEqpTool}
                      onCellClicked={onCellEqpToolClicked}
                    />
                  </SplitterPanel>
                </Splitter>
              </div>
            )}
            {current === '5' && (
              <div className="bg-slate-50  h-[calc(100vh-180px)]">
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
                  cellConfig={cellConfig}
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

export default ManageMachineDetails;
