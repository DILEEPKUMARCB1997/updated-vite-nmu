/* eslint-disable prettier/prettier */
import {
  BarsOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ShareAltOutlined
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
        icon: <ShareAltOutlined />
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
export default routes
