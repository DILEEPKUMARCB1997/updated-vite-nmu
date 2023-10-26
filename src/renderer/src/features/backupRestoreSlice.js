import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_BACKUP_CONFIG,
  REQUEST_MP_BACKUP_CONFIG,
  RESPONSE_RP_RESTORE_CONFIG,
  REQUEST_MP_RESTORE_CONFIG,
  RESPONSE_RP_GET_ALL_FILES,
  REQUEST_MP_GET_ALL_FILES,
  RESPONSE_RP_DELETE_CONFIG_FILE,
  REQUEST_MP_DELETE_CONFIG_FILE,
  RESPONSE_RP_GET_CONFIG_FILES,
  REQUEST_MP_GET_CONFIG_FILES
} from '../../../main/utils/IPCEvents'
// import { openDialog } from '../features/dialogSlice'
import { openDialog } from './dialogSlice'

const WAITING = 0
const SUCCESS = 1
const ERROR = 2

export const initBackupRestoreData = () => (dispatch, getState) => {
  const deviceStatus = {}
  const { defaultDeviceData, selected } = getState().discovery

  selected.forEach((MACAddress) => {
    deviceStatus[MACAddress] = {
      IPAddress: defaultDeviceData[MACAddress].IPAddress,
      model: defaultDeviceData[MACAddress].model,
      status: WAITING,
      restoreFile: '',
      files: []
    }
  })

  dispatch(initDeviceStatus({ deviceStatus }))
  dispatch(openDialog('backupRestore'))
  dispatch(requestGetAllFiles())
}

export const requestGetAllFiles = () => (dispatch, getState) => {
  const { deviceStatus } = getState().backupRestore
  const devices = Object.keys(deviceStatus)
  //console.log(deviceStatus);
  //console.log(devices);
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_ALL_FILES, (event, arg) => {
    dispatch(setAllFiles(arg.data))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_ALL_FILES, { devices })
}
export const startTask = (callback) => (dispatch, getState) => {
  dispatch(setTaskRunning(true))
  const { mode, deviceStatus } = getState().backupRestore
  const devices = Object.keys(deviceStatus)
  if (mode === 'backup') {
    window.electron.ipcRenderer.on(
      RESPONSE_RP_BACKUP_CONFIG,
      backupResultListener(callback, dispatch)
    )
    window.electron.ipcRenderer.send(REQUEST_MP_BACKUP_CONFIG, { devices })
  } else {
    const restoreSetting = {}
    Object.entries(deviceStatus).forEach(([MACAddress, data]) => {
      restoreSetting[MACAddress] = data.restoreFile
    })
    window.electron.ipcRenderer.on(
      RESPONSE_RP_RESTORE_CONFIG,
      restoreResultListener(callback, dispatch)
    )
    window.electron.ipcRenderer.send(REQUEST_MP_RESTORE_CONFIG, { restoreSetting })
  }
}

const restoreResultListener = (callback, dispatch) => (event, arg) => {
  console.log('restore arg', arg)
  const { type } = arg
  if (type === 1) {
    callback('There is some problem in restore process.')
    dispatch(updateAllDeviceStatusError())
  } else {
    const { success } = arg
    const { MACAddress } = arg.data
    dispatch(updateDeviceStatus({ MACAddress, success }))
  }

  const { finish } = arg.data
  if (finish) {
    window.electron.ipcRenderer.removeAllListeners(RESPONSE_RP_RESTORE_CONFIG)
    dispatch(setTaskRunning(false))
    dispatch(setIsRestoreFinish())
  }
}
const backupResultListener = (callback, dispatch) => (event, arg) => {
  console.log('back up arg', arg)
  const { type } = arg
  if (type === 1) {
    callback('There is some problem in backup process.')
    // dispatch(updateAllDeviceStatusError())
    dispatch(updateAllDeviceStatusError())
  } else {
    const { success } = arg
    const { MACAddress } = arg.data
    dispatch(updateDeviceStatus({ MACAddress, success }))
  }

  const { finish } = arg.data
  if (finish) {
    window.electron.ipcRenderer.removeAllListeners(RESPONSE_RP_BACKUP_CONFIG)
    dispatch(setTaskRunning(false))
    dispatch(requestGetAllFiles())
  }
}

