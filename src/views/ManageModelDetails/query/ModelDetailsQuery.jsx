import React from 'react';
import ModelInfomationQuery from './ModelInfomationQuery';
import { Mode } from '@mui/icons-material';
import ModelRouteSet from './ModelRouteSet';
import ModelGroupCategory from './ModelGroupCategory';

const ModelDetailsQuery = () => {
    return (
        <div>
            <ModelInfomationQuery/>
            <ModelRouteSet/>
            <ModelGroupCategory/>
        </div>
    );
};

export default ModelDetailsQuery;