/* eslint-disable no-unused-vars */
import React from 'react'
import DeviceDefaultSetting from './DeviceDefaultSetting'
import FirmwareUpdate from './FirmwareUpdate'
import OfflineDetection from './OfflineDetection'
// import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'

const Advanced = () => {
  return (
    <div>
      <DeviceDefaultSetting />
      <OfflineDetection />
      <FirmwareUpdate />
      {/* <EnhanceSubContent /> */}
    </div>
  )
}

export default Advanced
