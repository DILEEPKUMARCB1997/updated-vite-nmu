/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'
import DashboardPage from '../../pages/DashboardPage'
import DevicePage from '../../pages/DevicePage'
import LoginPage from '../../pages/LoginPage'
import PageNotFound from '../../pages/PageNotFound'
import EventLogPage from '../../pages/EventLogPage'
import TopologyPage from '../../pages/TopologyPage'
// import DeviceConfigPage from '../../pages/DeviceConfigPage'
import Telegram from '../../components/dialogs/PreferencesDialog/Telegram/Telegram'
import SNMP from '../../components/dialogs/PreferencesDialog/SNMP/SNMP'
import UserManagement from '../../pages/UserManagementPage'
import ConfigComparission from '../../pages/ConfigComparission'
import ModalCheck from '../../pages/ModalCheck'

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
        },
        {
          path: 'modal',
          element: <ModalCheck />
        }
      ]
    },
    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <PageNotFound /> }
  ])

  return element
}

export default AppRoutes
