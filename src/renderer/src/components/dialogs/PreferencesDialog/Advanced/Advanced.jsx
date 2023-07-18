/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import DeviceDefaultSetting from './DeviceDefaultSetting'
import FirmwareUpdate from './FirmwareUpdate'
import OfflineDetection from './OfflineDetection'
import { clearAdvancedData } from '../../../../features/Preferences/advancedSlice'
import { useDispatch } from 'react-redux'

const Advanced = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clearAdvancedData())
    }
  }, [])
  return (
    <div>
      <DeviceDefaultSetting />
      <OfflineDetection />
      <FirmwareUpdate />
    </div>
  )
}

export default Advanced
