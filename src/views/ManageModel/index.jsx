import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { Typography } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import ModelAction from './action/ModelAction';

// ==============================|| MODEL PRODUCT PAGE ||============================== //

const ManageModelPage = () => {
  return (
    <>
      <div className="bg-slate-50 p-3 h-screen overflow-hidden">
        <ModelAction />
      </div>



    </>
  );
};

export default ManageModelPage;
