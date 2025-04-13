import PropTypes from 'prop-types';
import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import DynamicTabs from './DynamicTabs';
import logo from 'assets/images/logo.svg';
import NotificationSection from './NotificationSection';
import menuItems from 'menu-item';

const { Header: AntHeader } = Layout;

const Header = ({ drawerToggle }) => {


  return (
    <AntHeader
      style={{ height: '40px', minHeight: '30px', lineHeight: '30px' }}
      className="flex items-center justify-between bg-white px-4 shadow-sm z-[1000] ">
      <div className="flex items-center gap-2 border-r-2 border-r-gray-400 pr-3">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={drawerToggle}
          className="md:hidden"
        />
        <img src={logo} alt="Logo" className="h-8 hidden md:block" />
      </div>

      {/* Center: Dynamic Tabs */}
      <div className="flex-1 mx-4 hidden md:block">
        <DynamicTabs menuItems={menuItems} />
      </div>

      <div className="flex items-center gap-2">
        <NotificationSection />
      </div>
    </AntHeader>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func,
};

export default Header;
