import { createSlice } from '@reduxjs/toolkit'
import {
  RESPONSE_RP_SINGLE_BACKUP_SELECT_FOLDER,
  REQUEST_MP_SINGLE_BACKUP_SELECT_FOLDER,
  RESPONSE_RP_SINGLE_BACKUP_CONFIG,
  REQUEST_MP_SINGLE_BACKUP_CONFIG,
  RESPONSE_RP_SINGLE_RESTORE_SELECT_FILE,
  REQUEST_MP_SINGLE_RESTORE_SELECT_FILE,
  RESPONSE_RP_SINGLE_RESTORE_CONFIG,
  REQUEST_MP_SINGLE_RESTORE_CONFIG,
  RESPONSE_RP_SINGLE_BACKUP_RESTORE_DATA,
  REQUEST_MP_SINGLE_BACKUP_RESTORE_DATA
} from '../../../main/utils/IPCEvents'
import { initBackupRestoreData } from './backupRestoreSlice'
import { openDialog } from './dialogSlice'

export const requestGetBackupRestoreData = (payload) => (dispatch) => {
  const { MACAddress } = payload
  window.electron.ipcRenderer.once(RESPONSE_RP_SINGLE_BACKUP_RESTORE_DATA, (event, arg) => {
    const { backupPath } = arg.data
    dispatch(initBackupRestoreData({ MACAddress, backupPath }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SINGLE_BACKUP_RESTORE_DATA, { MACAddress })
  dispatch('singleBackupConfig')
}

export const requestBackupSelectFolder = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_SINGLE_BACKUP_SELECT_FOLDER, (event, arg) => {
    const { backupPath } = arg.data
    dispatch(setBackupPath({ backupPath }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SINGLE_BACKUP_SELECT_FOLDER)
}
export const requestBackup = (callback) => (dispatch, getState) => {
  const { MACAddress, backupPath, filename } = getState().singleBackupRestore
  window.electron.ipcRenderer.once(RESPONSE_RP_SINGLE_BACKUP_CONFIG, (event, arg) => {
    callback(arg.success)
    dispatch(changeBackupStatus(false))
  })
  dispatch(changeBackupStatus(true))
  window.electron.ipcRenderer.send(REQUEST_MP_SINGLE_BACKUP_CONFIG, {
    MACAddress,
    backupPath,
    filename
  })
}
export const requestGetBackupRestoreData = (payload) => (dispatch) => {
  const { MACAddress } = payload
  window.electron.ipcRenderer.once(RESPONSE_RP_SINGLE_BACKUP_RESTORE_DATA, (event, arg) => {
    const { backupPath } = arg.data
    dispatch(initBackupRestoreData({ MACAddress, backupPath }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SINGLE_BACKUP_RESTORE_DATA, { MACAddress })
  dispatch(openDialog('singleBackupConfig'))
}

export const requestRestoreSelectFile = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_SINGLE_RESTORE_SELECT_FILE, (event, arg) => {
    const { restorePath } = arg.data
    dispatch(setRestorePath({ restorePath }))
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SINGLE_RESTORE_SELECT_FILE)
}
export const requestRestore = (callback) => (dispatch, getState) => {
  const { MACAddress, restorePath } = getState().singleBackupRestore
  window.electron.ipcRenderer.once(RESPONSE_RP_SINGLE_RESTORE_CONFIG, (event, arg) => {
    callback(arg.success)
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SINGLE_RESTORE_CONFIG, {
    MACAddress,
    restorePath
  })
}

export const singleBackupRestoreSlice = createSlice({
  name: 'singleBackupRestoreSlice',
  initialState: {
    isBackingUP: false,
    MACAddress: '',
    backupPath: '',
    filename: '',
    restorePath: ''
  },
  reducers: {
    initBackupRestoreData: (state, { payload }) => {
      const { MACAddress, backupPath } = payload
      return { ...state, MACAddress, backupPath }
    },
    clearData: (state) => {
      return {
        ...state,
        MACAddress: '',
        backupPath: '',
        filename: '',
        restorePath: ''
      }
    },
    setBackupPath: (state, action) => {
      const { backupPath } = action.payload
      return { ...state, backupPath }
    },
    setBackupFilename: (state, action) => {
      const { filename } = action.payload
      return { ...state, filename }
    },
    changeBackupStatus: (state, action) => {
      return { ...state, isBackingUP: action.payload }
    },
    setRestorePath: (state, action) => {
      const { restorePath } = action.payload
      return { ...state, restorePath }
    }
  }
})

export const {
  initBackupRestoreData,
  clearData,
  setBackupPath,
  setBackupFilename,
  changeBackupStatus,
  setRestorePath
} = singleBackupRestoreSlice.actions
export const singleBackupRestoreSelector = (state) => {
  const { isBackingUP, MACAddress, backupPath, filename, restorePath } = state.singleBackupRestore
  return { isBackingUP, MACAddress, backupPath, filename, restorePath }
}
export default singleBackupRestoreSlice
