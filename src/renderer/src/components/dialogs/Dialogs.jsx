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
import TransferScheduleMemberDialog from './TransferScheduleMemberDialog/TransferScheduleMemberDialog'
import DeviceAdvanceDrawer from '../Drawer/DeviceAdvancedDrawer/DeviceAdvanceDrawer'
import PortInformationDrawer from '../Drawer/PortInformationDrawer/PortInformationDrawer'
import SingleNetworkSettingDrawer from '../Drawer/SingleNetworkSettingDrawer/SingleNetworkSettingDrawer'
import SingleBackupConfigDialog from './SingleBackupConfigDialog/SingleBackupConfigDialog'
import BuzzerDialog from './BuzzerDialog/BuzzerDialog'
import Beep from './BeepDialog/BeepDialog'
import CustomGraphTableDialog from './CustomGraphTableDialog/CustomGraphTableDialog'
import TopologyAddModal from '../topology/TopologyAddModal/TopologyAddModal'
import TrapGraphTableDialog from './TrapGraphTableDialog/TrapGraphTableDialog'
//import CustomHistoryDialog from './CustomHistoryDialog/CustomHistoryDialog'
import SyslogGraphTableDialog from './SyslogGraphTableDialog/SyslogGraphTableDialog'

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
          syslogSetting: <SyslogSettingDialog onClose={onClose} />,
          transferScheduleMember: <TransferScheduleMemberDialog onClose={onClose} />,
          advanceSetting: <DeviceAdvanceDrawer onClose={onClose} />,
          singleNetworkSetting: <SingleNetworkSettingDrawer onClose={onClose} />,
          singleBackupConfig: <SingleBackupConfigDialog onClose={onClose} />,
          portInformation: <PortInformationDrawer onClose={onClose} />,
          buzzer: <BuzzerDialog onClose={onClose} />,
          beep: <Beep onClose={onClose} />,
          TopologyAddModal: <TopologyAddModal onClose={onClose} />,
          customGraphTable: <CustomGraphTableDialog onClose={onClose} />,
          trapGraphTable: <TrapGraphTableDialog onClose={onClose} />,
          //  customHistory: <CustomHistoryDialog onClose={onClose} />,
          syslogGraphTable: <SyslogGraphTableDialog onClose={onClose} />
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
