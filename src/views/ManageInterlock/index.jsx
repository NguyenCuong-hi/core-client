import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// project import
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { CompactSelection, GridColumnIcon } from '@glideapps/glide-data-grid';
import { Form, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNotify } from 'utils/hooks/onNotify';
import useDynamicFilter from 'utils/hooks/useDynamicFilter';
import { useFullscreenLoading } from 'utils/hooks/useFullscreenLoading';
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { onRowAppended } from 'utils/sheets/onRowAppended';

import Splitter from 'antd/es/splitter/Splitter';
import { SplitterPanel } from 'primereact/splitter';

import { createInterlockBy } from 'services/InterlockManage/createInterlockBy';
import { createInterlockListBy } from 'services/InterlockManage/createInterlockListBy';
import { getInterlockById } from 'services/InterlockManage/getInterlockById';
import { getInterlockByParentId } from 'services/InterlockManage/getInterlockByParentId';
import { searchInterlock } from 'services/InterlockManage/searchInterlock';
import { SearchCategoryByForm } from 'services/ManageCategorySys/SearchCategoryByForm';
import { filterAndSelectColumns } from 'utils/sheets/filterUorA';
import { updateIndexNo } from 'utils/sheets/updateIndexNo';
import AuDInterlockAction from './action/AuDInterlockAction';
import InterlockQuery from './query/InterlockQuery';
import InterlockCatTable from './table/InterlockCatTable';
import InterlockTable from './table/InterlockTable';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageInterlock = ({ canCreate, canEdit, canDelete, canView }) => {
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

  const [selectionInterlockCat, setSelectionInterlockCat] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [selectionInterlock, setSelectionInterlock] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });

  const [interlockCatSelected, setInterlockCatSelected] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(null);
  const [editedRows, setEditedRows] = useState([]);
  const [editedRowsCategory, setEditedRowsInterlock] = useState([]);
  const [editedRowsInterlockCat, setEditedRowsInterlockCat] = useState([]);

  const [interlockSelected, setInterlockSelected] = useState([]);

  const [categorySelected, setCategorySelected] = useState([]);
  const [routeOpSelected, setRouteOpSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [transactionData, setTransactionData] = useState([]);
  const [typeCheckData, setTypeCheckData] = useState([]);
  const [workModeData, setWorkModeData] = useState([]);
  const [ruleTypeData, setRuleTypeData] = useState([]);
  const [dataGroupDevice, setDataGroupDevice] = useState([]);
  const [dataReworkTable, setDataReworkTable] = useState([]);
  const [dataBonusTable, setDataBonusTable] = useState([]);
  const [inParameterData, setInParameterData] = useState([]);
  const [outParameterData, setOutParameterData] = useState([]);
  const cellConfig = {};

  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);

  const defaultColsInterlock = useMemo(() => [
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
      title: t('Mã interlock cha'),
      id: 'parentId',
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
      title: t('Mã phân loại áp dụng'),
      id: 'transactionCodeId',
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
      title: t('Mã phân loại áp dụng'),
      id: 'transactionCode',
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
      title: t('Mã nhóm dòng sản phẩm'),
      id: 'groupDeviceId',
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
      title: t('Nhóm dòng sản phẩm'),
      id: 'groupDevice',
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
      title: t('Mã nhóm thiết bị'),
      id: 'groupEqpId',
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
      title: t('Nhóm thiết bị'),
      id: 'groupEqp',
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
      title: t('Mã nhóm công đoạn'),
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
      title: t('Nhóm công đoạn'),
      id: 'operation',
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
      id: 'eqpCodeId',
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
      id: 'eqpCode',
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
      width: 500,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    }
  ]);

  const [colsInterlock, setColsInterlock] = useState(() =>
    loadFromLocalStorageSheet(
      'S_INTERLOCK',
      defaultColsInterlock.filter((col) => col.visible)
    )
  );
  const [gridDataInterlock, setGridDataInterlock] = useState([]);
  const [numRowsInterlock, setNumRowsInterlock] = useState(0);
  const [numRowsToAddCategory, setNumRowsToAddCategory] = useState(null);
  const [addedRowsCategory, setAddedRowsCategory] = useState([]);

  const defaultColsInterlockCat = useMemo(() => [
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
      title: t('Loại Interlock'),
      id: 'code',
      kind: 'Text',
      readonly: false,
      width: 150,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: false
      }
    },

    {
      title: t('Mã Interlock'),
      id: 'value',
      kind: 'Text',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: false
      }
    }
  ]);

  const [colsInterlockCat, setColsInterlockCat] = useState(() =>
    loadFromLocalStorageSheet(
      'S_EVENT',
      defaultColsInterlockCat.filter((col) => col.visible)
    )
  );

  const [gridDataRuleEvent, setGridDataRuleEvent] = useState([]);
  const [numRowsRuleEvent, setNumRowsRuleEvent] = useState(0);
  const [numRowsToAddInterlockCat, setnumRowsToAddInterlockCat] = useState(null);
  const [addedRowsRuleEvent, setAddedRowsInterlockCat] = useState([]);

  const [isSent, setIsSent] = useState(false);
  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const fieldsToTrack = ['IdxNo'];
  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridData, fieldsToTrack);

  const [interlockId, setInterlockId] = useState(null);
  const [eventCode, setEventCode] = useState(null);
  const [eventName, setEventName] = useState(null);

  const [sqlQuery, setSqlQuery] = useState('');
  const [messageError, setMessageError] = useState('');
  const [groupDeviceId, setGroupDeviceId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [operationId, setOperationId] = useState(null);
  const [operation, setOperation] = useState(null);
  const [eqpId, setEqpId] = useState(null);
  const [eqpName, setEqpName] = useState(null);
  const [typeCheckId, setTypeCheckId] = useState(null);
  const [workModeId, setWorkModeId] = useState(null);

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
      if (interlockCatSelected.length === 0) {
        notify({
          type: 'warning',
          message: 'Warning',
          description: 'Lựa chọn Interlock!'
        });
        setIsSent(false);
        return;
      }

      const dto = {
        ...data,
        id: interlockId,
        parentId: interlockCatSelected[0]?.id || null,
        transactionId: transactionId,
        groupDeviceId: groupDeviceId,
        operation: operation,
        operationId: operationId,
        typeCheckId: typeCheckId,
        workModeId: workModeId,
        eqpId: eqpId,
        eqpCode: eqpName,
        errorText: messageError,
        isActive: true,
        isMail: true,
        isStopEqp: true,
        textSQL: sqlQuery
      };

      try {
        const result = await createInterlockBy(dto);

        if (result.success) {
          const { data } = result;
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Cập nhật thành công!'
          });

          setGridData((prev) => {
            const updated = prev.map((item) => {
              const found = data.id === item.id ? data : null;

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
  }, [
    formBasic,
    isAPISuccess,
    interlockId,
    interlockCatSelected,
    messageError,
    sqlQuery,
    transactionId,
    groupDeviceId,
    operationId,
    typeCheckId,
    workModeId,
    eqpId,
    editedRows
  ]);

  const onClickSaveNewId = useCallback(async () => {
    const columnsInterlock = ['id', 'code', 'value'];

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

      const dataInterlockA = filterAndSelectColumns(gridData, columnsInterlock, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row?.id
      }));

      const dataInterlockU = filterAndSelectColumns(gridData, columnsInterlock, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row?.id
      }));

      try {
        const data = [...dataInterlockA, ...dataInterlockU];
        const result = await createInterlockListBy(data);

        if (result.success) {
          const { data } = result;
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Cập nhật thành công!'
          });

          setGridData((prev) => {
            const updated = prev.map((item) => {
              const found = data.id === item.id ? data : null;

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
  }, [gridData, numRows, isAPISuccess, editedRowsInterlockCat, isSent]);

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

      const response = searchInterlock(data);
      const fetchedData = response.data || [];

      setGridData((prev) => [...prev, ...fetchedData]);
      setNumRows((prev) => prev + fetchedData.length);
    } catch (error) {
      message.error(error.message);
    }
  }, [numRows]);

  const onFetchPageInterlock = useCallback(async () => {
    if (!isAPISuccess) {
      message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
      return;
    }

    if (controllers.current && controllers.current.onFetchPageInterlock) {
      controllers.current.onFetchPageInterlock.abort();
      controllers.current.onFetchPageInterlock = null;
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

    controllers.current.onFetchPageInterlock = controller;

    setIsAPISuccess(false);

    try {
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };

      const response = await searchInterlock(data);
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
      controllers.current.onFetchPageInterlock = null;
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [gridData, ruleTypeData, numRows, keyword, pageIndex, pageSize, isAPISuccess]);

  const getSelectedRowsData = (selection, gridData) => {
    const selectedRows = selection.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridData[start + i]).filter((row) => row !== undefined)
    );
  };

  const getSelectedRowsCategoryData = () => {
    const selectedRows = selectionInterlock.rows.items;

    return selectedRows.flatMap(([start, end]) =>
      Array.from({ length: end - start }, (_, i) => gridDataInterlock[start + i]).filter((row) => row !== undefined)
    );
  };

  const onCellInterlockCatClicked = useCallback(
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
          const isSelected = selectionInterlockCat.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionInterlockCat.rows.remove(rowIndex);
            setInterlockCatSelected(getSelectedRowsData(selectionInterlockCat, gridData));
          } else {
            newSelected = selectionInterlockCat.rows.add(rowIndex);
            setInterlockCatSelected([]);
          }
        }
      }
    },
    [gridData, getSelectedRowsData, interlockCatSelected]
  );

  const onCellInterlockClicked = useCallback(
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
        if (rowIndex >= 0 && rowIndex < gridDataInterlock.length) {
          const isSelected = selectionInterlock.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionInterlock.rows.remove(rowIndex);
            setInterlockSelected(getSelectedRowsData(selectionInterlock, gridDataInterlock));
          } else {
            newSelected = selectionInterlock.rows.add(rowIndex);
            setInterlockSelected([]);
          }
        }
      }
    },
    [gridDataRuleEvent, getSelectedRowsData, interlockSelected]
  );

  const fetchDataInterlockByParent = useCallback(
    async (id) => {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.fetchDataInterlockByParent) {
        controllers.current.fetchDataInterlockByParent.abort();
        controllers.current.fetchDataInterlockByParent = null;
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

      controllers.current.fetchDataInterlockByParent = controller;

      setIsAPISuccess(false);

      try {
        const response = await getInterlockByParentId(id);
        const fetchedData = response.data || [];
        setGridDataInterlock(fetchedData || []);
        setNumRowsInterlock(fetchedData.length || 0);
      } catch (error) {
        setGridDataInterlock([]);
        setNumRowsInterlock(0);
        setIsAPISuccess(true);
        notify({
          type: 'error',
          message: 'Lỗi',
          description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
        });
      } finally {
        setIsAPISuccess(true);
        controllers.current.fetchDataInterlockByParent = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    },
    [gridDataInterlock, isAPISuccess, numRowsInterlock, interlockCatSelected]
  );

  const fetchDataInterlockBy = useCallback(
    async (id) => {
      if (!isAPISuccess) {
        message.warning('Không thể thực hiện, vui lòng kiểm tra trạng thái.');
        return;
      }

      if (controllers.current && controllers.current.fetchDataInterlockBy) {
        controllers.current.fetchDataInterlockBy.abort();
        controllers.current.fetchDataInterlockBy = null;
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

      controllers.current.fetchDataInterlockBy = controller;

      setIsAPISuccess(false);

      try {
        const response = await getInterlockById(id);
        const fetchedData = response.data || [];

        setInterlockId(id);
        setOperationId(fetchedData.operationId);
        setOperation(fetchedData.operation);
        setEqpId(fetchedData.eqpId);
        setEqpName(fetchedData.eqpCode);
        setTypeCheckId(fetchedData.typeCheckId);
        setSqlQuery(fetchedData.textSQL);
        setMessageError(fetchedData.errorText);
        formBasic.setFieldsValue({
          workMode: fetchedData.workMode,
          description: fetchedData.description,
          transactionCode: fetchedData.transactionCode,
          groupDevice: fetchedData.groupDevice,
          groupEqp: fetchedData.groupEqp,
          typeCheck: fetchedData.typeCheck,
          mailGroup: fetchedData.mailGroup
        });
      } catch (error) {
        formBasic.resetFields();
        setIsAPISuccess(true);
        notify({
          type: 'error',
          message: 'Lỗi',
          description: 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
        });
      } finally {
        setIsAPISuccess(true);
        controllers.current.fetchDataInterlockBy = null;
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    },
    [formBasic, isAPISuccess, interlockId]
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
        if (rowIndex >= 0 && rowIndex < gridDataInterlock.length) {
          const isSelected = selectionInterlock.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selectionInterlock.rows.remove(rowIndex);
            setCategorySelected(getSelectedRowsCategoryData());
          } else {
            newSelected = selectionInterlock.rows.add(rowIndex);
            setCategorySelected([]);
          }
        }
      }
    },
    [gridDataInterlock, getSelectedRowsCategoryData, categorySelected]
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
      const [dropDownData] = await Promise.all([SearchCategoryByForm('', 'fmInterlock', pageIndex, pageSize, keyword)]);

      setRuleTypeData(dropDownData?.data?.RULE_TYPE || []);
      setWorkModeData(dropDownData?.data?.WORK_MODE || []);
      setTransactionData(dropDownData.data?.TRANSACTION || []);
      setTypeCheckData(dropDownData.data?.TYPE_CHECK || []);
      setDataGroupDevice(dropDownData.data?.GROUP_PROD || []);
      // setInParameterData(inParameterData.data.data.content);
      // setOutParameterData(outParameterData.data.data.content);
      // setDataReworkTable(reworkParameterData.data.data.content);
      // setDataBonusTable(bonusParameterData.data.data.content);
    } catch (error) {
      setRuleTypeData([]);
      setWorkModeData([]);
      setTransactionData([]);
      setTypeCheckData([]);
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
    ruleTypeData,
    workModeData,
    transactionData,
    typeCheckData,
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
    if (!interlockCatSelected[0]?.id) return;
    fetchDataInterlockByParent(interlockCatSelected[0]?.id);
  }, [interlockCatSelected]);

  useEffect(() => {
    if (!interlockSelected[0]?.id) return;
    fetchDataInterlockBy(interlockSelected[0]?.id);
  }, [interlockSelected]);

  useEffect(() => {
    onFetchDropdownData();
    onFetchPageInterlock();
  }, []);

  const handleRowAppendInterlock = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsInterlock, setGridDataInterlock, setNumRowsInterlock, setAddedRowsCategory, numRowsToAdd);
    },
    [colsInterlock, setGridDataInterlock, setNumRowsInterlock, setAddedRowsCategory, numRowsToAddCategory]
  );

  const handleRowAppendInterlockCat = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsInterlockCat, setGridData, setNumRows, setAddedRowsInterlockCat, numRowsToAdd);
    },
    [colsInterlockCat, setGridData, setNumRows, setAddedRowsInterlockCat, numRowsToAddInterlockCat]
  );

  const onClickDelete = useCallback(async () => {

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
      if (interlockCatSelected.length !== 0) {
        deleteInterlockCat(interlockCatSelected[0]?.id);
      }
      if (interlockSelected.length !== 0) {
        deleteInterlock(interlockSelected[0]?.id);
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
  }, [interlockCatSelected, interlockSelected, gridData, gridDataInterlock, formBasic, isAPISuccess]);

  const deleteInterlockCat = useCallback(
    async (id) => {
      let response = {};
      if (interlockCatSelected.length > 0) {
        const ids = interlockCatSelected.map((item) => item.id).filter((id) => id !== undefined);
        response = await deleteInterlockCat(ids);
      }

      if (!response.success) {
        notify({
          type: 'error',
          message: 'Lỗi',
          description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
        });
        return;
      } else {
        setGridData([]);
        setNumRows(0);

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
    [interlockCatSelected, gridData, numRows, formBasic, numRows]
  );

  const deleteInterlock = useCallback(
    async (id) => {
      let response = {};
      if (interlockSelected.length > 0) {
        const ids = interlockSelected.map((item) => item.id).filter((id) => id !== undefined);
        response = await deleteInterlock(ids);
      }

      if (!response.success) {
        notify({
          type: 'error',
          message: 'Lỗi',
          description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
        });
        return;
      } else {
        setGridDataInterlock([]);
        setNumRowsInterlock(0);

        const updatedData = gridDataInterlock.filter((row) => id !== row.id);
        setGridDataInterlock(updateIndexNo(updatedData));
        setNumRowsInterlock(updatedData.length);

        formBasic.resetFields();

        notify({
          type: 'success',
          message: 'Thành công',
          description: 'Xóa dữ liệu thành công!'
        });
      }
    },
    [interlockSelected, gridDataInterlock, numRowsInterlock, formBasic]
  );

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  const onClickCopy = () => {
    setInterlockId('');
  };

  const onClickResetAll = () => {
    formBasic.resetFields();

    setGridDataRuleEvent([]);
    setNumRowsRuleEvent(0);

    setGridDataInterlock([]);
    setNumRowsInterlock(0);

    setInterlockId('');
  };
  return (
    <>
      <div className="h-full mt-4">
        <AuDInterlockAction
          titlePage={'Cấu hình khóa liên động'}
          onClickDelete={onClickDelete}
          onClickSave={onClickSave}
          onClickReset={onClickResetAll}
          onClickCopy={onClickCopy}
          onClickSaveNewId={onClickSaveNewId}
        />
        <Splitter className="w-full h-full">
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
              <InterlockCatTable
                defaultCols={defaultColsInterlockCat}
                gridData={gridData}
                setGridData={setGridData}
                cols={colsInterlockCat}
                setCols={setColsInterlockCat}
                numRows={numRows}
                setNumRows={setNumRows}
                onVisibleRegionChanged={onVisibleRegionChanged}
                onCellClicked={onCellInterlockCatClicked}
                selection={selectionInterlockCat}
                setSelection={setSelectionInterlockCat}
                handleRowAppend={handleRowAppendInterlockCat}
                setEditedRows={setEditedRowsInterlockCat}
              />
            </div>
          </SplitterPanel>
          <SplitterPanel size={70} minSize={70}>
            <Splitter className="w-full h-full" layout="vertical">
              <SplitterPanel size={30} minSize={10}>
                <div className="bg-slate-50  h-full">
                  <InterlockTable
                    dataCategoryValue={dataCategoryValue}
                    defaultCols={defaultColsInterlock}
                    gridData={gridDataInterlock}
                    setGridData={setGridDataInterlock}
                    cols={colsInterlock}
                    setCols={setColsInterlock}
                    numRows={numRowsInterlock}
                    setNumRows={setNumRowsInterlock}
                    handleRowAppend={handleRowAppendInterlock}
                    setEditedRows={setEditedRowsInterlock}
                    selection={selectionInterlock}
                    setSelection={setSelectionInterlock}
                    onCellClicked={onCellInterlockClicked}
                    cellConfig={cellConfig}
                  />
                </div>
              </SplitterPanel>

              <SplitterPanel size={70} minSize={10}>
                <div className="bg-slate-50  h-full">
                  <InterlockQuery
                    formBasic={formBasic}
                    ruleTypeData={ruleTypeData}
                    workModeData={workModeData}
                    transactionData={transactionData}
                    typeCheckData={typeCheckData}
                    dataGroupDevice={dataGroupDevice}
                    sql={sqlQuery}
                    setSql={setSqlQuery}
                    message={messageError}
                    setMessage={setMessageError}
                    setEqpId={setEqpId}
                    setGroupDeviceId={setGroupDeviceId}
                    setTransactionId={setTransactionId}
                    setTypeCheckId={setTypeCheckId}
                    operation={operation}
                    setOperation={setOperation}
                    setOperationId={setOperationId}
                    setWorkModeId={setWorkModeId}
                    eqpName={eqpName}
                    setEqpName={setEqpName}
                  />
                </div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </div>

      {contextHolder}
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default ManageInterlock;
