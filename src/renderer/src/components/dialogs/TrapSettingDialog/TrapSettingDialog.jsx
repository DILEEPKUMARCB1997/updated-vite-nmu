/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
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
      setDidMount({ didMount: true })
    }, 200)
    return () => {
      dispatch(clearData())
    }
  }, [])

  const handleCancelButtonOnClick = () => {
    setDidMount({ didMount: false })
    setTimeout(() => {
      onClose()
    }, 400)
  }
  return (
    <div>
      <Modal
        open
        onCancel={onClose}
        width={1000}
        bodyStyle={{
          height: '520px'
        }}
        style={{
          top: '5px'
        }}
        footer={null}
      >
        <Typography.Title
          level={4}
          // style={{
          //   color: 'white',
          //   padding: '15px',
          //   height: '80px',
          //   background: '#2e96f3',
          //   marginBottom: '3px',
          //   backgroundColor: ' linear-gradient(60deg, #6fbbd6, #2e96f3)',
          //   boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)'
          // }}
          style={{ color: token.colorPrimary }}
          onClick={handleCancelButtonOnClick}
        >
          {' '}
          <ClusterOutlined /> Trap Configuration
        </Typography.Title>

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
