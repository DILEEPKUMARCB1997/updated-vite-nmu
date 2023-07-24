import { Card, Col, Drawer, Modal, Row, Typography, theme } from 'antd'
import React from 'react'
import Settings from './Settings/Settings'
import DeviceList from './DeviceList/DeviceList'
import { ShareAltOutlined } from '@ant-design/icons'

const NetworkSettingDialog = ({ onClose }) => {
  return (
    <Modal
      // title={
      //   <Typography.Title level={5}>
      //     <ShareAltOutlined /> Network Setting
      //   </Typography.Title>
      // }
      title="Network Setting"
      open
      style={{ top: 20 }}
      onCancel={onClose}
      onOk={onClose}
      maskClosable={false}
      width={1000}
      closable={false}
      okText="start"
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