export const setRestoreFileIndex = (payload) => (dispatch, getState) => {
  const { selectDevice } = getState().backupRestore
  const { file } = payload
  // dispatch({
  //   // type: SET_RESTORE_FILE_INDEX,
  //   // payload: { selectDevice, file }
  //   setRestoreIndexFile({selectDevice})
  // })
  dispatch(setRestoreIndexFile({ selectDevice, file }))
}
export const requestDeleteFile = (payload) => (dispatch, getState) => {
  const { file } = payload
  const { selectDevice } = getState().backupRestore
  window.electron.ipcRenderer.once(RESPONSE_RP_DELETE_CONFIG_FILE, () => {
    dispatch(requestGetConfigFiles())
  })
  window.electron.ipcRenderer.send(REQUEST_MP_DELETE_CONFIG_FILE, {
    MACAddress: selectDevice,
    file
  })
}
export const requestGetConfigFiles = () => (dispatch, getState) => {
  const { selectDevice } = getState().backupRestore
  if (selectDevice !== '') {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_CONFIG_FILES, (event, arg) => {
      const { files } = arg.data
      dispatch(setFiles({ selectDevice, files }))
    })
    window.electron.ipcRenderer.send(REQUEST_MP_GET_CONFIG_FILES, { MACAddress: selectDevice })
  }
}

const backupRestoreSlice = createSlice({
  name: 'backupRestoreSlice',
  initialState: {
    mode: 'backup',
    deviceStatus: {},
    selectDevice: '',
    isTaskRunning: false,
    isRestoreFisish: false
  },
  reducers: {
    changeMode: (state, action) => {
      const { mode } = action.payload
      return { ...state, mode }
    },
    initDeviceStatus: (state, action) => {
      const { deviceStatus } = action.payload
      return { ...state, deviceStatus }
    },
    setTaskRunning: (state, action) => {
      return { ...state, isTaskRunning: action.payload }
    },
    updateAllDeviceStatusError: (state) => {
      const deviceStatus = { ...state.deviceStatus }
      Object.keys(deviceStatus).forEach((MACAddress) => {
        deviceStatus[MACAddress].status = ERROR
      })
      return void { ...state, deviceStatus }
    },
    updateDeviceStatus: (state, action) => {
      const { MACAddress, success } = action.payload
      const deviceStatus = { ...state.deviceStatus }
      // console.log(deviceStatus)
      // console.log(MACAddress)
      deviceStatus[MACAddress].status = success ? SUCCESS : ERROR
      return void {
        ...state,
        deviceStatus
      }
    },
    setIsRestoreFinish: (state) => {
      return { ...state, isRestoreFisish: true }
    },
    setAllFiles: (state, { payload }) => {
      const { files } = payload
      const deviceStatus = { ...state.deviceStatus }
      Object.entries(files).forEach(([MACAddress, data]) => {
        deviceStatus[MACAddress].files = [...data]
        deviceStatus[MACAddress].restoreFile =
          data.length !== 0 ? deviceStatus[MACAddress].files[0] : ''
      })
      // return void { ...state, deviceStatus }
    },
    deviceSelect: (state, action) => {
      const { selectDevice } = action.payload
      return { ...state, selectDevice }
    },
    setRestoreIndexFile: (state, action) => {
      const { selectDevice, file } = action.payload
      const deviceStatus = { ...state.deviceStatus }
      deviceStatus[selectDevice].restoreFile = file
      return void { ...state, deviceStatus }
    },
    setFiles: (state, action) => {
      const { files, selectDevice } = action.payload
      const deviceStatus = { ...state.deviceStatus }
      deviceStatus[selectDevice].files = [...files]
      return void { ...state, deviceStatus }
    },
    clearData: () => {
      return {
        mode: 'backup',
        deviceStatus: {},
        selectDevice: '',
        isTaskRunning: false,
        isRestoreFisish: false
      }
    }
  }
})
export const {
  changeMode,
  clearData,
  setTaskRunning,
  updateAllDeviceStatusError,
  updateDeviceStatus,
  setIsRestoreFinish,
  setAllFiles,
  deviceSelect,
  setRestoreIndexFile,
  setFiles,
  initDeviceStatus
} = backupRestoreSlice.actions

