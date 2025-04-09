import { SearchOutlined } from '@mui/icons-material';
import { Button } from 'antd';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModelAction = () => {
    return (
        <div className="container mb-0">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModelAction;

