import { Modal, Transfer } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearGroupMemberData,
  groupMemberSelector,
  transferMember
} from '../../../features/groupMemberSlice'
import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../../main/utils/IPCEvents'

const GroupMemberTransferDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const { allDevice, memberKeys, groupId, groupName } = useSelector(groupMemberSelector)
  const [disableApply, setdisableApply] = useState(true)

  const handleTransferDataChange = (targetKeys) => {
    dispatch(transferMember(targetKeys))
    setdisableApply(false)
  }

  const renderItem = (item) => {
    const customLabel = (
      <div className="container1">
        <span className="item-span">{item.model}</span>
        <span className="item-span">{item.IPAddress}</span>
        <span className="item-span">{item.MACAddress}</span>
      </div>
    )

    return {
      label: customLabel, // for displayed item
      value: `${item.model} ${item.IPAddress} ${item.MACAddress}` // for title and filter matching
    }
  }

  const handleOkClick = () => {
    let MACAddressList = []
    allDevice.forEach((element) => {
      if (memberKeys.includes(element.key)) {
        MACAddressList = [...MACAddressList, element.MACAddress]
      }
    })

    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'addRemoveDevice',
      groupId,
      MACAddressList
    })
    dispatch(clearGroupMemberData())
    onClose()
  }

  return (
    <Modal
      title={`${groupName} - Edit Group Member`}
      open
      okText="Apply"
      onOk={handleOkClick}
      onCancel={() => {
        onClose()
        dispatch(clearGroupMemberData())
      }}
      width={1120}
      okButtonProps={{ disabled: disableApply }}
      maskClosable={false}
      closable={false}
    >
      <Transfer
        titles={['Non Member', 'Member']}
        dataSource={allDevice}
        listStyle={{
          marginTop: '30px',
          width: 450,
          height: 375
        }}
        searchPlaceholder="Search"
        showSearch
        operations={['Add Member', 'Remove Member']}
        targetKeys={memberKeys}
        onChange={handleTransferDataChange}
        render={renderItem}
      />
    </Modal>
  )
}

export default GroupMemberTransferDialog
