/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { App, Modal, Typography, Button } from 'antd'
//import { ExclamationCircleOutlined } from '@ant-design/icons'
import { requestDeviceBeep, requestDeviceReboot } from '../../../features/deviceBasiceOperatorSlice'
import { useDispatch } from 'react-redux'

const Beep = ({ IPAddress, MACAddress, deviceType }) => {
  const [isBeepModalVisible, setIsBeepModalVisible] = useState(false)
  const [isRebootModalVisible, setIsRebootModalVisible] = useState(false)
  const dispatch = useDispatch()
  const handleBeep = () => {
    setIsBeepModalVisible(true)
  }
  const handleReboot = () => {
    setIsRebootModalVisible(true)
  }
  const handleBeepModalOk = () => {
    dispatch(
      requestDeviceBeep({
        IPAddress,
        MACAddress,
        deviceType
      })
    )
    setIsBeepModalVisible(false)
  }
  const handleBeepModalCancel = () => {
    setIsBeepModalVisible(false)
  }
  const handleRebootModalOk = () => {
    dispatch(
      requestDeviceReboot({
        MACAddress,
        IPAddress,
        deviceType
      })
    )
    setIsRebootModalVisible(false)
  }
  const handleRebootModalCancel = () => {
    setIsRebootModalVisible(false)
  }
  return (
    <div>
      <Button onClick={handleBeep}>Beep</Button>
      <Modal
        title="Beep Device"
        open={isBeepModalVisible}
        onOk={handleBeepModalOk}
        onCancel={handleBeepModalCancel}
      >
        <p>Are you sure you want to beep the device?</p>
      </Modal>
      <Button onClick={handleReboot}>Reboot</Button>
      <Modal
        title="Reboot Device"
        open={isRebootModalVisible}
        onOk={handleRebootModalOk}
        onCancel={handleRebootModalCancel}
      >
        <p>Are you sure you want to reboot the device?</p>
      </Modal>
    </div>
  )
}
export default Beep

// const Beep = ({ onClose }) => {
//   const { modal } = App.useApp
//   const dispatch = useDispatch()
//   //const [renameValue, setRenameValue] = useState('')
//   const handleBeep = (IPAddress, MACAddress, deviceType) => {
//     dispatch(
//       requestDeviceBeep({
//         IPAddress,
//         MACAddress,
//         deviceType
//       })
//     )
//   }
//   return (
//     <Modal
//       closeIcon
//       bodyStyle={{ textAlign: 'center' }}
//       maskClosable={false}
//       title={
//         <Typography.Title level={3} style={{ textAlign: 'center' }}>
//           <ExclamationCircleOutlined
//             style={{ color: '#FF6347', fontSize: '40px', borderBottom: '50px' }}
//           />
//           <br />
//           Confirm
//         </Typography.Title>
//       }
//       open
//       onOk={onClose}
//       onCancel={onClose}
//       afterOpenChange={handleBeep}
//     >
//       <Typography>
//         <Typography.Title level={5}>This will let device beep.</Typography.Title>
//       </Typography>
//     </Modal>
//   )
// }

// export default Beep
