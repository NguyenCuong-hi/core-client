import React, { useState, useEffect } from 'react';
import { Tabs, Tab, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import menuItems from 'menu-item';
// Giả định các component động cho nội dung tab
const Default = React.lazy(() => import('../../../../views/Dashboard/Default')); 
const ManageModel = React.lazy(() => import('../../../../views/ManageModel'));


const DynamicTabs = ({ menuItems, onTabChange }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

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

  // Đồng bộ tabs và activeTab với URL
  useEffect(() => {
    const currentPath = location.pathname.replace('/', '') || 'home';
    const currentTab = tabs.find(tab => tab.key === currentPath);
    if (currentTab) {
      setActiveTab(currentPath);
    } else {

      const menuItem = findMenuItemByKey(menuItems, currentPath);
      if (menuItem && !tabs.find(tab => tab.key === menuItem.key)) {
        setTabs([...tabs, { ...menuItem, path: `/${menuItem.key}` }]);
      }
      setActiveTab(currentPath);
    }
  }, [location.pathname, menuItems, tabs]);

  // Lưu tabs vào localStorage
  useEffect(() => {
    localStorage.setItem('dynamicTabs', JSON.stringify(tabs));
    localStorage.setItem('activeTab', activeTab);
  }, [tabs, activeTab]);

  useEffect(() => {
    const savedTabs = localStorage.getItem('dynamicTabs');
    const savedActiveTab = localStorage.getItem('activeTab');
    if (savedTabs) setTabs(JSON.parse(savedTabs));
    if (savedActiveTab) setActiveTab(savedActiveTab);
  }, []);
  

  const handleOpenTab = (item) => {
    if (!tabs.find(tab => tab.key === item.key)) {
      setTabs([...tabs, { ...item, path: `/${item.key}` }]);
    }
    setActiveTab(item.key);
    navigate(item.key);
    if (onTabChange) onTabChange(item.key);
  };

  const handleCloseTab = (event, key) => {
    event.stopPropagation();
    const newTabs = tabs.filter(tab => tab.key !== key);
    setTabs(newTabs);
    if (activeTab === key) {
      if (newTabs.length > 0) {
        const newActiveTab = newTabs[newTabs.length - 1].key;
        setActiveTab(newActiveTab);
        navigate(newActiveTab);
      } else {
        setActiveTab('home');
        navigate('home');
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    navigate(newValue);
    if (onTabChange) onTabChange(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ minHeight: '48px', borderBottom: 1, borderColor: 'divider' }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            label={
              <Box display="flex" alignItems="center">
                {tab.label}
                {tab.key !== 'home' && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleCloseTab(e, tab.key)}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            }
            value={tab.key}
            sx={{ minHeight: '48px', textTransform: 'none' }}
          />
        ))}
      </Tabs>

      {/* <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
        <Suspense fallback={<div>Loading...</div>}>
          {(() => {
            const Component = tabComponents[activeTab];
            console.log('Component', Component)
            return Component ? <Component /> : <div>Nội dung cho {activeTab}</div>;
          })()}
        </Suspense>
      </Box> */}
    </Box>
  );
};

export default DynamicTabs;