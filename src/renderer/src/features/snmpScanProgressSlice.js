/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_APP_INITIAL_DATA,
  RESPONSE_RP_GET_APP_INITIAL_DATA
} from '../../../main/utils/IPCEvents'

const status = {
  i: 'SNMP Scan ...',
  m: 'SNMP Scan ...',
  s: 'SNMP Scan ...',
  a: 'Scan Finish!'
}

const snmpScanProgressSlice = createSlice({
  name: 'snmpScanProgressSlice',
  initialState: {
    progress: 10,
    scanStatus: 'ICMP Scan ...'
  },
  reducers: {
    changeSnmpScanStep: (state, { payload }) => {
      return createNextStepState(state, payload)
    },
    clearSnmpScanProgress: () => {
      return {
        progress: 10,
        scanStatus: 'ICMP Scan ...'
      }
    }
  }
})

export const { changeSnmpScanStep, clearSnmpScanProgress } = snmpScanProgressSlice.actions

export const snmpScanProgressSelector = (state) => {
  const { progress, scanStatus } = state.snmpScanProgress
  return { progress, scanStatus }
}

export default snmpScanProgressSlice

const createNextStepState = (state, newValue) => {
  const keys = Object.keys(status)
  const progress = (keys.indexOf(newValue) + 1) * (100 / keys.length)
  return {
    ...state,
    progress,
    scanStatus: status[newValue]
  }
}
