/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Input, Modal } from 'antd'
import React, { useState } from 'react'
import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../../main/utils/IPCEvents'

const RenameGroupDialog = ({ open, onClose, groupId }) => {
  const [renameValue, setRenameValue] = useState('')
  const handleOnOkClick = (e) => {
    e.stopPropagation()
    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'renameGroup',
      groupId,
      groupName: renameValue
    })
    setRenameValue('')
    onClose(e)
  }
  return (
    <Modal
      title="Rename Group"
      width={250}
      okText="Apply"
      open={open}
      onOk={(e) => handleOnOkClick(e)}
      onCancel={(e) => {
        e.stopPropagation()
        setRenameValue('')
        onClose(e)
      }}
      maskClosable={false}
      closable={false}
      forceRender={true}
    >
      <Input
        placeholder="enter group name"
        value={renameValue}
        onChange={(e) => {
          e.stopPropagation()
          setRenameValue(e.target.value)
        }}
      />
    </Modal>
  )
}

export default RenameGroupDialog
