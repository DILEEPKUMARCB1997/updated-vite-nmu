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
// import snackSlice from '../features/snackSlice'
import singleNetworkSettingSlice from '../features/singleNetworkSettingSlice'
import snackSlice from '../features/snackSlice'
import openWebSlice from '../features/openWebSlice'
import deviceAdvanceSettingSlice from '../features/deviceAdvanceSettingSlice'
import deviceBasicOperatorSlice from '../features/deviceBasiceOperatorSlice'
import singleBackupRestoreSlice from '../features/singleBackupRestoreSlice'
import portInformationSlice from '../features/portInformationSlice'

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
    singleNetworkSetting: singleNetworkSettingSlice.reducer,
    snack: snackSlice.reducer,
    openWeb: openWebSlice.reducer,
    deviceAdvanceSetting: deviceAdvanceSettingSlice.reducer,
    deviceBasicOperator: deviceBasicOperatorSlice.reducer,
    singleBackupRestore: singleBackupRestoreSlice.reducer,
    portInformation: portInformationSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})
