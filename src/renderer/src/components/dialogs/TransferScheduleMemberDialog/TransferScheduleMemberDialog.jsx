import { Modal, Transfer, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../../main/utils/IPCEvents'
import {
  clearScheduleMemberData,
  requestSetScheduleMember,
  scheduleBackupMemberSelector,
  transferMember
} from '../../../features/scheduleBackupMemberSlice'
import { UserAddOutlined } from '@ant-design/icons'

const GroupMemberTransferDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const { allDevice, memberKeys, scheduleName } = useSelector(scheduleBackupMemberSelector)
  const [disableApply, setdisableApply] = useState(true)

  useEffect(() => {
    return () => {
      dispatch(clearScheduleMemberData())
    }
  }, [])

  const renderItem = (item) => {
    const customLabel = (
      <div className="container">
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

  const handleSaveButtonClick = () => {
    dispatch(requestSetScheduleMember())
    onClose()
  }

  const handleCancelButtonClick = () => {
    onClose()
  }

  const handleTransferDataChange = (targetKeys) => {
    dispatch(transferMember(targetKeys))
    setdisableApply(false)
  }

  return (
    <Modal
      style={{ top: 50 }}
      title={
        <Typography.Title level={4}>
          <UserAddOutlined /> {`${scheduleName} - Edit Schedule Member`}
        </Typography.Title>
      }
      open
      okText="Apply"
      onOk={handleSaveButtonClick}
      onCancel={handleCancelButtonClick}
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
