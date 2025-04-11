import { SearchOutlined } from '@mui/icons-material';
import { Button, Input, Tooltip } from 'antd';
import React from 'react';

import { FilterOutlined } from '@ant-design/icons';

const onSearch = (value) => {
    console.log(value);
};

const ModelAction = () => {
    return (
        <div className="col-auto d-flex justify-content-end align-items-center gap-2 mt-4 pt-2">

            <Input
                placeholder="Search"
                allowClear
                onSearch={onSearch}
                style={{ width: 400 }}
                enterButton
            />
            <Tooltip title="search">
                <Button type="primary"  icon={<FilterOutlined />} />
            </Tooltip>
            <Button type="primary" icon={<SearchOutlined />}>
                Search
            </Button>


        </div>
    );
};

export default ModelAction;

