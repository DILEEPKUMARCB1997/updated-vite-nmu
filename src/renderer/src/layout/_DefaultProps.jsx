import {
  BarsOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  UserOutlined
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
<<<<<<< HEAD
        path: '/usermanagement',
        name: 'User Management',
        icon: <UserOutlined />
=======
        path: '/file',
        name: 'Device config comparison',
        icon: <FileSearchOutlined />
>>>>>>> b1b92760cd7e9ff7762cad11dfee749c85035c04
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
export default routes
