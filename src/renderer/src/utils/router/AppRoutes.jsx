/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'
import DashboardPage from '../../pages/DashboardPage'
import DevicePage from '../../pages/DevicePage'
import LoginPage from '../../pages/LoginPage'
import PageNotFound from '../../pages/PageNotFound'
import EventLogPage from '../../pages/EventLogPage'
import TopologyPage from '../../pages/TopologyPage'
import UserManagementPage from '../../pages/UserManagementPage'
import DeviceConfigPage from '../../pages/DeviceConfigPage'
import Telegram from '../../components/dialogs/PreferencesDialog/Telegram/Telegram'
import ConfigComparission from '../../components/ConfigComparission/ConfigComparission'
import SNMP from '../../components/dialogs/PreferencesDialog/SNMP/SNMP'

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
          element: <UserManagementPage />
        },
        {
          path: 'file',
          element: <DeviceConfigPage />
        },
        {
          path: 'telegram',
          element: <Telegram />
        },
        {
          path: 'ConfigComparission',
          element: <ConfigComparission />
        },
        {
          path: 'snmp',
          element: <SNMP />
        }
      ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <PageNotFound /> }
  ])

  return element
}

export default AppRoutes
