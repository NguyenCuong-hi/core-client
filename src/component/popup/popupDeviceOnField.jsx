import { CompactSelection, DataEditor, GridCellKind } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import { Button } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloseOutlined, SearchOutlined } from '@ant-design/icons';

import { searchEquipmentBy } from 'services/EquipmentManage/SearchBy';
import useOnFill from 'utils/hooks/onFillHook';

function PopUpDeviceOnField({
  data,
  nameCodeHelp,
  modalVisible,
  setModalVisible,
  selectionData,
  setSelectionData,

  eqpName,
  setEqpName,
  setId
}) {
  const { t } = useTranslation();
  const [hoverRow, setHoverRow] = useState(null);

  const gridRef = useRef(null);
  const dropdownRef = useRef(null);
  const [numRows, setNumRows] = useState(0);
  const [searchSh, setSearchSh] = useState('');

  const [selection, setSelection] = useState({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const defaultCols = [
    {
      title: t(''),
      id: 'id',
      kind: 'Text',
      readonly: true,
      width: 150,
      visible: false,
    },
    {
      title: t('Mã thiết bị'),
      id: 'eqpCode',
      kind: 'Text',
      readonly: true,
      width: 200
    },
    {
      title: t('Tên thiết bị'),
      id: 'eqpName',
      kind: 'Text',
      readonly: true,
      width: 200
    },
    {
      title: t('Mô tả'),
      id: 'description',
      kind: 'Text',
      readonly: true,
      width: 200
    }
  ];
  const [cols, setCols] = useState(defaultCols);
  const [filteredData, setFilteredData] = useState([]);
  const onFill = useOnFill(filteredData, cols);

  // useEffect(() => {
  //   setFilteredData(data || []);
  // }, [data]);

  const onColumnResize = useCallback(
    (column, newSize) => {
      const index = cols.indexOf(column);
      if (index !== -1) {
        const newCol = {
          ...column,
          width: newSize
        };
        const newCols = [...cols];
        newCols.splice(index, 1, newCol);
        setCols(newCols);
      }
    },
    [cols]
  );

  const getContent = useCallback(
    ([col, row]) => {
      const perRow = filteredData[row] || {};
      const column = cols[col];
      const columnKey = column?.id || '';
      const value = perRow[columnKey] || '';
      const boundingBox = document.body.getBoundingClientRect();

      return {
        kind: GridCellKind.Text,
        data: value,
        displayData: String(value),
        readonly: column?.readonly || false,
        allowOverlay: true
      };
    },
    [filteredData, cols]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchSh(value);
    if (value.trim() === '' || value === null) {
      setEqpName('');
      setFilteredData(data);
    } else {
      const filtered = filteredData.filter((item) =>
        item.eqpCode.toLowerCase().includes(value.toLowerCase()) ||
        item.eqpName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setModalVisible(true);
  };

  useEffect(() => {
    if (eqpName) {
      setSearchSh(eqpName);
    }
  }, [eqpName]);

  const handleCellClick = ([col, row]) => {
    if (filteredData[row]) {
      const selectedUserName = filteredData[row].eqpName;

      setEqpName(selectedUserName);
      setId(filteredData[row].id);
      setSearchSh(selectedUserName);
      setSelectionData(filteredData[row]);
      setModalVisible(false);
    }
  };

  const onItemHovered = useCallback((args) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== 'cell' ? undefined : row);
  }, []);

  const fetchCodeHelpDataSearch = useCallback(async () => {
    try {
      const data = {
        KeyWord: searchSh,
        PageIndex: 1,
        PageSize: 100
      };

      const [dataUser] = await Promise.all([searchEquipmentBy(data)]);
      const fetchedData = dataUser.data || [];
      setFilteredData(fetchedData || []);
      setNumRows(fetchedData?.length || 0);
    } catch (error) {}
  }, [searchSh]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchCodeHelpDataSearch();
    }
    if (e.key === 'Enter' && filteredData?.length > 0) {
      const selectedUser = filteredData[0];

      setEqpName(selectedUser?.eqpName);
      setId(selectedUser?.EmpID);
      setSearchSh(selectedUser?.eqpName);
      setModalVisible(false);
    }
    if (e.key === 'Escape') {
      setModalVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchCodeHelpDataSearch();
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="  fixed z-50 w-auto bg-white border border-gray-300 rounded-lg top-[25vh] left-[50%] transform -translate-x-1/2"
    >
      <div className="flex items-center justify-between p-1">
        <h5 className="text-sm font-semibold flex items-center gap-2 p-2 text-blue-600 uppercase">{nameCodeHelp}</h5>
        <Button type="text" icon={<CloseOutlined />} onClick={() => setModalVisible(false)} />
      </div>
      <div className="p-2 border-b border-t border-gray-100">
        <div className="w-full flex gap-2">
          <SearchOutlined className="opacity-80 size-5" />
          <input
            value={searchSh}
            onChange={handleSearch}
            onFocus={() => setModalVisible(true)}
            onKeyDown={onKeyDown}
            highlight={true}
            autoFocus={true}
            className="h-full w-full border-none focus:outline-none hover:border-none bg-inherit"
          />
        </div>
      </div>
      <DataEditor
        ref={gridRef}
        width={950}
        height={500}
        onFill={onFill}
        className="cursor-pointer rounded-md"
        rows={numRows || 0}
        columns={cols}
        gridSelection={selection}
        onGridSelectionChange={setSelection}
        getCellContent={getContent}
        getRowThemeOverride={(rowIndex) => {
          if (rowIndex === hoverRow) {
            return {
              bgCell: '#f7f7f7',
              bgCellMedium: '#f0f0f0'
            };
          }
          return undefined;
        }}
        fillHandle={true}
        smoothScrollY={true}
        smoothScrollX={true}
        isDraggable={false}
        onItemHovered={onItemHovered}
        onCellClicked={handleCellClick}
        freezeColumns="0"
        onColumnResize={onColumnResize}
        rowMarkers={('checkbox-visible', 'both')}
        rowSelect="single"
      />
    </div>
  );
}

export default PopUpDeviceOnField;
