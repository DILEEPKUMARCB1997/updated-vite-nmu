/* eslint-disable no-unused-vars */
import React from 'react'
import DeviceDefaultSetting from './DeviceDefaultSetting'
import FirmwareUpdate from './FirmwareUpdate'
import OfflineDetection from './OfflineDetection'

const Advanced = () => {
  return (
    <div>
      <DeviceDefaultSetting />
      <OfflineDetection />
      <FirmwareUpdate />
    </div>
  )
}

export default Advanced