export const backupRestoreSelector = (state) => {
  const { mode, deviceStatus, selectDevice, isTaskRunning, isRestoreFisish } = state.backupRestore
  return { mode, deviceStatus, selectDevice, isTaskRunning, isRestoreFisish }
}

export default backupRestoreSlice

// import { createSlice } from '@reduxjs/toolkit'
// import {
//   REQUEST_MP_GET_CONFIG_FILES,
//   RESPONSE_RP_GET_CONFIG_FILES,
//   REQUEST_MP_BACKUP_CONFIG,
//   RESPONSE_RP_BACKUP_CONFIG,
//   REQUEST_MP_RESTORE_CONFIG,
//   RESPONSE_RP_RESTORE_CONFIG,
//   REQUEST_MP_DELETE_CONFIG_FILE,
//   RESPONSE_RP_DELETE_CONFIG_FILE,
//   REQUEST_MP_GET_ALL_FILES,
//   RESPONSE_RP_GET_ALL_FILES
// } from '../../../main/utils/IPCEvents'
// import { openDialog } from './dialogSlice'

// const WAITING = 0
// const SUCCESS = 1
// const ERROR = 2
// export const initBackupRestoreData = () => (dispatch, getState) => {
//   const deviceStatus = {}
//   const { defaultDeviceData, selected } = getState().discovery

//   selected.forEach((MACAddress) => {
//     deviceStatus[MACAddress] = {
//       IPAddress: defaultDeviceData[MACAddress].IPAddress,
//       model: defaultDeviceData[MACAddress].model,
//       status: WAITING,
//       restoreFile: '',
//       files: []
//     }
//   })

//   dispatch(initDeviceStatus({ deviceStatus }))
//   dispatch(openDialog('backupRestore'))
//   dispatch(requestGetAllFiles())
// }
// export const requestGetAllFiles = () => (dispatch, getState) => {
//   const { deviceStatus } = getState().backupRestore
//   const devices = Object.keys(deviceStatus)
//   //console.log(deviceStatus);
//   //console.log(devices);
//   window.electron.ipcRenderer.once(RESPONSE_RP_GET_ALL_FILES, (event, arg) => {
//     dispatch(setAllFiles(arg.data))
//   })
//   window.electron.ipcRenderer.send(REQUEST_MP_GET_ALL_FILES, { devices })
// }
// export const startTask = (callback) => (dispatch, getState) => {
//   dispatch(setTaskRunning(true))
//   const { mode, deviceStatus } = getState().backupRestore
//   const devices = Object.keys(deviceStatus)
//   if (mode === 'backup') {
//     window.electron.ipcRenderer.on(
//       RESPONSE_RP_BACKUP_CONFIG,
//       backupResultListener(callback, dispatch)
//     )
//     window.electron.ipcRenderer.send(REQUEST_MP_BACKUP_CONFIG, { devices })
//   } else {
//     const restoreSetting = {}
//     Object.entries(deviceStatus).forEach(([MACAddress, data]) => {
//       restoreSetting[MACAddress] = data.restoreFile
//     })
//     window.electron.ipcRenderer.on(
//       RESPONSE_RP_RESTORE_CONFIG,
//       restoreResultListener(callback, dispatch)
//     )
//     window.electron.ipcRenderer.send(REQUEST_MP_RESTORE_CONFIG, { restoreSetting })
//   }
// }

// const backupResultListener = (callback, dispatch) => (event, arg) => {
//   const { type } = arg
//   if (type === 1) {
//     callback('There is some problem in backup process.')
//     dispatch(updateAllDeviceStatusError())
//   } else {
//     const { success } = arg
//     const { MACAddress } = arg.data
//     dispatch(updateDeviceStatus({ MACAddress, success }))
//   }
//   const { finish } = arg.data
//   if (finish) {
//     window.electron.ipcRenderer.removeAllListeners(RESPONSE_RP_BACKUP_CONFIG)
//     dispatch(setTaskRunning(false))
//     dispatch(requestGetAllFiles())
//   }
// }

// const restoreResultListener = (callback, dispatch) => (event, arg) => {
//   const { type } = arg
//   if (type === 1) {
//     callback('There is some problem in restore process.')
//     dispatch(updateAllDeviceStatusError())
//   } else {
//     const { success } = arg
//     const { MACAddress } = arg.data
//     dispatch(updateDeviceStatus({ MACAddress, success }))
//   }

