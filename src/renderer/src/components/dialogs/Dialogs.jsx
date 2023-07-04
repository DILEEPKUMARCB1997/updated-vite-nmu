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
import PreferencesDialog from './PreferencesDialog/PreferencesDialog'

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
          perferences: <PreferencesDialog onClose={onClose} />
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
