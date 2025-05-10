import React, { useMemo, useState } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter'
import { GridColumnIcon } from '@glideapps/glide-data-grid';
import { useTranslation } from 'react-i18next';
import { loadFromLocalStorageSheet } from 'utils/local-storage/column';
import { Typography } from 'antd';
import RouteTable from 'views/ManageModelDetails/table/RouteTable';
import ModelRouteDetailsTable from 'views/ManageModelDetails/table/ModelRouteDetailsTable';
import EquipmentTable from '../table/EquipmentTable';
import OperationEquipmentsTable from '../table/OperationEquipmentsTable';

const OperationUseEQPQuery = ({
    defaultColsEqp,
    gridDataEqp,
    setGridDataEqp,
    colsEqp,
    setColsEqp,
    numRowsEqp,
    setNumRowsEqp,

    defaultColsOPEqp,
    gridDataOPEqp,
    setGridDataOPEqp,
    colsOPEqp,
    setColsOPEqp,
    numRowsOPEqp,
    setNumRowsOPEqp,

}) => {
    const { t } = useTranslation();

    const onChange = value => {
        console.log(`selected ${value}`);
    };
    const onSearch = value => {
        console.log('search:', value);
    };

    


    return (
        <div className="bg-slate-50 rounded-md overflow-auto mb-2 ">
            <Typography.Title className="border-b-1 uppercase border-gray-400 m-2" style={{ fontSize: 'medium', color: '#6b7280' }}>
                Đăng ký thông tin thiết bị áp dụng
            </Typography.Title>
            <div className="bg-slate-50 rounded-md h-[500px]  ">

                <Splitter className="w-full h-full mb-0 pb-0">
                    <SplitterPanel size={20} minSize={10}>
                        <EquipmentTable
                            defaultCols={defaultColsEqp}
                            gridData={gridDataEqp}
                            setGridData={setGridDataEqp}
                            cols={colsEqp}
                            setCols={setColsEqp}
                            numRows={numRowsEqp}
                            setNumRows={setNumRowsEqp}
                        />
                    </SplitterPanel>

                    <SplitterPanel size={25} minSize={10}>
                        <OperationEquipmentsTable
                            defaultCols={defaultColsOPEqp}
                            gridData={gridDataOPEqp}
                            setGridData={setGridDataOPEqp}
                            cols={colsOPEqp}
                            setCols={setColsOPEqp}
                            numRows={numRowsOPEqp}
                            setNumRows={setNumRowsOPEqp}
                        />
                    </SplitterPanel>
                    
                </Splitter>
            </div>
        </div>



    );
};

export default OperationUseEQPQuery;