//   const { finish } = arg.data
//   if (finish) {
//     window.electron.ipcRenderer.removeAllListeners(RESPONSE_RP_RESTORE_CONFIG)
//     dispatch(setTaskRunning(false))
//     dispatch(setIsRestoreFinish())
//   }
// }
// export const setRestoreFileIndex = (payload) => (dispatch, getState) => {
//   const { selectDevice } = getState().backupRestore
//   const { file } = payload
//   // dispatch({
//   //   // type: SET_RESTORE_FILE_INDEX,
//   //   // payload: { selectDevice, file }
//   //   setRestoreIndexFile({selectDevice})
//   // })
//   dispatch(setRestoreIndexFile({ selectDevice, file }))
// }
// export const requestDeleteFile = (payload) => (dispatch, getState) => {
//   const { file } = payload
//   const { selectDevice } = getState().backupRestore
//   window.electron.ipcRenderer.once(RESPONSE_RP_DELETE_CONFIG_FILE, () => {
//     dispatch(requestGetConfigFiles())
//   })
//   window.electron.ipcRenderer.send(REQUEST_MP_DELETE_CONFIG_FILE, {
//     MACAddress: selectDevice,
//     file
//   })
// }
// const requestGetConfigFiles = () => (dispatch, getState) => {
//   const { selectDevice } = getState().backupRestore
//   if (selectDevice !== '') {
//     window.electron.ipcRenderer.once(RESPONSE_RP_GET_CONFIG_FILES, (event, arg) => {
//       const { files } = arg.data
//       dispatch(setFiles({ selectDevice, files }))
//     })
//     window.electron.ipcRenderer.send(REQUEST_MP_GET_CONFIG_FILES, { MACAddress: selectDevice })
//   }
// }

// const backupRestoreSlice = createSlice({
//   name: 'backupRestoreSlice',
//   initialState: {
//     mode: 'backup',
//     deviceStatus: {},
//     selectDevice: '',
//     isTaskRunning: false,
//     isRestoreFisish: false
//   },
//   reducers: {
//     initDeviceStatus: (state, action) => {
//       const { deviceStatus } = action.payload
//       return { ...state, deviceStatus }
//     },
//     setAllFiles: (state, action) => {
//       const { files } = action.payload
//       const deviceStatus = { ...state.deviceStatus }
//       Object.entries(files).forEach(([MACAddress, data]) => {
//         deviceStatus[MACAddress].files = [...data]
//         deviceStatus[MACAddress].restoreFile =
//           data.length !== 0 ? deviceStatus[MACAddress].files[0] : ''
//       })
//       return { ...state, deviceStatus }
//     },
//     setTaskRunning: (state, action) => {
//       return { ...state, isTaskRunning: action.payload }
//     },
//     updateAllDeviceStatusError: (state) => {
//       const deviceStatus = { ...state.deviceStatus }
//       Object.keys(deviceStatus).forEach((MACAddress) => {
//         deviceStatus[MACAddress].status = ERROR
//       })
//       return { ...state, deviceStatus }
//     },
//     updateDeviceStatus: (state, action) => {
//       const { MACAddress, success } = action.payload
//       const deviceStatus = { ...state.deviceStatus }
//       // console.log(deviceStatus)
//       // console.log(MACAddress)
//       deviceStatus[MACAddress].status = success ? SUCCESS : ERROR
//       return {
//         ...state,
//         deviceStatus
//       }
//     },
//     setIsRestoreFinish: (state) => {
//       return { ...state, isRestoreFisish: true }
//     }
//   }
// })
// export const {
//   initDeviceStatus,
//   setAllFiles,
//   setTaskRunning,
//   updateAllDeviceStatusError,
//   updateDeviceStatus,
//   setIsRestoreFinish
// } = backupRestoreSlice.actions

// export const backupRestoreSelector = (state) => {
//   const { mode, deviceStatus, selectDevice, isTaskRunning, isRestoreFisish } = state.backupRestore
//   return { mode, deviceStatus, selectDevice, isTaskRunning, isRestoreFisish }
// }
// export default backupRestoreSlice
