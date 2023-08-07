/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, dialogSelector } from '../../features/dialogSlice'
import TestDialog from './TestDialog'
import GroupMemberTransferDialog from './groupMemberTransferDialog/GroupMemberTransferDialog'
import TrapHistoryDialog from './TrapHistoryDialog/TrapHistoryDialog'
import SyslogHistoryDialog from './SyslogHistoryDialog/SyslogHistoryDialog'
import EventHistoryDialog from './eventHistoryDialog/EventHistoryDialog'
import AddUserDialog from './userManagementDialogs/AddUserDialog'
import EditUserDialog from './userManagementDialogs/EditUserDialog'
import AboutDialog from './AboutDialog/AboutDialog'
import PreferencesDialog from './PreferencesDialog/PreferencesDialog'
import AddIPRangeDialog from './AddIPRangeDialog/AddIPRangeDialog'
import ResetToDefaultDialog from './ResetToDefaultDialog/ResetToDefaultDialog'
import SNMPScanProgressDialog from './SNMPScanProgressDialog/SNMPScanProgressDialog'
import NetworkSettingDialog from './NetworkSettingsDialog/NetworkSettingDialog'
import ScheduleBackupDialog from './ScheduleBackupDialog/ScheduleBackupDialog'
import BackupRestoreDialog from './BackupRestoreDialog/BackupRestoreDialog'
import TrapSettingDialog from './TrapSettingDialog/TrapSettingDialog'
import FWUDialog from '../FWU Dialog/FWUDialog'
import SyslogSettingDialog from './SyslogSettingDialog/SyslogSettingDialog'
import WebBrowserDialog from './webBrowswerDialog/WebBrowserDialog'

const Dialog = ({ id, onClose, ...rest }) => {
  return (
    <div>
      {
        {
          testDialog: <TestDialog onClose={onClose} />,
          sysLogHistoryDialog: <SyslogHistoryDialog onClose={onClose} />,
          transferMember: <GroupMemberTransferDialog onClose={onClose} />,
          trapHistory: <TrapHistoryDialog onClose={onClose} />,
          eventHistory: <EventHistoryDialog onClose={onClose} />,
          addUser: <AddUserDialog onClose={onClose} />,
          editUser: <EditUserDialog onClose={onClose} />,
          aboutDialog: <AboutDialog onClose={onClose} />,
          addIPRange: <AddIPRangeDialog onClose={onClose} />,
          perferences: <PreferencesDialog onClose={onClose} />,
          snmpScanProgress: <SNMPScanProgressDialog onClose={onClose} />,
          networkSetting: <NetworkSettingDialog onClose={onClose} />,
          scheduleBackup: <ScheduleBackupDialog onClose={onClose} />,
          FWU: <FWUDialog onClose={onClose} />,
          resetToDefault: <ResetToDefaultDialog onClose={onClose} />,
          backupRestore: <BackupRestoreDialog onClose={onClose} />,
          trapSetting: <TrapSettingDialog onClose={onClose} />,
          webBrowser: <WebBrowserDialog onClose={onClose} />,
          syslogSetting: <SyslogSettingDialog onClose={onClose} />
        }[id]
      }
    </div>
  )
}

const Dialogs = () => {
  const { dialogs } = useSelector(dialogSelector)
  const dispatch = useDispatch()
  return dialogs.map((id) => <Dialog key={id} id={id} onClose={() => dispatch(closeDialog(id))} />)
}

export default Dialogs
