/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'
import { requestGraphData, requestCustomGraphData } from '../components/dashboard/requestGraphData'
import { openDialog } from './dialogSlice'

export const showCustomTableData = (payload) => (dispatch) => {
  dispatch(updateCustomTableData(payload))
  dispatch(openDialog('eventGraphTable'))
}

export const showSyslogTableData = (payload) => (dispatch) => {
  dispatch(updateSyslogTableData(payload))
  dispatch(openDialog('syslogGraphTable'))
}
export const showTrapTableData = (payload) => (dispatch) => {
  dispatch(updateTrapTableData(payload))
  dispatch(openDialog('trapGraphTable'))
}
export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.on(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'event':
        break
      case 'custom': {
        const customData = requestCustomGraphData(data)
        dispatch(updateCustomGraph(customData))
        break
      }
      case 'trap': {
        const resultTrap = requestGraphData(data)
        dispatch(updateTrapGraph(resultTrap))
        break
      }
      case 'syslog': {
        const resultSyslog = requestGraphData(data)
        dispatch(updateSyslogGraph(resultSyslog))
        break
      }

      default:
        break
    }
  })

  window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, param)
}

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: {
    diskUses: {},
    trapGraphData: {
      label: [],
      data: [],
      tableData: [],
      lastUpdated: ''
    },
    syslogGraphData: {
      label: [],
      data: [],
      tableData: [],
      lastUpdated: ''
    },
    customGraphData: {
      label: [],
      InformationData: [],
      CriticalData: [],
      WarningData: [],
      tableData: [],
      lastUpdated: ''
    },
    syslogTableData: [],
    trapTableData: [],
    customTableData: []
  },
  reducers: {
    initDiskUses: (state, { payload }) => {
      const { free, size } = payload
      const diskFree = ((free / size) * 100).toFixed(2)
      const diskUsed = (((size - free) / size) * 100).toFixed(2)
      return {
        ...state,
        diskUses: { free, used: size - free, total: size, diskFree, diskUsed }
      }
    },
    updateTrapGraph: (state, { payload }) => {
      const { label, data, tableResult, lastUpdated } = payload
      return {
        ...state,
        trapGraphData: {
          label: label,
          data: data,
          tableData: tableResult,
          lastUpdated: lastUpdated
        }
      }
    },

    updateSyslogGraph: (state, action) => {
      const { payload } = action
      return {
        ...state,
        syslogGraphData: {
          label: payload.label,
          data: payload.data,
          tableData: payload.tableResult,
          lastUpdated: payload.lastUpdated
        }
      }
    },
    updateCustomGraph: (state, { payload }) => {
      const { label, InformationData, CriticalData, WarningData, tableResult, lastUpdated } =
        payload
      return {
        ...state,
        customGraphData: {
          label: label,
          InformationData: InformationData,
          CriticalData: CriticalData,
          WarningData: WarningData,
          tableData: tableResult,
          lastUpdated: lastUpdated
        }
      }
    },

    updateSyslogTableData: (state, action) => {
      return {
        ...state,
        syslogTableData: action.payload
      }
    },
    updateCustomTableData: (state, action) => {
      const { payload } = action
      return {
        ...state,
        customTableData: payload
      }
    },

    updateTrapTableData: (state, { payload }) => {
      return { ...state, trapTableData: payload }
    }
  }
})

export const {
  initDiskUses,
  updateTrapGraph,
  updateSyslogGraph,
  updateSyslogTableData,
  updateTrapTableData,
  updateCustomTableData,
  updateCustomGraph
} = dashboardSlice.actions

export const dashboardSelector = (state) => {
  const {
    diskUses,
    trapGraphData,
    syslogGraphData,
    customGraphData,
    syslogTableData,
    trapTableData,
    customTableData
  } = state.dashboard

  return {
    diskUses,
    trapGraphData,
    syslogGraphData,
    customGraphData,
    syslogTableData,
    trapTableData,
    customTableData
  }
}

export default dashboardSlice
