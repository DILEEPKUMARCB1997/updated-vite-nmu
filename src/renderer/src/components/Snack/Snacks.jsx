/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSnack, closeSnack, snackSelector } from '../../features/snackSlice'
import BackupRestoreSnack from './BackupRestoreSnack/BackupRestoreSnack'
import ResetToDefaultSnack from './ResetToDefaultSnack/ResetToDefaultSnack'
import FWUSnack from './FWUSnack/FWUSnack'
import SyslogSettingSnack from './syslogSettingSnack/SyslogSettingSnack'
import NetworkSettingSnack from './NetworkSettingSnack/NetworkSettingSnack'
import TrapSettingSnack from './TrapSettingSnack/TrapSettingSnack'

const Snack = ({ id, onClose, ...rest }) => {
  return (
    <div>
      {
        {
          resetToDefault: <ResetToDefaultSnack onClose={onClose} />,
          backupRestore: <BackupRestoreSnack onClose={onClose} />,
          FWU: <FWUSnack onClose={onClose} />,
          syslogSetting: <SyslogSettingSnack onClose={onClose} />,
          networkSetting: <NetworkSettingSnack onClose={onClose} />,
          trapSetting: <TrapSettingSnack onClose={onClose} />
        }[id]
      }
    </div>
  )
}

const Snacks = () => {
  const { snacks } = useSelector(snackSelector)
  const dispatch = useDispatch()
  return snacks.map((id) => <Snack key={id} id={id} onClose={() => dispatch(closeSnack(id))} />)
}

export default Snacks
