import {
  BarsOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  UserOutlined,
  FileSearchOutlined
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
        path: '/ConfigComparission',
        name: 'Device config comparison',
        icon: <FileSearchOutlined />
      },
      {
        path: '/RowContextMenu',
        name: 'RowContextMenu',
        icon: <FileSearchOutlined />
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
export default routes
