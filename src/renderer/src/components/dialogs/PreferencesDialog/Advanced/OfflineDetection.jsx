/* eslint-disable no-unused-vars */
import React from 'react'
import { Divider, theme, InputNumber, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setOfflinePollInterval,
  setOfflineTimeout,
  advancedSelector
} from '../../../../features/Preferences/advancedSlice'

const OfflineDetection = () => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { advancedData } = useSelector(advancedSelector)
  const { offlinePollInterval, offlineTimeout } = advancedData
  // const { isOfflinePollIntervalValid, isOfflineTimeoutValid } = validsData
  // console.log(offlinePollInterval)
  // console.log(offlineTimeout)

  const handleOfflinePollIntervalInputOnChange = (value) => {
    console.log(value)
    dispatch(setOfflinePollInterval(value))
  }
  const handleOfflineTimeoutInputOnChange = (value) => {
    console.log(value)
    dispatch(setOfflineTimeout(value))
  }
  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginBottom: '15px',
          marginTop: '15px',
          fontSize: '1.5rem',
          color: token.colorPrimary
        }}
      >
        Offline Detection
      </Divider>
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Form.Item
          colon={false}
          style={{ fontWeight: 'bolder' }}
          label={<p style={{ fontSize: '16px' }}>Polling Interval</p>}
        >
          <InputNumber
            style={{ width: '150px', marginLeft: '10px' }}
            addonAfter="sec"
            maxLength={2}
            controls={false}
            defaultValue={offlinePollInterval}
            onChange={handleOfflinePollIntervalInputOnChange}
          />
        </Form.Item>
        <Form.Item
          colon={false}
          style={{ fontWeight: 'bolder' }}
          label={<p style={{ fontSize: '16px' }}>Timeout</p>}
        >
          <InputNumber
            style={{ width: '150px', marginLeft: '65px' }}
            addonAfter="ms"
            controls={false}
            defaultValue={offlineTimeout}
            onChange={handleOfflineTimeoutInputOnChange}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default OfflineDetection
