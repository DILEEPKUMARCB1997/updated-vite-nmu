import React, { useCallback, useEffect } from 'react'
import { useThemeStore } from '../../utils/themes/useStore'
import { App } from 'antd'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  REQUEST_CHANGE_THEME_MODE,
  REQUEST_HIDE_SHOW_MENU,
  REQUEST_MP_DISCOVERY_ALL_DEVICES,
  RESPONSE_RP_SET_THE_GROUP_DATA,
  SEND_RP_ALL_DEVICES_LIST,
  SEND_RP_SNMP_SCAN_STATUS
} from '../../../../main/utils/IPCEvents'
import { updateDiscoveryData } from '../../features/discoverySlice'
import { changeSnmpScanStep, clearSnmpScanProgress } from '../../features/snmpScanProgressSlice'
import { closeDialog } from '../../features/dialogSlice'

const BindAllGlobalEvent = () => {
  const { mode } = useThemeStore()
  const { notification } = App.useApp()
  const location = useLocation()
  console.log(location)
  const dispatch = useDispatch()
  console.log(dispatch)

  const deviceListListener = useCallback((_, args) => {
    dispatch(updateDiscoveryData(JSON.parse(args)))
  }, [])
  const groupManageResultListener = useCallback((_, args) => {
    switch (args.data.cmd) {
      case 'addGroup': {
        if (args.success) {
          notification.success({ message: 'Add new group successful.' })
        } else {
          notification.error({ message: 'Add new group fail.' })
        }
        break
      }
      case 'deleteGroup': {
        if (args.success) {
          notification.success({ message: 'Remove group successful.' })
        } else {
          notification.error({ message: 'Remove group fail.' })
        }
        break
      }
      case 'renameGroup': {
        if (args.success) {
          notification.success({ message: 'Rename group successful.' })
        } else {
          notification.error({ message: 'Rename group fail.' })
        }
        break
      }
      default:
        break
    }
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.send(REQUEST_MP_DISCOVERY_ALL_DEVICES, {})
    window.electron.ipcRenderer.on(SEND_RP_ALL_DEVICES_LIST, deviceListListener)
    window.electron.ipcRenderer.on(RESPONSE_RP_SET_THE_GROUP_DATA, groupManageResultListener)
    return () => {
      window.electron.ipcRenderer.removeListener(SEND_RP_ALL_DEVICES_LIST, deviceListListener)
      window.electron.ipcRenderer.removeListener(
        RESPONSE_RP_SET_THE_GROUP_DATA,
        groupManageResultListener
      )
    }
  }, [])

  useEffect(() => {
    if (mode === 'dark') {
      window.electron.ipcRenderer.send(REQUEST_CHANGE_THEME_MODE, 'dark')
    } else {
      window.electron.ipcRenderer.send(REQUEST_CHANGE_THEME_MODE, 'light')
    }
  }, [mode])

  useEffect(() => {
    if (location.pathname === '/login') {
      window.electron.ipcRenderer.send(REQUEST_HIDE_SHOW_MENU, false)
    } else {
      window.electron.ipcRenderer.send(REQUEST_HIDE_SHOW_MENU, true)
    }
  }, [location.pathname])
  return <div></div>
}

export default BindAllGlobalEvent
