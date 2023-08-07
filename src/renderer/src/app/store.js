import { configureStore } from '@reduxjs/toolkit'
import userManagementSlice from '../features/userManagementSlice'
import discoverySlice from '../features/discoverySlice'
import dialogSlice from '../features/dialogSlice'
import groupMemberSlice from '../features/groupMemberSlice'
import dashboardSlice from '../features/dashboardSlice'
import eventLogSlice from '../features/eventLogSlice'
import topologySlice from '../features/topologySlice'
import UIControlSlice from '../features/UIControllSlice'
import preferenceSlice from '../features/Preferences/preferenceSlice'
import telegramSlice from '../features/Preferences/telegramSlice'
import advancedSlice from '../features/Preferences/advancedSlice'
import mailSlice from '../features/Preferences/mailSlice'
import generalSlice from '../features/Preferences/generalSlice'
import snmpSlice from '../features/Preferences/snmpSlice'
import resetToDefaultSlice from '../features/resetToDefaultSlice'
import snmpScanProgressSlice from '../features/snmpScanProgressSlice'
import networkSettingSlice from '../features/networkSettingSlice'
import scheduleBackupSlice from '../features/scheduleBackupSlice'
import scheduleBackupMemberSlice from '../features/scheduleBackupMemberSlice'
import backupRestoreSlice from '../features/backupRestoreSlice'
import trapSettingSlice from '../features/trapSettingSlice'
import firmwareSlice from '../features/firmwareUpdate'
// import snmpScanProgressSlice from '../features/snmpScanProgressSlice'
import syslogSettingSlice from '../features/SyslogSettingSlice'
import snackSlice from '../features/snackSlice'
import singleNetworkSettingSlice from '../features/singleNetworkSettingSlice'

export const store = configureStore({
  reducer: {
    userManagement: userManagementSlice.reducer,
    discovery: discoverySlice.reducer,
    dialog: dialogSlice.reducer,
    groupMember: groupMemberSlice.reducer,
    dashboard: dashboardSlice.reducer,
    eventLog: eventLogSlice.reducer,
    topology: topologySlice.reducer,
    UIControl: UIControlSlice.reducer,
    preference: preferenceSlice.reducer,
    general: generalSlice.reducer,
    telegram: telegramSlice.reducer,
    snmp: snmpSlice.reducer,
    advanced: advancedSlice.reducer,
    firmware: firmwareSlice.reducer,
    mail: mailSlice.reducer,
    resetToDefault: resetToDefaultSlice.reducer,
    snmpScanProgress: snmpScanProgressSlice.reducer,
    networkSetting: networkSettingSlice.reducer,
    scheduleBackup: scheduleBackupSlice.reducer,
    scheduleBackupMember: scheduleBackupMemberSlice.reducer,
    syslogSetting: syslogSettingSlice.reducer,
    backupRestore: backupRestoreSlice.reducer,
    trapSetting: trapSettingSlice.reducer,
    // snmpScanProgress: snmpScanProgressSlice.reducer,
    snack: snackSlice.reducer,
    singleNetworkSetting: singleNetworkSettingSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})
