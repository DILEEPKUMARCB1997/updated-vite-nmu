import { createSlice } from '@reduxjs/toolkit'
import { openAlertDialog } from './dialogSlice'
import {
  REQUEST_MP_REBOOT_GWD_DEVICE,
  RESPONSE_RP_REBOOT_GWD_DEVICE,
  REQUEST_MP_LET_GWD_DEVICE_BEEP,
  REQUEST_MP_LET_SNMP_DEVICE_REBOOT,
  RESPONSE_RP_LET_SNMP_DEVICE_REBOOT,
  REQUEST_MP_LET_SNMP_DEVICE_BEEP,
  REQUEST_MP_OPEN_TELNET
} from '../../../main/utils/IPCEvents'

const rebootResultListener = (dispatch) => (event, arg) => {
  console.log(arg)
  if (arg.success) {
    dispatch(
      openAlertDialog({
        alertType: 'successAlert',
        alertText: 'Device reboot success.'
      })
    )
  } else {
    dispatch(
      openAlertDialog({
        alertType: 'errorAlert',
        alertText: 'Device reboot error.'
      })
    )
  }
}

export const requestDeviceReboot =
  (param = {}) =>
  (dispatch) => {
    // console.log(param)
    const { MACAddress, IPAddress, deviceType } = param
    if (deviceType === 'snmp' || deviceType === 'all') {
      window.electron.ipcRenderer.once(
        RESPONSE_RP_LET_SNMP_DEVICE_REBOOT,
        rebootResultListener(dispatch)
      )
      window.electron.ipcRenderer.send(REQUEST_MP_LET_SNMP_DEVICE_REBOOT, { MACAddress })
    } else if (deviceType === 'gwd') {
      window.electron.ipcRenderer.once(
        RESPONSE_RP_REBOOT_GWD_DEVICE,
        rebootResultListener(dispatch)
      )
      window.electron.ipcRenderer.send(REQUEST_MP_REBOOT_GWD_DEVICE, { MACAddress, IPAddress })
    }
  }

export const requestDeviceBeep =
  (param = {}) =>
  () => {
    const { MACAddress, deviceType, IPAddress } = param
    if (deviceType === 'snmp' || deviceType === 'all') {
      window.electron.ipcRenderer.send(REQUEST_MP_LET_SNMP_DEVICE_BEEP, { MACAddress })
    } else if (deviceType === 'gwd') {
      window.electron.ipcRenderer.send(REQUEST_MP_LET_GWD_DEVICE_BEEP, {
        MACAddress,
        IPAddress
      })
    }
  }

export const requestOpenTelnet = (param) => () => {
  // console.log(param)
  window.electron.ipcRenderer.send(REQUEST_MP_OPEN_TELNET, param)
}

const deviceBasicOperatorSlice = createSlice({
  name: 'deviceBasicOperatorSlice',
  initialState: {},
  reducers: {}
})
export default deviceBasicOperatorSlice
