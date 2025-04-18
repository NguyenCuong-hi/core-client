import React, { lazy, useEffect, useRef, useState } from 'react';

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
import DynamicTabContent from 'layout/MainLayout/DynamicTabs';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSection from 'layout/MainLayout/Header/ProfileSection';
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
  // const [collapsed, setCollapsed] = useState(() => {
  //   const savedState = localStorage.getItem('COLLAPSED_STATE')
  //   return savedState ? JSON.parse(savedState) : false
  // })

  const [collapsed, setCollapsed] = useState(false)

  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const dispatch = useDispatch();
  const tabList = useSelector((state) => state.tab.tabList);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlTab = searchParams.get("tab");

    if (urlTab && tabList.some((tab) => tab.key === urlTab)) {
      dispatch(setActiveTab(urlTab));
    }
  }, [location.search, tabList, dispatch]);

  const sidebarWidth = drawerOpen === false ? 80 : 260;

  console.log('drawerOpen', drawerOpen)
  console.log('collapsed', collapsed)

  return (
    <Layout className="h-screen w-full overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-[1001] bg-white">
        <Header
          drawerOpen={drawerOpen}
          drawerToggle={handleDrawerToggle}
        />
      </div>

      <div
        className="fixed  bottom-0 z-[1000] border-r bg-white transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          drawerOpen={drawerOpen}
          drawerToggle={handleDrawerToggle}
          sidebarWidth={sidebarWidth}
        />
        <div>
          <ProfileSection />
        </div>
      </div>

      <div
        className=" mt-4 w-full h-screen overflow-y-auto bg-slate-100 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Content className=" min-h-full">
          <Suspense>
            <DynamicTabContent />
          </Suspense>
        </Content>
      </div>
    </Layout>
  );
};

export default MainRoutes;
