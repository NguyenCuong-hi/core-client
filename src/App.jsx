
import './App.css'
import AppContext from './appContext';
import { Provider } from 'react-redux';
import Auth from './auth/Auth';

import { Router,useHistory } from "react-router-dom";
import history from './history';
import AuthGuard from './auth/AuthGuard';
import routes from './RootRoutes';
import EgretTheme from './EgretLayout/EgretTheme/EgretTheme';
import EgretLayout from './EgretLayout/EgretLayout';


const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <EgretTheme>
          <Auth>
            <Router history={history}>
              <AuthGuard>
                <EgretLayout />
              </AuthGuard>
            </Router>
          </Auth>
        </EgretTheme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
