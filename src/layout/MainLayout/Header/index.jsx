import PropTypes from 'prop-types';
import React from 'react';
import { Outlet, Router, Link as RouterLink } from 'react-router-dom';


// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Typography, Breadcrumbs, Link } from '@mui/material';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import logo from 'assets/images/logo.svg';

import menuItem from 'menu-items';
import DynamicTabs from './DynamicTabs';

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(1, index).join('/')}`;
    return index === pathnames.length - 1 ? (
      <Typography key={to} color="text.primary">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Typography>
    ) : (
      <Link key={to} underline="hover" color="inherit" component={RouterLink} to={to}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Link>
    );
  });

  const menuItems = [
    { key: 'home', label: 'Trang chủ', content: 'Nội dung trang chủ' },
    { key: 'about', label: 'Giới thiệu', content: 'Nội dung giới thiệu' },
    { key: 'contact', label: 'Liên hệ', content: 'Nội dung liên hệ' },
  ];



  return (
    <>
      <Box width={drawerWidth} sx={{ zIndex: 1201 }}>
        <Grid container >
          <Grid item>
            <IconButton
              edge="start"
              sx={{ mr: theme.spacing(1) }}
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Grid>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              <Box mt={0.5}>
                <img src={logo} alt="Logo" />
              </Box>
            </Grid>
          </Box>



        </Grid>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {/* <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 0 }}>
          {breadcrumbs}
        </Breadcrumbs> */}
        <DynamicTabs menuItems={menuItems} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <NotificationSection />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
