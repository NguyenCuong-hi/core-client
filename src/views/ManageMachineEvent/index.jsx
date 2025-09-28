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

import { SearchRouteTree } from 'services/RouteSetManage/SearchRouteTree';

import { CreateRouteOperationByService } from 'services/RouteSetManage/CreateRouteOperationBy';
import { DeleteRouteOpBy } from 'services/RouteSetManage/DeleteRouteOpBy';
import { CreateRouteByService } from 'services/RouteSetManage/CreateRouteByService';

import CategoryTable from 'component/Sheets/CategoryTable';
import { SearchCategory } from 'services/ManageCategorySys/SearchCategory';
import EventTable from './table/EventTable';
import EventStatusInfoTable from './table/EventStatusInfoTable';
import { eventSearchBy } from 'services/EventManage/EventSearchBy';
import { getEventById } from 'services/EventManage/GetEventById';
import EventInfoQuery from './query/EventInfoQuery';
import { createEventBy } from 'services/EventManage/createEventBy';
import { deleteEventById } from 'services/EventManage/DeleteEventById';
import { deleteEventRuleById } from 'services/EventManage/DeleteEventRuleBy';
import { updateIndexNo } from 'utils/sheets/updateIndexNo';
import { set } from 'lodash';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageMachineEvent = ({ canCreate, canEdit, canDelete, canView }) => {
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

  const [selectionEvent, setSelectionEvent] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionEqpOp, setSelectionEqpOp] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionCategory, setSelectionCategory] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionRuleEvent, setSelectionRuleEvent] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionOpProperties, setSelectionOpProperties] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [eventSelected, setEventSelected] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(null);
  const [editedRows, setEditedRows] = useState([]);
  const [editedRowsCategory, setEditedRowsCategory] = useState([]);

  const [eventRuleSelected, setEventRuleSelected] = useState([]);

  const [categorySelected, setCategorySelected] = useState([]);
  const [routeOpSelected, setRouteOpSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [routeTree, setRouteTree] = useState([]);

  const [dataLossTable, setDataLossTable] = useState([]);
  const [dataSuccessTable, setDataSuccessTable] = useState([]);
  const [dataStep, setDataStep] = useState([]);
  const [dataUnit, setDataUnit] = useState([]);
  const [dataReworkTable, setDataReworkTable] = useState([]);
  const [dataBonusTable, setDataBonusTable] = useState([]);
  const [inParameterData, setInParameterData] = useState([]);
  const [outParameterData, setOutParameterData] = useState([]);
  const cellConfig = {};

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
      title: t('Mã'),
      id: 'id',
      kind: 'Text',
      readonly: true,
      width: 150,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },
    {
      title: t('Mã sự kiện'),
      id: 'eventCode',
      kind: 'Text',
      readonly: false,
      width: 150,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Tên sự kiện'),
      id: 'eventName',
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

  const [gridDataOpEqp, setGridDataOpEqp] = useState([]);
  const [numRowsOpEqp, setNumRowsOpEqp] = useState(0);
  const [numRowsToAddOpProperties, setNumRowsToAddOpEqp] = useState(null);
  const [addedRowsOpProperties, setAddedRowsOpProperties] = useState([]);

  const [colsEvent, setColsEvent] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EVENT',
      defaultColsEvent.filter((col) => col.visible)
    )
  );
  const [gridDataEvent, setGridDataEvent] = useState([]);
  const [numRowsEvent, setNumRowsEvent] = useState(0);

  const defaultColsRuleEvent = useMemo(() => [
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
      title: t('Mã sự kiện'),
      id: 'eventId',
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
      title: t('Thứ tự'),
      id: 'seq',
      kind: 'Text',
      readonly: false,
      width: 100,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    {
      title: t('Mã sự kiện cho phép'),
      id: 'eventNextId',
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
      title: t('Mã sự kiện cho phép'),
      id: 'eventNextCode',
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
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);

  const [colsRuleEvent, setColsRuleEvent] = useState(() =>
    loadFromLocalStorageSheet(
      'S_RULE_EVENT',
      defaultColsRuleEvent.filter((col) => col.visible)
    )
  );
  const [gridDataRuleEvent, setGridDataRuleEvent] = useState([]);
  const [numRowsRuleEvent, setNumRowsRuleEvent] = useState(0);
  const [numRowsToAddRuleEvent, setNumRowsToAddRuleEvent] = useState(null);
  const [addedRowsRuleEvent, setAddedRowsRuleEvent] = useState([]);

  const [ruleEventSelected, setRuleEventSelected] = useState([]);
  const [editedRowsRuleEvent, setEditedRowsRuleEvent] = useState([]);

  const [isSent, setIsSent] = useState(false);
  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const fieldsToTrack = ['IdxNo'];
  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridData, fieldsToTrack);

  const [eventId, setEventId] = useState(null);
  const [eventCode, setEventCode] = useState(null);
  const [eventName, setEventName] = useState(null);

  //  Data Input
  const [formBasic] = Form.useForm();

  const dataCategoryValue = [
    { MinorName: '8080', Value: 1 },
    { MinorName: '8000', Value: 2 },
    { MinorName: '3000', Value: 3 }
  ];

  const [checkPageA, setCheckPageA] = useState(false);
  const [current, setCurrent] = useState('1');

  const onClickSave = useCallback(async () => {
    const requiredColumns = ['eventNextCode', 'eventNextId'];

    const columnRuleEvent = ['id', 'eventId', 'seq', 'eventNextId', 'eventNextCode', 'description'];

    const columnsCategory = [
      'IdxNo',
      'id',
      'configProdNameId',
      'eventId',
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

      const dataRuleEventA = filterAndSelectColumns(gridDataRuleEvent, columnRuleEvent, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || '',
        eventId: eventId || ''
      }));

      const dataRuleEventU = filterAndSelectColumns(gridDataRuleEvent, columnRuleEvent, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        eventId: eventId || ''
      }));

      const dataCategoryA = filterAndSelectColumns(gridDataCategory, columnsCategory, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || '',
        eventId: eventId || ''
      }));

      const dataCategoryU = filterAndSelectColumns(gridDataCategory, columnsCategory, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || '',
        eventId: eventId || ''
      }));

      const dataRuleEvent = [...dataRuleEventA, ...dataRuleEventU];

      const dataCategory = [...dataCategoryA, ...dataCategoryU];
      const dto = {
        event: {
          id: eventId || '',
          ...data
        },
        categories: dataCategory,
        rules: dataRuleEvent
      };
      try {
        const result = await createEventBy(dto);

        if (result.success) {
          const { categories, event, rules } = result.data;
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Cập nhật thành công!'
          });

          setGridData((prev) => {
            const updated = prev.map((item) => {
              const found = event.id === item.id ? event : null;
              console.log('found', found);

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


          setIsSent(false);
          setEditedRows([]);
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
  }, [formBasic, gridDataCategory, gridDataOpProperties, isAPISuccess, eventId, gridDataOpEqp, gridDataRuleEvent, gridData]);

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

      const response = eventSearchBy(data);
      const fetchedData = response.data || [];

      setGridData((prev) => [...prev, ...fetchedData]);
      setNumRows((prev) => prev + fetchedData.length);
    } catch (error) {
      message.error(error.message);
    }
  }, [numRows]);

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
      controllers.current.onFetchEvent = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [gridData, numRows, keyword, pageIndex, pageSize, isAPISuccess]);

  const getSelectedRowsData = (selection, gridData) => {
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
        if (rowIndex >= 0 && rowIndex < gridData.length) {
          const isSelected = selectionEvent.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionEvent.rows.remove(rowIndex);
            setEventSelected(getSelectedRowsData(selectionEvent, gridData));
          } else {
            newSelected = selectionEvent.rows.add(rowIndex);
            setEventSelected([]);
          }
        }
      }
    },
    [gridData, getSelectedRowsData, eventSelected]
  );

  const onCellRuleEventClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataRuleEvent.length) {
          const isSelected = selectionRuleEvent.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionRuleEvent.rows.remove(rowIndex);
            setEventRuleSelected(getSelectedRowsData(selectionRuleEvent, gridDataRuleEvent));
          } else {
            newSelected = selectionRuleEvent.rows.add(rowIndex);
            setEventRuleSelected([]);
          }
        }
      }
    },
    [gridDataRuleEvent, getSelectedRowsData, eventRuleSelected]
  );

  const fetchDataEventById = useCallback(
    async (id) => {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.fetchDataEventById) {
        controllers.current.fetchDataEventById.abort();
        controllers.current.fetchDataEventById = null;
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

      controllers.current.fetchDataEventById = controller;

      setIsAPISuccess(false);

      try {
        const response = await getEventById(id);
        const fetchedData = response.data || [];

        formBasic.setFieldsValue({
          eventName: fetchedData.event.eventCode,
          description: fetchedData.event.description,
          eventCode: fetchedData.event.eventCode
        });

        setEventId(fetchedData.event.id);
        setEventCode(fetchedData.event.eventCode);
        setEventName(fetchedData.event.eventName);

        setGridDataRuleEvent(fetchedData.rules || []);
        setNumRowsRuleEvent(fetchedData.rules?.length || 0);

        setGridDataCategory(fetchedData.categories || []);
        setNumRowsCategory(fetchedData.categories?.length || 0);
      } catch (error) {
        console.log(error);
        setGridDataRuleEvent([]);
        setNumRowsRuleEvent(0);
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
    [formBasic, gridDataRuleEvent, gridDataCategory, isAPISuccess, numRows, numRowsRuleEvent, numRowsCategory]
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
    dataReworkTable,
    dataBonusTable,
    keyword,
    pageIndex,
    pageSize,
    isAPISuccess
  ]);

  useEffect(() => {
    if (!eventSelected[0]?.id) return;
    fetchDataEventById(eventSelected[0]?.id);
  }, [eventSelected]);

  useEffect(() => {
    onFetchDropdownData();
    onFetchEvent();
  }, []);

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
        }
        if (categorySelected.length > 0) {
          const idCategory = categorySelected.map((item) => item.id).filter((id) => id !== undefined);
          response = await DeleteCategoryBy(idCategory);
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

  const handleRowAppendRuleEvent = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsRuleEvent, setGridDataRuleEvent, setNumRowsRuleEvent, setAddedRowsRuleEvent, numRowsToAdd);
    },
    [colsRuleEvent, setGridDataRuleEvent, setNumRowsRuleEvent, setAddedRowsRuleEvent, numRowsToAddRuleEvent]
  );

  const onClickDelete = useCallback(async () => {
    // if (!eventSelected || !eventSelected.data || !eventSelected.data.id) {
    //   message.warning('Vui lòng chọn dữ liệu để xóa');
    //   return;
    // }

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
      if (eventSelected.length !== 0 && eventRuleSelected.length === 0 && categorySelected.length === 0) {
        deleteEvent(eventSelected[0]?.id);
      }
      if (eventRuleSelected.length > 0) {
        deleteRuleEvent();
      }
      if (categorySelected.length > 0) {
        deleteCategory();
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
  }, [eventSelected, gridDataRuleEvent, gridDataCategory, formBasic, isAPISuccess]);

  const deleteEvent = useCallback(
    async (id) => {
      let response = {};
      if (eventSelected.length > 0) {
        response = await deleteEventById(id);
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

        setGridDataRuleEvent([]);
        setNumRowsRuleEvent(0);

        const updatedData = gridData.filter((row) => id !== row.id);
        setGridData(updateIndexNo(updatedData));
        setNumRows(updatedData.length);

        formBasic.resetFields();

        notify({
          type: 'success',
          message: 'Thành công',
          description: 'Xóa dữ liệu thành công!'
        });
      }
    },
    [eventSelected, gridDataCategory, numRowsCategory, gridDataRuleEvent, numRowsRuleEvent, gridData, formBasic, numRows]
  );

  const deleteRuleEvent = useCallback(async () => {
    let response = {};
    if (eventRuleSelected.length > 0) {
      const ids = eventRuleSelected.map((item) => item.id);
      response = await deleteEventRuleById(ids);
    }

    if (!response.success) {
      notify({
        type: 'error',
        message: 'Lỗi',
        description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
      });
      return;
    } else {
      const ids = eventRuleSelected.map((item) => item.id).filter((id) => id !== undefined);
      const updatedData = gridDataRuleEvent.filter((row) => !ids.includes(row.id));
      setGridDataRuleEvent(updateIndexNo(updatedData));
      setNumRowsRuleEvent(updatedData.length);

      notify({
        type: 'success',
        message: 'Thành công',
        description: 'Xóa dữ liệu thành công!'
      });
    }
  }, [gridDataRuleEvent, eventRuleSelected, numRowsRuleEvent]);

  const deleteCategory = useCallback(async () => {
    let response = {};
    if (eventRuleSelected.length > 0) {
      const ids = eventRuleSelected.map((item) => item.id);
      response = await deleteEventRuleById(ids);
    }

    if (!response.success) {
      notify({
        type: 'error',
        message: 'Lỗi',
        description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
      });
      return;
    } else {
      const ids = eventRuleSelected.map((item) => item.id).filter((id) => id !== undefined);
      const updatedData = gridDataRuleEvent.filter((row) => !ids.includes(row.id));
      setGridDataRuleEvent(updateIndexNo(updatedData));
      setNumRowsRuleEvent(updatedData.length);

      notify({
        type: 'success',
        message: 'Thành công',
        description: 'Xóa dữ liệu thành công!'
      });
    }
  }, [gridDataRuleEvent, eventRuleSelected, numRowsRuleEvent]);

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  const onClickCopy = () => {
    setEventId('');
  };

  const onClickResetAll = () => {
    formBasic.resetFields();

    setGridDataRuleEvent([]);
    setNumRowsRuleEvent(0);

    setGridDataCategory([]);
    setNumRowsCategory(0);

    setEventId('');
  };

  return (
    <>
      <div className="h-full mt-4">
        <AuDrAction
          titlePage={'Cấu hình trạng thái thiết bị'}
          onClickDelete={onClickDelete}
          onClickSave={onClickSave}
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
              <EventTable
                defaultCols={defaultColsEvent}
                gridData={gridData}
                setGridData={setGridData}
                cols={colsEvent}
                setCols={setColsEvent}
                numRows={numRows}
                setNumRows={setNumRows}
                onVisibleRegionChanged={onVisibleRegionChanged}
                onCellClicked={onCellEventClicked}
                selection={selectionEvent}
                setSelection={setSelectionEvent}
              />
            </div>
          </SplitterPanel>
          <SplitterPanel size={75} minSize={10}>
            <EventInfoQuery
              formBasic={formBasic}
              dataUnit={dataUnit}
              dataStep={dataStep}
              dataLossTable={dataLossTable}
              dataSuccessTable={dataSuccessTable}
              dataReworkTable={dataReworkTable}
            />

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
                  <AppstoreAddOutlined style={{ fontSize: 12 }} />
                  {t('Trạng thái cho phép')}
                </span>
              </Menu.Item>

              <Menu.Item key="2">
                <span className="flex items-center gap-1 text-sm font-bold">
                  <DashboardOutlined style={{ fontSize: 12 }} />
                  {t('Danh mục')}
                </span>
              </Menu.Item>
            </Menu>

            {current === '1' && (
              <div className="bg-slate-50  h-[calc(100vh-180px)]">
                <EventStatusInfoTable
                  dataEvent={gridData}
                  setDataEvent={setGridData}
                  setSelection={setSelectionRuleEvent}
                  selection={selectionRuleEvent}
                  setEditedRows={setEditedRowsRuleEvent}
                  setGridData={setGridDataRuleEvent}
                  gridData={gridDataRuleEvent}
                  numRows={numRowsRuleEvent}
                  handleRowAppend={handleRowAppendRuleEvent}
                  setCols={setColsRuleEvent}
                  cols={colsRuleEvent}
                  defaultCols={defaultColsRuleEvent}
                  canEdit={canEdit}
                  controllers={controllers}
                  loadingBarRef={loadingBarRef}
                  setIsAPISuccess={setIsAPISuccess}
                  isAPISuccess={isAPISuccess}
                  onCellClicked={onCellRuleEventClicked}
                />
              </div>
            )}
            {current === '2' && (
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

export default ManageMachineEvent;
