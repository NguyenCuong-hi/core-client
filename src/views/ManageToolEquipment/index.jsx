import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { CompactSelection, GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { message, Spin } from 'antd';

import { useFullscreenLoading } from 'utils/hooks/useFullscreenLoading';
import { useNotify } from 'utils/hooks/onNotify';
import { useSelector } from 'react-redux';
import useDynamicFilter from 'utils/hooks/useDynamicFilter';
import { filterAndSelectColumns } from 'utils/sheets/filterUorA';

import { SearchCategory } from 'services/ManageCategorySys/SearchCategory';
import { eventSearchBy } from 'services/EventManage/EventSearchBy';
import { updateIndexNo } from 'utils/sheets/updateIndexNo';

import ToolDetailsTable from './table/ToolDetailsTable';
import AuDToolDetailAction from './action/AuDToolDetailsAction';
import { toolDetailsSearchBy } from 'services/ToolManage/ToolDetailsSearchBy';
import { deleteToolDetailsByListId } from 'services/ToolManage/DeleteToolDetails';
import { CreateToolDetailListByService } from 'services/ToolManage/CreateToolDetailListByService';
import { toolSearchBy } from 'services/ToolManage/ToolSearchBy';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageToolEquipment = ({ canCreate, canEdit, canDelete, canView }) => {
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

  const [addedRows, setAddedRows] = useState([]);
  const [numRowsToAdd, setNumRowsToAdd] = useState(null);
  const [editedRows, setEditedRows] = useState([]);

  const [selected, setSelected] = useState([]);

  const [dataModel, setDataModel] = useState([]);
  const [dataTool, setDataTool] = useState([]);
  const [dataStep, setDataStep] = useState([]);
  const [dataUnit, setDataUnit] = useState([]);
  const [dataReworkTable, setDataReworkTable] = useState([]);
  const [dataBonusTable, setDataBonusTable] = useState([]);
  const [inParameterData, setInParameterData] = useState([]);
  const [outParameterData, setOutParameterData] = useState([]);
  const cellConfig = {
    toolCode: {
      kind: 'cells-tool',
      allowedValues: dataTool,
      setCacheData: setDataTool
    },
    modelCode: {
      kind: 'cells-code-sys',
      allowedValues: dataModel,
      setCacheData: setDataModel
    }
  };

  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);

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
      title: t('Mã phụ kiện'),
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
      title: t('Mã danh mục phụ kiện'),
      id: 'toolId',
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
      title: t('Mã danh mục phụ kiện'),
      id: 'toolCode',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      },
      themeOverride: {
        textHeader: '#DD1144',
        bgIconHeader: '#DD1144',
        fontFamily: ''
      }
    },

    {
      title: t('Model'),
      id: 'modelId',
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
      title: t('Model'),
      id: 'modelCode',
      kind: 'Custom',
      readonly: false,
      width: 250,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      },
      themeOverride: {
        textHeader: '#DD1144',
        bgIconHeader: '#DD1144',
        fontFamily: ''
      }
    },

    {
      title: t('Mã phụ kiện'),
      id: 'toolDetailsCode',
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
      title: t('Danh mục'),
      id: 'toolCategory',
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
    },

    {
      title: t('Đơn vị'),
      id: 'toolUnit',
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
      title: t('Nhà cung cấp'),
      id: 'vendor',
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
      title: t('Ngày đăng ký'),
      id: 'dateRegister',
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
      title: t('Kiểm tra IQC'),
      id: 'isIQC',
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
      title: t('Áp dụng INTERLOCK'),
      id: 'isInterlock',
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
      title: t('Sử dụng PDA'),
      id: 'isChangePDA',
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
      title: t('Kiểm tra hết hạn'),
      id: 'isCheckPeriod',
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
      title: t('Chu kỳ thay thế (ngày)'),
      id: 'exchangeCycleType',
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
      title: t('Chu kì hết hạn'),
      id: 'exchangePeriod',
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
      title: t('Cảnh báo hết hạn'),
      id: 'alarmPeriod',
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

  const [cols, setcols] = useState(() =>
    loadFromLocalStorageSheet(
      'S_DETAIL_TOOL',
      defaultCols.filter((col) => col.visible)
    )
  );

  const [isSent, setIsSent] = useState(false);
  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const fieldsToTrack = ['IdxNo'];
  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridData, fieldsToTrack);

  const dataCategoryValue = [
    { MinorName: '8080', Value: 1 },
    { MinorName: '8000', Value: 2 },
    { MinorName: '3000', Value: 3 }
  ];

  const [checkPageA, setCheckPageA] = useState(false);
  const [current, setCurrent] = useState('1');

  const onClickSave = useCallback(async () => {
    const columnsCategory = [
      'IdxNo',
      'id',
      'toolId',
      'modelId',
      'toolCode',
      'modelCode',
      'toolDetailsCode',
      'toolCategory',
      'description',
      'toolUnit',
      'vendor',
      'dateRegister',
      'isIQC',
      'isInterlock',
      'isChangePDA',
      'isCheckPeriod',
      'exchangeCycleType',
      'exchangePeriod',
      'alarmPeriod',
      'toolName',
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

      const dataCategoryA = filterAndSelectColumns(gridData, columnsCategory, 'A').map((row) => ({
        ...row,
        Status: 'A',
        id: row.id || ''
      }));

      const dataCategoryU = filterAndSelectColumns(gridData, columnsCategory, 'U').map((row) => ({
        ...row,
        Status: 'U',
        id: row.id || ''
      }));

      const dto = [...dataCategoryA, ...dataCategoryU];

      try {
        const result = await CreateToolDetailListByService(dto);

        if (result.success) {
          const data = result?.data;
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Cập nhật thành công!'
          });

          setGridData((prev) => {
            const updated = prev.map((item) => {
              const found = data.find((x) => x.id === item.id);

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
  }, [gridData, isAPISuccess]);

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
      controllers.current.onFetchTool = null;
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

  const onCellClicked = useCallback(
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
          const isSelected = selection.rows.hasIndex(rowIndex);

          let newSelected;
          if (isSelected) {
            newSelected = selection.rows.remove(rowIndex);
            setSelected(getSelectedRowsData(selection, gridData));
          } else {
            newSelected = selection.rows.add(rowIndex);
            setSelected([]);
          }
        }
      }
    },
    [gridData, getSelectedRowsData, selected]
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
      const data = {
        Keyword: keyword,
        PageIndex: pageIndex,
        PageSize: pageSize
      };
      const [dataTool, dataModel] = await Promise.all([
        toolSearchBy(data),
        SearchCategory(1, 'fmOperationRegister', '', '', pageIndex, pageSize, keyword)
      ]);

      setDataTool(dataTool.data);
      setDataModel(dataModel.data);
    } catch (error) {
      setDataModel([]);
      setDataTool([]);
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
  }, [loadingBarRef, dataModel, dataTool, keyword, pageIndex, pageSize, isAPISuccess]);

  useEffect(() => {
    onFetchDropdownData();
    onFetchTool();
  }, []);

  const handleRowAppend = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(cols, setGridData, setNumRows, setAddedRows, numRowsToAdd);
    },
    [cols, setGridData, setNumRows, setAddedRows, numRowsToAdd]
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
      if (selected.length > 0) {
        deleteTool();
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
  }, [selected, gridData, isAPISuccess]);

  const deleteTool = useCallback(async () => {
    let response = {};
    if (selected.length > 0) {
      const ids = selected.map((item) => item.id);
      response = await deleteToolDetailsByListId(ids);
    }

    if (!response.success) {
      notify({
        type: 'error',
        message: 'Lỗi',
        description: response.data.message || 'Không thể xóa dữ liệu. Vui lòng thử lại sau.'
      });
      return;
    } else {
      const ids = selected.map((item) => item.id).filter((id) => id !== undefined);
      const updatedData = gridData.filter((row) => !ids.includes(row.id));
      setGridData(updateIndexNo(updatedData));
      setNumRows(updatedData.length);

      notify({
        type: 'success',
        message: 'Thành công',
        description: 'Xóa dữ liệu thành công!'
      });
    }
  }, [gridData, selected, numRows]);

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  const onClickResetAll = () => {
    setGridData([]);
    setNumRows(0);
  };

  return (
    <>
      <div className="h-full mt-4">
        <AuDToolDetailAction
          titlePage={'Danh sách phụ kiện'}
          onClickDelete={onClickDelete}
          onClickSave={onClickSave}
          onClickReset={onClickResetAll}
        />
        <div className="bg-slate-50  h-[calc(100vh-90px)]">
          <ToolDetailsTable
            dataTool={dataTool}
            dataModel={dataModel}
            dataCategoryValue={dataCategoryValue}
            defaultCols={defaultCols}
            gridData={gridData}
            setGridData={setGridData}
            cols={cols}
            setCols={setcols}
            numRows={numRows}
            setNumRows={setNumRows}
            handleRowAppend={handleRowAppend}
            setEditedRows={setEditedRows}
            selection={selection}
            setSelection={setSelection}
            onCellClicked={onCellClicked}
            cellConfig={cellConfig}
          />
        </div>
      </div>

      {contextHolder}
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default ManageToolEquipment;
