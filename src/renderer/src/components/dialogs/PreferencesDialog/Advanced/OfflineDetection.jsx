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
  const { advancedData, validsData, isConfigChange } = useSelector(advancedSelector)
  const { offlinePollInterval, offlineTimeout } = advancedData
  const { isOfflinePollIntervalValid, isOfflineTimeoutValid } = validsData

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
          fontSize: '20px',
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
            status={isOfflinePollIntervalValid ? null : 'error'}
            style={{ width: '150px', marginLeft: '10px' }}
            addonAfter="sec"
            maxLength={2}
            controls={false}
            defaultValue={offlinePollInterval}
            onChange={handleOfflinePollIntervalInputOnChange}
            data-testid="offlineInterval"
          />
        </Form.Item>
        <Form.Item
          colon={false}
          style={{ fontWeight: 'bolder' }}
          label={<p style={{ fontSize: '16px' }}>Timeout</p>}
        >
          <InputNumber
            status={isOfflineTimeoutValid ? null : 'error'}
            style={{ width: '150px', marginLeft: '65px' }}
            addonAfter="ms"
            controls={false}
            defaultValue={offlineTimeout}
            onChange={handleOfflineTimeoutInputOnChange}
            data-testid="offlinetimeout"
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default OfflineDetection
