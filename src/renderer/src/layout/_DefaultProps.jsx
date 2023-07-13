import {
  BarsOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ApartmentOutlined,
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
        path: '/configComparission',
        name: 'ConfigComparission',

        icon: <FileSearchOutlined />
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
export default routes
