// ./MenuList/items.js
import {
  HomeOutlined,
  ProductFilled,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { LineAxis, OutboxOutlined } from '@mui/icons-material';

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Dashboard'
  },
  {
    key: 'model',
    icon: <ProductFilled />,
    label: 'Quản lý Hàng Hóa',
    children: [
      { key: 'mng-model', label: 'Danh sách hàng hóa', component: "ManageModelPage", permission: null, },
      { key: 'model-register', component: "ManageModelPageDetails",label: 'Đăng ký thông tin hàng hóa' },
    ]
  },
  {
    key: 'manage-process-line',
    icon: <LineAxis />,
    label: 'Quản lý quy trình',
    children: [
      { key: 'list-process-line', label: 'Danh sách quy trình' },
      { key: 'process-line-register', label: 'Đăng ký thông tin quy trình' },
    ]
  },
  {
    key: 'manage-process',
    icon: <LineAxis />,
    label: 'Quản lý công đoạn',
    children: [
      { key: 'list-process', label: 'Danh sách công đoạn' },
      { key: 'process-register', label: 'Đăng ký thông tin công đoạn' },
    ]
  },
  {
    key: 'manage-machine',
    icon: <OutboxOutlined />,
    label: 'Quản lý trang thiết bị',
    children: [
      { key: 'list-machine', label: 'Danh sách trang thiết bị' },
      { key: 'machine-register', label: 'Đăng ký trang thiết bị' },
    ]
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: 'System'
  }
];

export default menuItems;
