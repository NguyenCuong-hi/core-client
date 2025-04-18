import React from 'react';
import ModelInfomationQuery from './ModelInfomationQuery';
import ModelRouteSet from './ModelRouteSet';
import ModelGroupCategory from './ModelGroupCategory';

const ModelDetailsQuery = () => {
    return (
        <div className="">
            <ModelInfomationQuery/>
            <ModelRouteSet/>
            <ModelGroupCategory/>
        </div>
    );
};

export default ModelDetailsQuery;