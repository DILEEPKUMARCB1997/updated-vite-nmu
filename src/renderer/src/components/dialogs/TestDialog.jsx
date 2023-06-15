import { Modal } from 'antd'
import React from 'react'

const TestDialog = ({ onClose }) => {
  return (
    <Modal title="Basic Modal" open onOk={onClose} onCancel={onClose}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

export default TestDialog
