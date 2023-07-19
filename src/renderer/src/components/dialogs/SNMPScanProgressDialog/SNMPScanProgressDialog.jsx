import { Modal, Progress, Typography } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { snmpScanProgressSelector } from '../../../features/snmpScanProgressSlice'

const SNMPScanProgressDialog = () => {
  const { progress, scanStatus } = useSelector(snmpScanProgressSelector)
  return (
    <Modal
      title="SNMP Scan"
      open
      cancelButtonProps={{
        style: { display: 'none' }
      }}
      okButtonProps={{
        style: { display: 'none' }
      }}
      closeIcon
    >
      <Progress percent={progress} status="active" showInfo={true} />
      <Typography.Title style={{ marginBottom: '0px' }} level={5}>
        {scanStatus}
      </Typography.Title>
    </Modal>
  )
}

export default SNMPScanProgressDialog
