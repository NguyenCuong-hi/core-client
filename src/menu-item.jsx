// ./MenuList/items.js
import {
  HomeOutlined,
  ProductFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { FactoryOutlined, LineAxis, OutboxOutlined } from '@mui/icons-material';

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Dashboard'
  },
  {
    key: 'model',
    icon: <ProductFilled />,
    label: 'Quản lý dòng sản phẩm',
    children: [
      { key: 'mng-model', label: 'Danh sách dòng sản phẩm', component: "ManageModelPage", permission: null, },
      { key: 'model-register', component: "ManageModelPageDetails",label: 'Đăng ký dòng sản phẩm', permission: null, },
    ]
  },
  {
    key: 'manage-process-line',
    icon: <LineAxis />,
    label: 'Quản lý quy trình',
    children: [
      { key: 'list-process-line', label: 'Danh sách quy trình', component: "ManageModelPage", permission: null, },
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
    icon: <FactoryOutlined />,
    label: 'Hệ thống sản xuất',
    children: [
      { key: 'system-manuf-code', label: 'Đăng ký thông tin hệ thống', component: "ManageCodeSys", permission: null, },
      { key: 'system-manuf-param', label: 'Đăng ký bổ sung' },
    ]
  },
  {
    key: 'program',
    icon: <SettingOutlined />,
    label: 'Cấu hình hệ thống',
    children: [
      { key: 'system-menu', label: 'Cài đặt menu', component: "ManageCodeSys", permission: null, },
      { key: 'system-user', label: 'Cài đặt tài khoản' },
    ]
  }
];

export default menuItems;
