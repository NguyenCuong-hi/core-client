import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Grid } from 'antd';

import ProfileSection from '../Header/ProfileSection';
import menuItems from 'menu-item';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const Sidebar = ({ drawerOpen, drawerToggle }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',

  };
  const [tabs, setTabs] = useState([
    { key: '/', label: 'Trang chủ', path: '/' },
  ]);

  const findMenuItemByKey = (items, targetKey) => {
    for (const item of items) {
      if (item.key === targetKey) {
        return item;
      }
  
      if (item.children) {
        const found = findMenuItemByKey(item.children, targetKey);
        if (found) return found;
      }
    }
    return null;
  };

  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    localStorage.setItem('dynamicTabs', JSON.stringify(tabs));
    localStorage.setItem('activeTab', activeTab);
  }, [tabs, activeTab]);

  const handleMenuClick = ({ key }) => {
    navigate(key);
    const menu = findMenuItemByKey(menuItems, key)
    localStorage.setItem('dynamicTabs', JSON.stringify(menu));
    localStorage.setItem('activeTab', key);
  };

  return (


    <Sider
      collapsible={true}
      collapsed={!drawerOpen}
      onCollapse={(collapsed) => drawerToggle(!collapsed)}
      width={260}
      style={siderStyle}
      className="bg-white"
      trigger={null}
    >
      {/* Header */}
      {/* <div className="h-16 flex items-center px-4 border-b border-gray-700 flex-shrink-0">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="ml-auto">
          {drawerOpen ? (
            <MenuFoldOutlined onClick={() => drawerToggle(false)} />
          ) : (
            <MenuUnfoldOutlined onClick={() => drawerToggle(true)} />
          )}
        </span>
      </div> */}

      {/* Scrollable Menu */}
      <div className="flex-1 ">
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          className="border-none"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>

      {/* Footer */}
      <div className=" ">
        <ProfileSection />
      </div>
    </Sider>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func
};

export default Sidebar;
