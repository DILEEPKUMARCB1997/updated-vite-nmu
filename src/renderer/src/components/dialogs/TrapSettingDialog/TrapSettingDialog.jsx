/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import { Modal, Typography, Row, Col, theme } from 'antd'
import { ClusterOutlined } from '@ant-design/icons'
import DeviceList from './DeviceList/DeviceList'
import TrapConfiguration from './TrapConfiguration/TrapConfiguration'
import { clearData } from '../../../features/trapSettingSlice'
import { useDispatch } from 'react-redux'

const TrapSettingDialog = ({ onClose }) => {
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
            <ClusterOutlined /> - Trap Configuration
          </Typography.Title>
        }
        open
        onCancel={handleCancelButtonOnClick}
        width={1000}
        maskClosable={false}
        // bodyStyle={{
        //   height: '520px'
        // }}
        style={{
          top: '20px'
        }}
        footer={null}
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={14}>
            {' '}
            <DeviceList didMount={didMount} />
          </Col>
          <Col className="gutter-row" span={10}>
            {' '}
            <TrapConfiguration didMount={didMount} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default TrapSettingDialog
