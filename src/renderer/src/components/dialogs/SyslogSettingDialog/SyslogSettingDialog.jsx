/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, Typography, Row, Col, theme } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import DeviceList from './DeviceList/DeviceList'
import SyslogConfiguration from './SyslogConfiguration/SyslogConfiguration'
import { clearData } from '../../../features/trapSettingSlice'
import { useDispatch } from 'react-redux'

const syslogSettingDialog = ({ onClose }) => {
  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDidMount(true)
    }, 200)
    return () => {
      dispatch(clearData())
    }
  }, [])

  const handleCancelButtonOnClick = () => {
    setDidMount(false)
    setTimeout(() => {
      onClose()
    }, 400)
  }
  return (
    <div>
      <Modal
        title={
          <Typography.Title level={4}>
            {' '}
            <CalendarOutlined />- Syslog Server Setting
          </Typography.Title>
        }
        open
        style={{ top: 20, borderBottom: '50px' }}
        onCancel={handleCancelButtonOnClick}
        footer={null}
        maskClosable={false}
        width={1000}
        okText="start"
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={14}>
            {' '}
            <DeviceList didMount={didMount} />
          </Col>
          <Col className="gutter-row" span={10}>
            {' '}
            <SyslogConfiguration didMount={didMount} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default syslogSettingDialog
