import React from 'react';

// material-ui
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// grid-app
import '@glideapps/glide-data-grid/dist/index.css'

import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// third-party
import { useSelector } from 'react-redux';

// project import
import theme from 'themes';
import NavigationScroll from './NavigationScroll';
import MainRoutes from 'routes/MainRoutes';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <>
      {
        <NavigationScroll>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
              <CssBaseline />
              <MainRoutes />
            </ThemeProvider>
          </StyledEngineProvider>
        </NavigationScroll>
      }
    </>
  );
};

export default App;
