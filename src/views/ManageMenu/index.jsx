import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
// project import
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { CompactSelection, GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import RolesUsersMaster from './table/RoleMenuMaster';
import { onRowAppended } from 'utils/sheets/onRowAppended';
import { message, Spin } from 'antd';
import useDynamicFilter from 'utils/hooks/useDynamicFilter';
import { filterAndSelectColumns } from 'utils/sheets/filterUorA';
import { validateCheckColumns } from 'utils/sheets/validateColumns';
import { CreateByService } from 'services/ManageUsers/CreateByService';
import { UpdateByService } from 'services/ManageUsers/UpdateByService';
import { useNotify } from 'utils/hooks/onNotify';
import { useFullscreenLoading } from 'utils/hooks/useFullscreenLoading';
import { updateEditedRows } from 'utils/sheets/updateEditedRows';
import useConfirmDialog from 'utils/hooks/useConfirmDialog';
import { DeleteByService } from 'services/ManageUsers/DeleteByService';
import UsersAction from 'views/ManageUsers/action/UsersAction';
import RoleMenuMaster from './table/RoleMenuMaster';
import { SearchMenuBy } from 'services/ManageMenu/SearchMenuBy';
import { SearchBy } from 'services/ManageUsers/SearchBy';
import { SearchAuthoritiesBy } from 'services/ManageMenu/SearchAuthoritiesBy';


// ==============================|| MENU PAGE ||============================== //

const ManageMenu = ({ canCreate }) => {
  const { t } = useTranslation();
  const { notify, contextHolder } = useNotify();
  const { spinning, percent, showLoader, hideLoader } = useFullscreenLoading();
  const [isAPISuccess, setIsAPISuccess] = useState(true)
  const {showConfirm} = useConfirmDialog();

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
      title: t('Id'),
      id: 'id',
      kind: 'Text',
      readonly: true,
      width: 200,
      hasMenu: true,
      visible: false,
      icon: GridColumnIcon.HeaderRowID
    },
    {
      title: t('Vai trò'),
      id: 'name',
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
      title: t('Người tạo'),
      id: 'createdBy',
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
      title: t('Ngày tạo'),
      id: 'createdDate',
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
      title: t('Ngày chỉnh sửa'),
      id: 'modifiedDate',
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
      title: t('Người chỉnh sửa'),
      id: 'modifiedBy',
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

  const [cols, setCols] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_ROLES_LIST',
      defaultCols.filter((col) => col.visible)
    )
  );
  const [gridData, setGridData] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numRowsToAddRoles, setNumRowsToAddRoles] = useState(null);

  const [editedRowsRoles, setEditedRowsRoles] = useState([]);
  const [addedRowsRoles, setAddedRowsRoles] = useState([]);

  const handleRowAppendRoles = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(cols, setGridData, setNumRows, setAddedRowsRoles, numRowsToAdd, setNumRowsToAddRoles);
    },
    [cols, setGridData, setNumRows, setAddedRowsRoles, numRowsToAddRoles]
  );

  const defaultColsMenu = useMemo(() => [
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
      title: t('id'),
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
      title: t('Khóa'),
      id: 'key',
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
      title: t('Biểu tượng'),
      id: 'icon',
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
      title: t('Tên menu'),
      id: 'label',
      kind: 'text',
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
      title: t('Ngày tạo'),
      id: 'createdDate',
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
      title: t('Người tạo'),
      id: 'createdBy',
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
      title: t('Ngày thay đổi'),
      id: 'modifiedDate',
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
      title: t('Người thay đổi'),
      id: 'modifiedBy',
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
      title: t('Có phải là menu con'),
      id: 'isChildren',
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
      title: t('Khóa menu cha'),
      id: 'keyParent',
      kind: 'Custom',
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
      title: t('Component'),
      id: 'component',
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
      title: t('Quyền hạn'),
      id: 'permission',
      kind: 'Custom',
      readonly: false,
      width: 200,
      hasMenu: true,
      visible: true,
      icon: GridColumnIcon.HeaderRowID,
      trailingRowOptions: {
        disabled: true
      }
    },

    
  ]);

  const [colsMenu, setColsMenu] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_MENU',
      defaultColsMenu.filter((col) => col.visible)
    )
  );
  const [gridDataMenu, setGridDataMenu] = useState([]);
  const [numRowsMenu, setNumRowsMenu] = useState(0);
  const [numRowsToAddMenu, setNumRowsToAddMenu] = useState(null);
  const [addedRowsMenu, setAddedRowsMenu] = useState([]);
  const [editedRowsMenu, setEditedRowsMenu] = useState([]);

  const handleRowAppendMenu = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsMenu, setGridDataMenu, setNumRowsMenu, setAddedRowsMenu, numRowsToAdd, numRowsToAddMenu);
    },
    [colsMenu, setGridDataMenu, setNumRowsMenu, setAddedRowsMenu, numRowsToAddMenu]
  );

  const defaultColsAuthor = useMemo(() => [
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
      title: t('id'),
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
      title: t('Mã phân quyền'),
      id: 'code',
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
      title: t('Tên phân quyền'),
      id: 'name',
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
      title: t('Ngày tạo'),
      id: 'createDate',
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
      title: t('Người tạo'),
      id: 'createdBy',
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
      title: t('Ngày thay đổi'),
      id: 'modifyDate',
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
      title: t('Người thay đổi'),
      id: 'modifiedBy',
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

    
  ]);

  const [colsAuthor, setColsAuthor] = useState(() =>
    loadFromLocalStorageSheet(
      'S_ERP_COLS_PAGE_AUTHOR',
      defaultColsAuthor.filter((col) => col.visible)
    )
  );
  const [gridDataAuthor, setGridDataAuthor] = useState([]);
  const [numRowsAuthor, setNumRowsAuthor] = useState(0);
  const [numRowsToAddAuthor, setNumRowsToAddAuthor] = useState(null);
  const [addedRowsAuthor, setAddedRowsAuthor] = useState([]);
  const [editedRowsAuthor, setEditedRowsAuthor] = useState([]);

  const handleRowAppendAuthor = useCallback(
    (numRowsToAdd) => {
      if (canCreate === false) {
        message.warning('Bạn không có quyền thêm dữ liệu');
        return;
      }
      onRowAppended(colsAuthor, setGridDataAuthor, setNumRowsAuthor, setAddedRowsAuthor, numRowsToAdd, numRowsToAddAuthor);
    },
    [colsAuthor, setGridDataAuthor, setNumRowsAuthor, setAddedRowsAuthor, numRowsToAddAuthor]
  );

  const fieldsToTrack = ['Select', 'BizUnitName', 'BizUnit'];

  const { filterValidEntries, findLastEntry, findMissingIds } = useDynamicFilter(gridDataMenu, fieldsToTrack);

  const [count, setCount] = useState(0);
  const lastWordEntryRef = useRef(null);
  const [isSent, setIsSent] = useState(false);

  //   Load
  const fetchDataRole = useCallback(async () => {
      if (!isAPISuccess) return
      setIsAPISuccess(false)
      try {
  
        const data = [
          {
            pageIndex: 1,
            pageSize: 50,
            keywork: '',
          },
        ]
  
        const response = await SearchBy(data)
        const fetchedData = response.data || []
        setGridData(fetchedData)
        setNumRows(fetchedData.length)
      } catch (error) {
        setGridData([])
        setNumRows(0)
      } finally {
        setIsAPISuccess(true)
      }
    }, [
      
      
    ]);

    const fetchDataMenu = useCallback(async () => {
      if (!isAPISuccess) return
      setIsAPISuccess(false)
      try {
  
        const data = [
          {
            pageIndex: 1,
            pageSize: 50,
            keywork: '',
          },
        ]
  
        const response = await SearchMenuBy(data)
        const fetchedData = response.data || []
        setGridDataMenu(fetchedData)
        setNumRowsMenu(fetchedData.length)
      } catch (error) {
        setGridDataMenu([])
        setNumRowsMenu(0)
      } finally {
        setIsAPISuccess(true)
      }
    }, [
      
      
    ]);

    const fetchDataAuthor = useCallback(async () => {
      if (!isAPISuccess) return
      setIsAPISuccess(false)
      try {
  
        const data = [
          {
            pageIndex: 1,
            pageSize: 50,
            keywork: '',
          },
        ]
  
        const response = await SearchAuthoritiesBy(data)
        const fetchedData = response.data || []
        setGridDataAuthor(fetchedData)
        setNumRowsAuthor(fetchedData.length)
      } catch (error) {
        setGridDataAuthor([])
        setNumRowsAuthor(0)
      } finally {
        setIsAPISuccess(true)
      }
    }, [
      
      
    ]);

  useEffect(() => {
    
    fetchDataRole()
    fetchDataMenu()
    fetchDataAuthor()
  },[] );

  //   Action
  const onClickSave = useCallback(async () => {
    showLoader();
    const requiredColumns = ['userName', 'password'];

    const commonColumnsRoles = ['id', 'name', 'createdBy', 'createdDate', 'modifiedDate', 'modifiedBy'];

    const commonColumns = [
      'id',
      'username',
      'email',
      'password',
      'createdDate',
      'createdBy',
      'modifiedDate',
      'modifiedBy',
      'accountNonExpired',
      'accountNonLocked',
      'active',
      'credentialsNonExpired',
      'justCreated',
      'lastLoginFalures',
      'lastLoginTime',
      'totalLoginFailures'
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

    const resulU = filterAndSelectColumns(gridDataMenu, commonColumns, 'U');
    const resulA = filterAndSelectColumns(gridDataMenu, commonColumns, 'A');

    const resulURoles = filterAndSelectColumns(gridData, commonColumnsRoles, 'U');
    const resulARoles = filterAndSelectColumns(gridData, commonColumnsRoles, 'A');
    const validationMessage = validateCheckColumns([...resulU, ...resulA], [...commonColumns, ...commonColumns], requiredColumns);

    if (validationMessage !== true) {
      message.warning(validationMessage);
      return;
    }

    if (isSent) return;
    setIsSent(true);

    if (resulA.length === 0) {
      hideLoader();
      notify({
        type: 'error',
        message: 'Lỗi',
        description: 'Không có dữ liệu để lưu!'
      });
      setIsSent(false);
      return;
    }

    try {
      const promises = [];
      if (resulA.length > 0) promises.push(CreateByService(resulARoles, resulA));
      if (resulU.length > 0) promises.push(UpdateByService(resulARoles, resulU));

      const results = await Promise.all(promises);

      const updateGridData = (newData) => {
        setGridData((prevGridData) =>
          prevGridData.map((item) => {
            const matchingData = newData.find((data) => data.IDX_NO === item.IdxNo);
            return matchingData ? { ...matchingData, IdxNo: matchingData.IDX_NO } : item;
          })
        );
      };

      results.forEach((result, index) => {
        if (result?.success && result.data?.data) {
          const newData = result.data.data;
          updateGridData(newData);
          setEditedRowsMenu([]);
          hideLoader();
          notify({
            type: 'error',
            message: 'Thành công',
            description: index === 0 ? 'Thêm mới thành công' : 'Cập nhật thành công'
          });
        } else {
          hideLoader();
          notify({
            type: 'error',
            message: 'Lỗi',
            description: result?.message || 'Đã có lỗi xảy ra, thử lại'
          });
        }
      });
    } catch (error) {
      console.error(error);
      notify({
        type: 'error',
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, thử lại'
      });
    } finally {
      setIsSent(false);
      hideLoader();
    }
  }, [editedRowsMenu]);

  const onClickDelete = useCallback(() => {
    showConfirm({
      title: 'Xác nhận xóa bản ghi?',
      content: '',
      onOk: async () => {
        return handleDelete();
      }
    });
  }, []);
  

  const handleDelete = useCallback(async () => {
    if (selectedUser.length === 0) {
      notify({
        type: 'error',
        message: 'Lỗi',
        description: 'Không có dữ liệu để xóa!'
      });
      setIsSent(false);
      throw new Error('Không có dữ liệu');
    }
  
    try {
      const promises = [];
      if (selectedUser.length > 0)
        promises.push(DeleteByService(selectedUser, selectedUser));
  
      const results = await Promise.all(promises);
  
      results.forEach((result) => {
        if (result?.success && result.data?.data) {
          notify({
            type: 'success',
            message: 'Thành công',
            description: 'Xóa thành công'
          });
        } else {
          notify({
            type: 'error',
            message: 'Lỗi',
            description: result?.message || 'Đã có lỗi xảy ra, thử lại'
          });
        }
      });
    } catch (error) {
      console.error(error);
      notify({
        type: 'error',
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, thử lại'
      });
      throw error;
    } finally {
      setIsSent(false);
    }
  }, []);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const onClickImport = async (file) => {
    if (!file) return false;
  
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
    const rowData = XLSX.utils.sheet_to_json(worksheet);
  
    if (rowData.length === 0) return false;
  
    const colHeaders = Object.keys(rowData[0]);
    setColumns(
      colHeaders.map((header, index) => ({
        title: header || `Column ${index + 1}`,
        id: String(index),
      }))
    );
  
  
    const dataAddStatus = rowData.map((row) => {
      return {
        ...row,
        Status: 'A',
      };
    })
    setGridDataMenu(dataAddStatus);
    setNumRowsMenu(dataAddStatus.length);
  
    return false;
  };
  

  const [isMinusClicked, setIsMinusClicked] = useState(false)
  const [lastClickedCell, setLastClickedCell] = useState(null)
  const [clickedRowData, setClickedRowData] = useState(null)

  const onCellClicked = useCallback(
    (cell, event) => {
      let rowIndex

      if (cell[0] === -1) {
        rowIndex = cell[1]
        setIsMinusClicked(true)
      } else {
        rowIndex = cell[1]
        setIsMinusClicked(false)
      }

      if (
        lastClickedCell &&
        lastClickedCell[0] === cell[0] &&
        lastClickedCell[1] === cell[1]
      ) {
        setLastClickedCell(null)
        setClickedRowData(null)
        return
      }

      if (rowIndex >= 0 && rowIndex < gridData.length) {
        const rowData = gridData[rowIndex]

        const data =
        {
          roleCode: rowData.name,
          page: 0,
          size: 10

        }

        fetchMenusByRoles(data)
        setClickedRowData(rowData)
        
      }
    },
    [gridData],
  )

  const fetchMenusByRoles = async (data) => {
    try {
      const result = await SearchMenuBy(data)
      if (result?.success && result?.data) {
        setGridDataMenu(result.data)
        setNumRowsMenu(result.data.length)
      } else {
        notify({
          type: 'error',
          message: 'Lỗi',
          description: result?.message || 'Đã có lỗi xảy ra, thử lại'
        });
      }
    } catch (error) {
      console.error(error);
      notify({
        type: 'error',
        message: 'Lỗi',
        description: 'Đã có lỗi xảy ra, thử lại'
      });
    }
  }

  const getSelectedRows = () => {
    const selectedRows = selection.rows.items
    let rows = []
    selectedRows.forEach((range) => {
      const start = range[0]
      const end = range[1] - 1

      for (let i = start; i <= end; i++) {
        if (gridData[i]) {
          rows.push(gridData[i])

          
          setGridData((prev) => {
            const newData = [...prev]
            const product = gridData[i]
            
            if(product.UMQCTitleSeq){
              product['Status'] = 'U'
            }else{
              product['Status'] = 'A'
            }
            
      
            setEditedRowsRoles((prevEditedRows) =>
              updateEditedRows(prevEditedRows, product, newData, ''),
            )
      
            return newData
          })
        }
      }
    })

    return rows
  }

  const [isMinusClickedUser, setIsMinusClickedUser] = useState(false)
  const [lastClickedCellUser, setLastClickedCellUser] = useState(null)
  const [clickedRowDataUser, setClickedRowDataUser] = useState(null)
  const [selectedUser, setSelectUser] = useState([])

  const [selectionUser, setSelectionUser] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  })
  const onCellClickedMenu = useCallback(
    (cell, event) => {
      let rowIndex

      if (cell[0] === -1) {
        rowIndex = cell[1]
        setIsMinusClickedUser(true)
      } else {
        rowIndex = cell[1]
        setIsMinusClickedUser(false)
      }

      if (
        lastClickedCell &&
        lastClickedCell[0] === cell[0] &&
        lastClickedCell[1] === cell[1]
      ) {
        setLastClickedCellUser(null)
        setClickedRowDataUser(null)
        return
      }

      if (rowIndex >= 0 && rowIndex < gridDataMenu.length) {
        const rowData = gridDataMenu[rowIndex]

        const data = [
          {
            id: rowData.ItemSeq,
            roleName: rowData.ItemNo,
            
          },
        ]
        setSelectUser(getSelectedRowsUsers())
        
      }
    },
    [gridData],
  )

  const getSelectedRowsUsers = () => {
    const selectedRows = selectionUser.rows.items
    let rows = []
    selectedRows.forEach((range) => {
      const start = range[0]
      const end = range[1] - 1

      for (let i = start; i <= end; i++) {
        if (gridData[i]) {
          rows.push(gridDataMenu[i])

          setGridDataMenu((prev) => {
            const newData = [...prev]
            const product = gridDataMenu[i]
            
            if(product.id){
              product['Status'] = 'U'
            }else{
              product['Status'] = 'A'
            }

            setEditedRowsMenu((prevEditedRows) =>
              updateEditedRows(prevEditedRows, product, newData, ''),
            )
      
            return newData
          })
        }
      }
    })

    return rows
  }

  const [isMinusClickedAuthor, setIsMinusClickedAuthor] = useState(false)
  const [lastClickedCellAuthor, setLastClickedCellAuthor] = useState(null)
  const [clickedRowDataAuthor, setClickedRowDataAuthor] = useState(null)
  const [selectedAuthor, setSelectAuthor] = useState([])

  const [selectionAuthor, setSelectionAuthor] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
  })

  const onCellClickedAuthor = useCallback(
    (cell, event) => {
      let rowIndex

      if (cell[0] === -1) {
        rowIndex = cell[1]
        setIsMinusClickedAuthor(true)
      } else {
        rowIndex = cell[1]
        setIsMinusClickedAuthor(false)
      }

      if (
        lastClickedCellAuthor &&
        lastClickedCellAuthor[0] === cell[0] &&
        lastClickedCellAuthor[1] === cell[1]
      ) {
        setLastClickedCellAuthor(null)
        setClickedRowDataAuthor(null)
        return
      }

      if (rowIndex >= 0 && rowIndex < gridDataAuthor.length) {
        const rowData = gridDataAuthor[rowIndex]

        const data = [
          {
            id: rowData.key,
            roleName: rowData.ItemNo,
            
          },
        ]
        selectedAuthor(getSelectedRowsAuthor())
        
      }
    },
    [gridDataAuthor],
  )

  const getSelectedRowsAuthor = () => {
    const selectedRows = selectionAuthor.rows.items
    let rows = []
    selectedRows.forEach((range) => {
      const start = range[0]
      const end = range[1] - 1

      for (let i = start; i <= end; i++) {
        if (gridData[i]) {
          rows.push(gridDataAuthor[i])

          setGridDataMenu((prev) => {
            const newData = [...prev]
            const product = gridDataAuthor[i]
            
            if(product.id){
              product['Status'] = 'U'
            }else{
              product['Status'] = 'A'
            }

            setEditedRowsMenu((prevEditedRows) =>
              updateEditedRows(prevEditedRows, product, newData, ''),
            )
      
            return newData
          })
        }
      }
    })

    return rows
  }

  return (
    <>
      <div className="h-full pt-4">
        <UsersAction 
        title={'Đăng ký menu'} 
        onClickSave={onClickSave} 
        onClickDelete = {onClickDelete}
        onClickImport = {onClickImport}
        />
        <RoleMenuMaster
          defaultCols={defaultCols}
          cols={cols}
          setCols={setCols}
          gridData={gridData}
          setGridData={setGridData}
          numRows={numRows}
          setNumRows={setNumRows}
          handleRowAppendRoles={handleRowAppendRoles}
          setEditedRowsRoles={setEditedRowsRoles}
          onCellClicked={onCellClicked}

          defaultcolsMenu={defaultColsMenu}
          gridDataMenu={gridDataMenu}
          setGridDataMenu={setGridDataMenu}
          colsMenu={colsMenu}
          setColsMenu={setColsMenu}
          numRowsMenu={numRowsMenu}
          setNumRowsMenu={setNumRowsMenu}
          handleRowAppendMenu={handleRowAppendMenu}
          setEditedRowsMenu={setEditedRowsMenu}
          onCellClickedMenu = {onCellClickedMenu}

          defaultColsAuthor={defaultColsAuthor}
          gridDataAuthor={gridDataAuthor}
          setGridDataAuthor={setGridDataAuthor}
          colsAuthor={colsAuthor}
          setColsAuthor={setColsAuthor}
          numRowsAuthor={numRowsAuthor}
          setNumRowsAuthor={setNumRowsAuthor}
          handleRowAppendAuthor={handleRowAppendAuthor}
          setEditedRowsAuthor={setEditedRowsAuthor}
          onCellClickedAuthor = {onCellClickedAuthor}
        />
      </div>
      {contextHolder}
      <Spin spinning={spinning} percent={percent} fullscreen />
    </>
  );
};

export default ManageMenu;
