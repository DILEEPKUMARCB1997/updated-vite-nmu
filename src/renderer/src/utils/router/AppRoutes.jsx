/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'
import DashboardPage from '../../pages/DashboardPage'
import DevicePage from '../../pages/DevicePage'
import LoginPage from '../../pages/LoginPage'
import PageNotFound from '../../pages/PageNotFound'
import EventLogPage from '../../pages/EventLogPage'
import UserManagement from '../../pages/UserManagementPage'
import ConfigComparission from '../../pages/ConfigComparission'
import TopologyPage from '../../pages/TopologyPage'
import RowContextMenu from '../../components/RowContextMenu/RowContextMenu'
import React, { memo } from 'react'

const AppRoutes = memo(function AppRoutes() {
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
        {
          path: 'ConfigComparission',
          element: <ConfigComparission />
        },
        {
          path: 'RowContextMenu',
          element: <RowContextMenu />
        }
      ]
    },

    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <PageNotFound /> }
  ])

  return element
})

export default AppRoutes
