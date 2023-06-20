/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../main/utils/IPCEvents'
import requestCustomGraphData from '../components/dashboard/RequestGraphData'

export const showCustomTableData = (payload) => (dispatch) => {
  dispatch(updateCustomTableData(payload))
  dispatch(openDialog('customGraphTable'))
}
export const requestHistoryData = (param) => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
    const { type, data } = arg
    switch (type) {
      case 'event':
        break
      case 'custom': {
        const resultCustom = requestCustomGraphData(data)
        dispatch(updateCustomGraphData(resultCustom))
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
    updateCustomGraphData: (state, { payload }) => {
      return {
        ...state,
        customGraphData: {
          label: payload.label,
          InformationData: payload.InformationData,
          CriticalData: payload.CriticalData,
          WarningData: payload.WarningData,
          tableData: payload.tableResult,
          lastUpdated: payload.lastUpdated
        }
      }
    },
    updateSyslogGraphData: (state, { payload }) => {
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
    updateSyslogTableData: (state, { payload }) => {
      return {
        ...state,
        syslogTableData: payload
      }
    },
    updateCustomTableData: (state, { payload }) => {
      return {
        ...state,
        customTableData: payload
      }
    },
    updateTrapTableData: (state, { payload }) => {
      return {
        ...state,
        trapTableData: payload
      }
    },
    updateTrapGraph: (state, { payload }) => {
      return {
        ...state,
        trapGraphData: {
          label: payload.label,
          data: payload.data,
          tableData: payload.tableResult,
          lastUpdated: payload.lastUpdated
        }
      }
    },

    // eslint-disable-next-line no-unused-vars
    openDialog: (state) => {
      if (state.dialogs.includes(action.payload)) {
        return state
      }
      return {
        ...state,
        dialogs: [...state.dialogs, action.payload]
      }
    }
  }
})

export const {
  openDialog,
  initDiskUses,
  updateCustomGraphData,
  updateSyslogGraphData,
  updateSyslogTableData,
  updateCustomTableData,
  updateTrapGraph,
  updateTrapTableData
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
