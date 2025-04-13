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
    label: 'Quản lý sản phẩm',
    children: [
      { key: 'mng-model', label: 'Danh sách sản phẩm' },
      { key: 'model-register', label: 'Đăng ký thông tin sản phẩm' },
    ]
  },
  {
    key: 'manage-process-line',
    icon: <LineAxis />,
    label: 'Quản lý quy trình',
    children: [
      { key: 'list-process', label: 'Danh sách quy trình' },
      { key: 'line-register', label: 'Đăng ký thông tin quy trình' },
      { key: 'line-register', label: 'Đăng ký thông tin sản phẩm' }
    ]
  },
  {
    key: 'manage-process-line',
    icon: <LineAxis />,
    label: 'Quản lý công đoạn',
    children: [
      { key: 'list-process', label: 'Danh sách công đoạn' },
      { key: 'line-register', label: 'Đăng ký thông tin công đoạn' },
      { key: 'line-register', label: 'Đăng ký thông tin sản phẩm' }
    ]
  },
  {
    key: 'manage-process-line',
    icon: <OutboxOutlined />,
    label: 'Quản lý trang thiết bị',
    children: [
      { key: 'list-process', label: 'Danh sách trang thiết bị' },
      { key: 'line-register', label: 'Đăng ký trang thiết bị' },
      { key: 'line-register', label: 'Đăng ký thông tin sản phẩm' }
    ]
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: 'System'
  }
];

export default menuItems;
