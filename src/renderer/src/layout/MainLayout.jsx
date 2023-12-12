/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from 'react-redux'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'antd-style'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { App, Dropdown, Spin } from 'antd'
import { LogoutOutlined, WindowsFilled, SettingOutlined } from '@ant-design/icons'
import ThemeController from '../utils/themes/ThemeController'
import { useThemeStore } from '../utils/themes/useStore'
import _DefaultProps from './_DefaultProps'
import atopLogo from '../assets/images/atop-logo.svg'
import { clearUsersData } from '../features/userManagementSlice'
import {
  nextInitRenderStep,
  removeBatchOperateEvent,
  requestAppInitialData
} from '../features/UIControllSlice'
import RenameGroupDialog from '../components/dialogs/renameGroupDialog/RenameGroupDialog'
import Dialogs from '../components/dialogs/Dialogs'
import { closeDialog, dialogSelector, openDialog } from '../features/dialogSlice.js'
import {
  REQUEST_MP_DISCOVERY_ALL_DEVICES,
  SEND_RP_ALL_DEVICES_LIST,
  SEND_RP_EVENT_LOG_UPDATE,
  SEND_RP_OPEN_NATIVE_MENU,
  SEND_RP_SNMP_SCAN_STATUS
} from '../../../main/utils/IPCEvents'
import { requestGetNICData } from '../features/Preferences/generalSlice'
import { changeSnmpScanStep, clearSnmpScanProgress } from '../features/snmpScanProgressSlice'
import { requestDiscoveryAfterLogin, updateDiscoveryData } from '../features/discoverySlice'
import { eventLogSelector, updateBeepSoundStart, updateEventLog } from '../features/eventLogSlice'

const MainLayout = () => {
  const { dialogs } = useSelector(dialogSelector)
  const { openBeepDialog } = useSelector(eventLogSelector)
  const isAppPreferencesDialogOpen = dialogs.includes('perferences')
  const dispatch = useDispatch()
  const { mode } = useThemeStore()
  const navigate = useNavigate()
  const location = useLocation()
  const token = useTheme()
  const [pathname, setPathname] = useState(location.pathname)

  useEffect(() => {
    setPathname(location.pathname || '/')
    return () => {
      dispatch(removeBatchOperateEvent())
    }
  }, [location])

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_OPEN_NATIVE_MENU, nativeMenuListener)
    dispatch(requestAppInitialData())
    dispatch(requestDiscoveryAfterLogin())
    setTimeout(() => {
      nextInitRenderStep()
    }, 800)
    setTimeout(() => {
      nextInitRenderStep()
    }, 1600)
    setTimeout(() => {
      nextInitRenderStep()
    }, 2200)
    window.electron.ipcRenderer.on(SEND_RP_SNMP_SCAN_STATUS, SNMPStatusListener)
    window.electron.ipcRenderer.on(SEND_RP_EVENT_LOG_UPDATE, eventLogUpdateListener)
    return () => {
      window.electron.ipcRenderer.removeListener(SEND_RP_OPEN_NATIVE_MENU, nativeMenuListener)
    }
  }, [])

  const nativeMenuListener = (event, arg) => {
    console.log(arg)
    if (arg.action === 'preference') {
      if (!isAppPreferencesDialogOpen) {
        dispatch(requestGetNICData())
        dispatch(openDialog('perferences'))
      }
    } else if (arg.action === 'about') {
      dispatch(openDialog('aboutDialog'))
    }
  }

  const SNMPStatusListener = (event, arg) => {
    if (arg.scanStatus === 'a') {
      dispatch(changeSnmpScanStep(arg.scanStatus))
      setTimeout(() => {
        dispatch(closeDialog('snmpScanProgress'))
        dispatch(clearSnmpScanProgress())
      }, 2000)
    } else {
      dispatch(changeSnmpScanStep(arg.scanStatus))
    }
  }

  const eventLogUpdateListener = (event, arg) => {
    // console.log(arg)
    if (!openBeepDialog && arg.type === 'custom') {
      dispatch(updateBeepSoundStart())
      dispatch(openDialog('buzzer'))
    }
    dispatch(updateEventLog(arg))
  }

  // const deviceListListener = useCallback((_, args) => {
  //   dispatch(updateDiscoveryData(JSON.parse(args)))
  // }, [])

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(clearUsersData())
      localStorage.removeItem('username')
      navigate('/login')
    }
  }

  const loggedinUser = localStorage.getItem('username') ? localStorage.getItem('username') : 'admin'

  return (
    <div>
      <ProLayout
        {..._DefaultProps}
        siderWidth={220}
        layout="mix"
        fixSiderbar
        fixedHeader
        hasSiderMenu={true}
        siderMenuType="sub"
        menu={{
          collapsedShowGroupTitle: false
        }}
        location={{
          pathname
        }}
        logo={<img src={atopLogo} alt="Atop Technologies" />}
        title="Atop Technologies"
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'default',
          title: loggedinUser,
          render: (props, dom) => {
            return (
              <Dropdown
                trigger={['click']}
                placement="bottom"
                arrow
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: 'Logout'
                    }
                  ],
                  onClick: handleMenuClick
                }}
              >
                {dom}
              </Dropdown>
            )
          }
        }}
        actionsRender={(props) => [<ThemeController />]}
        menuItemRender={(item, dom) => <Link to={item.path || '/'}>{dom}</Link>}
        token={{
          sider: {
            colorMenuBackground: token.colorBgContainer,
            colorBgMenuItemSelected: mode === 'dark' ? token.colorPrimary : token.colorPrimaryBg,
            colorTextMenuSelected: mode === 'dark' ? token.colorText : token.colorPrimary
          },
          pageContainer: {
            paddingBlockPageContainerContent: 16,
            paddingInlinePageContainerContent: 16
          }
        }}
      >
        <PageContainer
          header={{
            title: ''
          }}
        >
          <Outlet />
        </PageContainer>
        <Dialogs />
      </ProLayout>
    </div>
  )
}

export default React.memo(MainLayout)
