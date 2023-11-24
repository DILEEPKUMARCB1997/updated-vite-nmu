import { DeleteFilled, EditOutlined, SettingOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Dropdown, App } from 'antd'
import React, { useState } from 'react'
import { REQUEST_MP_SET_THE_GROUP_DATA } from '../../../../main/utils/IPCEvents'
import RenameGroupDialog from '../dialogs/renameGroupDialog/RenameGroupDialog'
import { useDispatch } from 'react-redux'
import { initGroupMemberData } from '../../features/groupMemberSlice'

const DeviceGroupSettings = ({ groupId, groupName }) => {
  const dispatch = useDispatch()
  const [opend, setOpend] = useState(false)
  const { modal } = App.useApp()

  const handleMenuClick = (e) => {
    e.domEvent.stopPropagation()
    // console.log(e.key, groupId)
    switch (e.key) {
      case 'editGroupName':
        setOpend(true)
        break
      case 'removeGroup':
        modal.confirm({
          title: 'Delete Confirmation !',
          content: 'Are you sure want to delete group ?',
          onOk: () => {
            window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
              cmd: 'deleteGroup',
              groupId
            })
          }
        })

        break
      case 'editMember':
        dispatch(
          initGroupMemberData({
            groupId,
            groupName
          })
        )
        break
      default:
        break
    }
  }
  return (
    <>
      <Dropdown
        placement="bottomRight"
        menu={{
          items: [
            {
              key: 'editGroupName',
              icon: <EditOutlined />,
              label: 'Edit Group Name'
            },
            {
              key: 'removeGroup',
              icon: <DeleteFilled />,
              label: 'Remove Group'
            },
            {
              key: 'editMember',
              icon: <UserAddOutlined />,
              label: 'Edit Member'
            }
          ],
          onClick: handleMenuClick
        }}
      >
        <Button
          type="text"
          icon={<SettingOutlined />}
          onClick={(event) => {
            event.stopPropagation()
          }}
        />
      </Dropdown>
      <RenameGroupDialog
        groupId={groupId}
        onClose={(e) => {
          e.stopPropagation()
          setOpend(false)
        }}
        open={opend}
      />
    </>
  )
}

export default React.memo(DeviceGroupSettings)
