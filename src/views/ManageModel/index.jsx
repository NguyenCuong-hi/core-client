import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import ModelAction from './action/ModelAction';
import ModelTable from './table/ModelTable';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPage = () => {
  return (
    <>
      <div className="p-0 h-screen overflow-hidden">
        <ModelAction />
        <ModelTable />
      </div>



    </>
  );
};

export default ManageModelPage;
