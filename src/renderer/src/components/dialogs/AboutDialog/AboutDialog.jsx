/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Typography } from 'antd'
import React from 'react'
import icon from '../../../../../../resources/icons/256x256.png'
import { useSelector } from 'react-redux'
import { UIControlSelector } from '../../../features/UIControllSlice'

const AboutDialog = ({ onClose }) => {
  const { Title } = Typography
  const APP_NAME = 'Network Management Utility'
  const { version } = useSelector(UIControlSelector)
  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      title="ABOUT"
      open
      onOk={onClose}
      onCancel={onClose}
      okText="close"
      cancelButtonProps={{
        style: { display: 'none' }
      }}
    >
      <img src={icon} alt="icon" />
      <Typography>
        <Title level={2} data-testid="title">{`${APP_NAME} ${version}`}</Title>
      </Typography>
    </Modal>
  )
}

export default AboutDialog
