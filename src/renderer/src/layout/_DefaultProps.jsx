/* eslint-disable prettier/prettier */
import { DashboardOutlined, DesktopOutlined, ProfileOutlined } from '@ant-design/icons'

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
        path: '/eventLog',
        name: 'Event',
        icon: <ProfileOutlined />
      }
    ]
  },
  location: {
    pathname: '/'
  }
}
export default routes
