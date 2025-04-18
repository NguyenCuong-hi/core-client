import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Grid } from 'antd';

import ProfileSection from '../Header/ProfileSection';
import menuItems from 'menu-item';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, setActiveTab } from 'store/tabsReducer';

const { Sider } = Layout;

const Sidebar = ({ drawerOpen, drawerToggle, sidebarWidth }) => {
  const dispatch = useDispatch();
  const { tabList, activeTabKey } = useSelector((state) => state.tab);

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

  const handleMenuClick = ({ key }) => {
    const menuItem = findMenuItemByKey(menuItems, key);
    if (!menuItem) return;

    if (!tabList.some((tab) => tab.key === key)) {
      dispatch(
        addTab({
          key: key,
          label: menuItem.label,
          component: menuItem.component,
          permission: menuItem.permission,
        })
      );
    }

    dispatch(setActiveTab(key));
  };

  return (


    <Sider
      collapsible={true}
      collapsed={!drawerOpen}
      onCollapse={(collapsed) => drawerToggle(!collapsed)}
      width={sidebarWidth}
      style={siderStyle}
      className="bg-white"
      trigger={null}
    >

      <div className="flex-1 ">
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          className="border-none"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </div>


    </Sider>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func
};

export default Sidebar;
