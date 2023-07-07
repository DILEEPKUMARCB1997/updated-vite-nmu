/* eslint-disable no-unused-vars */
import React from 'react'
import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'
import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setOfflinePollInterval,
  advancedSelector,
  setOfflineTimeout
} from '../../../../features/Preferences/advancedSlice'

const TITLE = 'Offline Detection'
const POLLING_INTERVAL_INPUT_LABLE = 'Polling Interval'
const TIMEOUT_INPUT_LABLE = 'Timeout'
const OfflineDetection = () => {
  const dispatch = useDispatch()
  const { isOfflinePollIntervalValid, isOfflineTimeoutValid } = useSelector(advancedSelector)

  const handleOfflinePollIntervalInputOnChange = (event) => {
    //console.log(event.target.value);
    dispatch(setOfflinePollInterval(event.target.value))
  }
  const handleOfflineTimeoutInputOnChange = (event) => {
    dispatch(setOfflineTimeout(event.target.value))
  }
  return (
    <EnhanceSubContent title={TITLE}>
      <div>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black' }}>
          {POLLING_INTERVAL_INPUT_LABLE}
        </span>
        <Input
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            height: '30px',
            width: '80px',
            paddingLeft: '3px',
            marginLeft: '10px'
          }}
          suffix="sec"
          onChange={handleOfflinePollIntervalInputOnChange}
        ></Input>
      </div>
      <div style={{ marginTop: '15px' }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black' }}>
          {TIMEOUT_INPUT_LABLE}
        </span>
        <Input
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            height: '30px',
            width: '80px',
            paddingLeft: '3px',
            marginLeft: '63px'
          }}
          suffix="ms"
          onChange={handleOfflineTimeoutInputOnChange}
        />
      </div>
    </EnhanceSubContent>
  )
}

export default OfflineDetection
