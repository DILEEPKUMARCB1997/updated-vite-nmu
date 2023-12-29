/* eslint-disable no-unused-vars */
import { BellOutlined } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateBeepSoundStop } from '../../../features/eventLogSlice'
import { useEffect } from 'react'

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var oscillator
var gainNode

const BuzzerDialog = ({ onClose }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    oscillator = audioCtx.createOscillator()
    gainNode = audioCtx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    gainNode.gain.value = 0.7
    oscillator.frequency.value = 3020
    oscillator.type = 'sine'

    oscillator.start()

    return () => {
      oscillator.stop()
    }
  }, [oscillator])

  const handleCancelButtonOnClick = () => {
    onClose()
    dispatch(updateBeepSoundStop())
  }

  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      maskClosable={false}
      title={
        <Typography.Title style={{ textAlign: 'center' }}>
          <BellOutlined />
        </Typography.Title>
      }
      open
      onOk={onClose}
      onCancel={handleCancelButtonOnClick}
      okText="stop buzzer"
      cancelButtonProps={{
        style: { display: 'none' }
      }}
    >
      <Typography>
        <Typography.Title level={4}>Some New Event Notifications</Typography.Title>
        <Typography.Title level={5}>
          Click &quot;STOP BUZZER&quot; button to stop Buzzer sound
        </Typography.Title>
      </Typography>
    </Modal>
  )
}

export default BuzzerDialog
