// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};

// ==============================|| MENU ITEMS ||============================== //

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard/default'
        }
      ]
    },


    {
      id: 'pages',
      title: 'Quản lý sản phẩm ',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'manage-device',
          title: 'Quản lý sản phẩm',
          type: 'collapse',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          children: [
            {
              id: 'mng-device-1',
              title: 'Danh sách sản phẩm',
              type: 'item',
              url: '/application/login',
              target: false
            },
            {
              id: 'mng-device-2',
              title: 'Đăng ký thông tin sản phẩm',
              type: 'item',
              url: '/application/login',
              target: false
            },
          ]
        },
        
        {
          id: 'manage-process-line',
          title: 'Quản lý quy trình',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'mng-process-l-1',
              title: 'Danh sách quy trình',
              type: 'item',
              url: '/application/login',
              target: true
            },
            {
              id: 'mng-process-l-2',
              title: 'Đăng ký thông tin quy trình',
              type: 'item',
              url: '/application/register',
              target: true
            }
          ]
        },

        {
          id: 'manage-process',
          title: 'Quản lý công đoạn',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'mng-process-1',
              title: 'Danh sách công đoạn',
              type: 'item',
              url: '/application/login',
            },
            {
              id: 'mng-process-2',
              title: 'Đăng ký thông tin công đoạn',
              type: 'item',
              url: '/application/register',
            }
          ]
        },

        {
          id: 'manage-equipment',
          title: 'Quản lý trang thiết bị',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'mng-eqp-1',
              title: 'Danh sách trang thiết bị',
              type: 'item',
              url: '/application/login',
            },
            {
              id: 'mng-eqp-2',
              title: 'Đăng ký thông tin công đoạn',
              type: 'item',
              url: '/application/register',
            }
          ]
        },
        {
          id: 'manage-eqp-status',
          title: 'Cấu hình trạng thái',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'mng-eqp-status-1',
              title: 'Danh sách trạng thái',
              type: 'item',
              url: '/application/login',
            },
            {
              id: 'mng-eqp-status-2',
              title: 'Đăng ký thông tin trạng thái',
              type: 'item',
              url: '/application/register',
            }
          ]
        },
        {
          id: 'manage-eqp-status',
          title: 'Cấu hình trạng thái',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          children: [
            {
              id: 'mng-eqp-status-1',
              title: 'Danh sách trạng thái',
              type: 'item',
              url: '/application/login',
            },
            {
              id: 'mng-eqp-status-2',
              title: 'Đăng ký thông tin trạng thái',
              type: 'item',
              url: '/application/register',
            }
          ]
        },
      ]
    },
    {
      id: 'utils',
      title: 'Utils',
      type: 'group',
      icon: icons['AccountTreeOutlinedIcon'],
      children: [
        {
          id: 'util-icons',
          title: 'Icons',
          type: 'item',
          url: 'https://mui.com/material-ui/material-icons/',
          icon: icons['AppsOutlinedIcon'],
          external: true,
          target: true
        },
        {
          id: 'util-typography',
          title: 'Typography',
          type: 'item',
          url: '/utils/util-typography',
          icon: icons['FormatColorTextOutlinedIcon']
        }
      ]
    },
   
  ]
};
