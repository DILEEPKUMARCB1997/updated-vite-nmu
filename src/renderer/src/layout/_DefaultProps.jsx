import {
  BarsOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  UserOutlined,
  FileSearchOutlined,
  WhatsAppOutlined,
  FieldTimeOutlined
} from '@ant-design/icons'

const routes = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <DashboardOutlined />
      },
      {
        path: '/devices',
        name: 'Devices',
        icon: <DesktopOutlined />
      },
      {
        path: '/eventlog',
        name: 'Events',
        icon: <BarsOutlined />
      },
      {
        path: '/topology',
        name: 'Topology',
        icon: <ApartmentOutlined />
      },
      {
        path: '/usermanagement',
        name: 'User Management',
        icon: <UserOutlined />
      },
      {
        path: '/file',
        name: 'Device config comparison',
        icon: <FileSearchOutlined />
      },
      {
        path: '/telegram',
        name: 'Telegram',
        icon: <WhatsAppOutlined />
      },
      {
        path: '/snmp',
        name: 'SNMP',
        icon: <FieldTimeOutlined />
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
export default routes
