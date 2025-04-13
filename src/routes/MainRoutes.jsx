import React, { lazy, useRef, useState } from 'react';

// project import
import Loadable from 'component/Loadable';
import ManageModelPage from 'views/ManageModel';
import Login from 'views/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { Layout, message } from 'antd'
const { Content } = Layout


import { Suspense } from 'react';


const DefaultPage = lazy(() => import('../views/default'))

import Sidebar from 'layout/MainLayout/Sidebar';
import Header from 'layout/MainLayout/Header';
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const SamplePage = Loadable(lazy(() => import('views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = () => {

  const controllers = useRef({})

  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuTransForm, setMenuTransForm] = useState([])
  const [rootMenuItems, setRootMenuItems] = useState([])
  const [errorMenu, setErrorMenu] = useState(false)
  const [userPermissions, setUserPermissions] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const rolesMenu = localStorage.getItem('roles_menu')
  const [keyLanguage, setKeyLanguage] = useState(null)
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('COLLAPSED_STATE')
    return savedState ? JSON.parse(savedState) : false
  })

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const routes = [
    {
      path: '/',
      permission: 'dashboad',
      element: DashboardDefault,
      fallback: DefaultPage,
    },
    {
      path: '/mng-model',
      permission: 'mng-model',
      element: ManageModelPage,
      fallback: DefaultPage,
    },
  ]

  return (
    <Routes>
      {/* Route cho login */}
      <Route
        path="/login"
        element={
          <Login

          />
        }
      />

      {/* Route chính, bao gồm Sidebar, Layout và Routes con */}
      <Route
        path="*"
        element={
          <Suspense>
            {/* <LanguageProvider keyLanguage={keyLanguage}> */}
            <Layout className="h-100">



              <div className="fixed z-[1001] bg-amber-50 w-full ">
                <Header
                  drawerOpen={drawerOpen}
                  drawerToggle={handleDrawerToggle}
                />
              </div>
              <Sidebar
                drawerOpen={drawerOpen}
                drawerToggle={handleDrawerToggle}
              />

              <Layout>
                <Content className="bg-slate-100 mt-2 mb-2">
                  <Suspense >

                    <Routes>
                      {routes.map(
                        ({
                          path,
                          element: Element,
                          permission,
                          public: isPublic,
                          fallback: Fallback,
                        }) => {
                          // const canCreate = checkActionPermission(
                          //   userPermissions,
                          //   permission,
                          //   'Create',
                          // )
                          // const canEdit = checkActionPermission(
                          //   userPermissions,
                          //   permission,
                          //   'Edit',
                          // )
                          // const canDelete = checkActionPermission(
                          //   userPermissions,
                          //   permission,
                          //   'Delete',
                          // )
                          const canView = true

                          // checkActionPermission(
                          //   userPermissions,
                          //   permission,
                          //   'View',
                          // )
                          return (
                            <Route
                              key={path}
                              path={path}
                              element={
                                isPublic ? (
                                  <Element
                                    permissions={userPermissions}
                                    isMobile={isMobile}
                                    // canCreate={canCreate}
                                    // canEdit={canEdit}
                                    // canDelete={canDelete}
                                    // cancelAllRequests={cancelAllRequests}
                                    controllers={controllers}
                                    collapsed={collapsed}
                                    setCollapsed={setCollapsed}
                                  />
                                ) : canView ? (
                                  <Element
                                    permissions={userPermissions}
                                    isMobile={isMobile}
                                    // canCreate={canCreate}
                                    // canEdit={canEdit}
                                    // canDelete={canDelete}
                                    // cancelAllRequests={cancelAllRequests}
                                    controllers={controllers}
                                    collapsed={collapsed}
                                    setCollapsed={setCollapsed}
                                  />
                                )
                                  : (
                                    <ErrorPage />
                                  )
                              }
                            />
                          )
                        },
                      )}
                    </Routes>
                  </Suspense>
                </Content>
              </Layout>
            </Layout>
            {/* </LanguageProvider> */}
          </Suspense>
        }
      />
    </Routes>
  )
};

export default MainRoutes;
