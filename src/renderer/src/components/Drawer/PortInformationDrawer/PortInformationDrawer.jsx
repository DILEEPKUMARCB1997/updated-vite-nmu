/* eslint-disable no-unused-vars */
import { Button, Col, Drawer, Row, Typography, theme } from 'antd'
import React from 'react'
import DeviceInformation from './DeviceInformation/DeviceInformation'
import TrafficChart from './TrafficChart/TrafficChart'
import PortStatus from './PortStatus/PortStatus'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearPortInfoData,
  openPortInfoDrawer,
  portInformationSelector,
  requestGetPortAndPowerStatus,
  updatePortStatusData,
  updatePowerStatusData,
  waitForPortStatusData
} from '../../../features/portInformationSlice'
import { useEffect } from 'react'
import {
  RESPONSE_RP_GET_PORT_INFORMATION,
  RESPONSE_RP_GET_POWER_STATUS
} from '../../../../../main/utils/IPCEvents'
import { closeDialog } from '../../../features/dialogSlice'

const PortInformationDialog = () => {
  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()

  const { trigger, isPolling, portStatusData, drawerVisible } = useSelector(portInformationSelector)
  var timeout
  const startPoll = () => {
    timeout = setTimeout(() => {
      dispatch(requestGetPortAndPowerStatus())
    }, 3000)
  }

  useEffect(() => {
    // setTimeout(() => {}, 200)
    window.electron.ipcRenderer.on(RESPONSE_RP_GET_PORT_INFORMATION, portInformationListener)
    window.electron.ipcRenderer.on(RESPONSE_RP_GET_POWER_STATUS, powerStatusListener)
    dispatch(requestGetPortAndPowerStatus())
    return () => {
      window.electron.ipcRenderer.removeListener(
        RESPONSE_RP_GET_PORT_INFORMATION,
        portInformationListener
      )
      window.electron.ipcRenderer.removeListener(RESPONSE_RP_GET_POWER_STATUS, powerStatusListener)
      clearTimeout(timeout)
      dispatch(clearPortInfoData())
    }
  }, [])

  useEffect(() => {
    if (portStatusData || trigger) {
      clearTimeout(timeout)
      if (isPolling) {
        startPoll()
      }
    }
  }, [portStatusData, trigger])

  const portInformationListener = (event, arg) => {
    if (!arg.success) {
      dispatch(waitForPortStatusData())
    } else {
      dispatch(updatePortStatusData(JSON.parse(arg.data)))
    }
  }

  const powerStatusListener = (event, arg) => {
    if (arg.success) {
      dispatch(updatePowerStatusData(arg.data))
    }
  }

  const handleCloseButtonClick = () => {
    setTimeout(() => {
      dispatch(openPortInfoDrawer(false), dispatch(closeDialog('portInformation')))
    }, 400)
  }

  return (
    <Drawer
      title={<Typography.Title level={4}> Port Information</Typography.Title>}
      open={drawerVisible}
      width="100%"
      headerStyle={{ backgroundColor: token.colorPrimaryBgHover, paddingBottom: '0px' }}
      bodyStyle={{ backgroundColor: token.colorBgLayout, padding: '10px' }}
      closable={false}
      maskClosable={false}
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button type="primary" style={{ marginRight: '10px' }} onClick={handleCloseButtonClick}>
            Close
          </Button>
        </div>
      }
    >
      <Row gutter={[10, 20]}>
        <Col span={6}>
          <DeviceInformation />
        </Col>
        <Col span={18}>
          <TrafficChart />
        </Col>
        <Col span={24}>
          <PortStatus />
        </Col>
      </Row>
    </Drawer>
  )
}

export default PortInformationDialog
