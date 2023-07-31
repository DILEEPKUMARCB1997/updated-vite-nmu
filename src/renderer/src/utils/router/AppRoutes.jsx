/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'
import DashboardPage from '../../pages/DashboardPage'
import DevicePage from '../../pages/DevicePage'
import LoginPage from '../../pages/LoginPage'
import PageNotFound from '../../pages/PageNotFound'
import EventLogPage from '../../pages/EventLogPage'
// import DeviceConfigPage from '../../pages/DeviceConfigPage'
import ResetToDefault from '../../pages/ResetToDefault'

import UserManagement from '../../pages/UserManagementPage'
import ConfigComparission from '../../pages/ConfigComparission'
import TopologyPage from '../../pages/TopologyPage'

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Navigate to="/dashboard" /> },
        {
          path: 'dashboard',
          element: <DashboardPage />
        },
        {
          path: 'devices',
          element: <DevicePage />
        },
        {
          path: 'eventlog',
          element: <EventLogPage />
        },
        {
          path: 'topology',
          element: <TopologyPage />
        },
        {
          path: 'usermanagement',
          element: <UserManagement />
        },
        // {
        //   path: 'file',
        //   element: <DeviceConfigPage />
        // },
        {
          path: 'ConfigComparission',
          element: <ConfigComparission />
        },
        {
          path: 'ResetToDefault',
          element: <ResetToDefault />
        }
      ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <PageNotFound /> }
  ])

  return element
}

export default AppRoutes
