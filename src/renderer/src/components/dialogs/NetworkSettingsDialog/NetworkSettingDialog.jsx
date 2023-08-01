import { Card, Col, Drawer, Modal, Row, Typography, theme } from 'antd'
import React, { useState, useEffect } from 'react'
import Settings from './Settings/Settings'
import DeviceList from './DeviceList/DeviceList'
import { ShareAltOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearNetworkSetting,
  networkSettingSelector,
  requestNetworkSetting
} from '../../../features/networkSettingSlice'

const NetworkSettingDialog = ({ onClose }) => {
  const [didMount, setDidMount] = useState(false)
  const dispatch = useDispatch()
  const { status, validNetmask, validGateway, validDNS1, validDNS2, deviceNum, validNum } =
    useSelector(networkSettingSelector)

  const disableCancel = status === 'start'
  const enableStart =
    validDNS1 &&
    validDNS2 &&
    validNetmask &&
    validGateway &&
    deviceNum === validNum &&
    status === 'wait'

  useEffect(() => {
    setTimeout(() => {
      setDidMount(true)
    }, 200)

    return () => {
      dispatch(clearNetworkSetting())
    }
  }, [])

  const handleCancelButtonClick = () => {
    setDidMount(false)
    setTimeout(() => {
      onClose()
    }, 400)
  }

  const handleStartButtonClick = () => {
    dispatch(requestNetworkSetting())
  }

  return (
    <Modal
      title={
        <Typography.Title level={4}>
          <ShareAltOutlined /> - Network Setting
        </Typography.Title>
      }
      // title="Network Setting"
      open
      style={{ top: 20 }}
      onCancel={handleCancelButtonClick}
      onOk={handleStartButtonClick}
      maskClosable={false}
      width={1000}
      closable={false}
      okText="start"
      cancelButtonProps={{ disabled: disableCancel }}
      okButtonProps={{ disabled: !enableStart }}
    >
      <Row gutter={[15]}>
        <Col span={7}>
          <Settings />
        </Col>
        <Col span={17}>
          <DeviceList />
        </Col>
      </Row>
    </Modal>
  )
}

export default NetworkSettingDialog
