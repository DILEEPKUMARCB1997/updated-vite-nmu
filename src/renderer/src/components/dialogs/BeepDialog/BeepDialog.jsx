/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { App, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { requestDeviceBeep } from '../../../features/deviceBasiceOperatorSlice'
import { useDispatch } from 'react-redux'

const Beep = ({ onClose }) => {
  const { modal } = App.useApp
  const dispatch = useDispatch()
  //const [renameValue, setRenameValue] = useState('')
  const handleBeep = (IPAddress, MACAddress, deviceType) => {
    dispatch(
      requestDeviceBeep({
        IPAddress,
        MACAddress,
        deviceType
      })
    )
  }
  return (
    <Modal
      closeIcon
      bodyStyle={{ textAlign: 'center' }}
      maskClosable={false}
      title={
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          <ExclamationCircleOutlined
            style={{ color: '#FF6347', fontSize: '40px', borderBottom: '50px' }}
          />
          <br />
          Confirm
        </Typography.Title>
      }
      open
      onOk={onClose}
      onCancel={onClose}
      afterOpenChange={handleBeep}
    >
      <Typography>
        <Typography.Title level={5}>This will let device beep.</Typography.Title>
      </Typography>
    </Modal>
  )
}

export default Beep
