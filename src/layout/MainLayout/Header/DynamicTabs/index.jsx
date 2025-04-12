import React, { useState } from 'react';
import { Tabs, Tab, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DynamicTabs = ({ menuItems }) => {
  const [tabs, setTabs] = useState([
    { key: 'home', label: 'Trang chủ', content: 'Nội dung trang chủ' }
  ]);
  const [activeTab, setActiveTab] = useState('home');

  const handleOpenTab = (item) => {
    if (!tabs.find(tab => tab.key === item.key)) {
      setTabs([...tabs, item]);
    }
    setActiveTab(item.key);
  };

  const handleCloseTab = (event, key) => {
    event.stopPropagation();
    const newTabs = tabs.filter(tab => tab.key !== key);
    setTabs(newTabs);
    if (activeTab === key && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].key);
    }
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ minHeight: '36px' }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            label={
              <Box display="flex" alignItems="center">
                {tab.label}
                <IconButton
                  size="small"
                  onClick={(e) => handleCloseTab(e, tab.key)}
                  sx={{ ml: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
            value={tab.key}
            sx={{ minHeight: '36px' }}
          />
        ))}
      </Tabs>

      <Box mt={1} p={2} bgcolor="#f5f5f5" borderRadius={1}>
        {tabs.find(tab => tab.key === activeTab)?.content}
      </Box>

      <Box mt={2}>
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => handleOpenTab(item)}
            style={{ marginRight: 10 }}
          >
            {item.label}
          </button>
        ))}
      </Box>
    </Box>
  );
};

export default DynamicTabs;
