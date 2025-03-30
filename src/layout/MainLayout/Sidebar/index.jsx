import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery, Divider, Drawer, Grid, Box, IconButton } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project import
import MenuList from './MenuList';
import { drawerWidth } from 'config.js';
import NavCard from './MenuList/NavCard';

// assets
import logo from 'assets/images/logo.svg';
import ProfileSection from '../Header/ProfileSection';
import { MenuTwoTone } from '@mui/icons-material';

// custom style
const Nav = styled((props) => <nav {...props} />)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0
  }
}));

// ==============================|| SIDEBAR ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const drawer = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box width={drawerWidth} sx={{ zIndex: 1201 }}>
          <Grid container >
            <Grid item>
              <IconButton
                edge="start"
                sx={{ mr: theme.spacing(1), marginLeft: 1 }}
                aria-label="open drawer"
                onClick={drawerToggle}
                size="large"
              >
                <MenuTwoTone sx={{ fontSize: '1rem' }} />
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
        <Box sx={{ display: { md: 'none', xs: 'block' } }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            elevation={5}
            alignItems="center"
            spacing={0}
            sx={{
              ...theme.mixins.toolbar,
              lineHeight: 0,
              background: theme.palette.primary.main,
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
            }}
          >
            <Grid item>
              <img src={logo} alt="Logo" />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <PerfectScrollbar style={{ flexGrow: 1, padding: '10px' }}>
          <MenuList />
        </PerfectScrollbar>

        <Box sx={{ mb: 0 }}>
          <ProfileSection />
        </Box>
      </Box>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Nav>
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}

        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: '0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)',
            // top: { md: 30, sm: 0 },
            height: { sm: '100%' }
          }
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </Nav>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;
