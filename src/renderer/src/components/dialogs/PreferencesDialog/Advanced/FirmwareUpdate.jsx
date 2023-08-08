/* eslint-disable no-unused-vars */
import React from 'react'
import { Input, InputNumber, Form, Divider, theme } from 'antd'
import {
  setFWUpdateBatchQuantity,
  advancedSelector,
  setFWUpdateConnectionTimeout
} from '../../../../features/Preferences/advancedSlice'
import { useDispatch, useSelector } from 'react-redux'

const FirmwareUpdate = () => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  // const { isFWUpdateBatchQuantityValid, isFWUpdateConnTimeoutValid } = useSelector(advancedSelector)
  const { advancedData, validsData, isConfigChange } = useSelector(advancedSelector)
  const { fwUpdateBatchQuantity, fwUpdateConnTimeout } = advancedData
  const { isFWUpdateBatchQuantityValid, isFWUpdateConnTimeoutValid } = validsData

  const handleFWUpdateBatchQuantityInputOnChange = (value) => {
    console.log(value)
    dispatch(setFWUpdateBatchQuantity(value))
  }
  const handleConnectionTimeoutInputOnChange = (value) => {
    console.log(value)
    dispatch(setFWUpdateConnectionTimeout(value))
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
        Firmware Update
      </Divider>
      <div style={{ marginLeft: '60px', alignItems: 'center' }}>
        <Form.Item
          colon={false}
          style={{ fontWeight: 'bolder' }}
          label={<p style={{ fontSize: '16px' }}>Batch Quantity</p>}
        >
          <InputNumber
            status={isFWUpdateBatchQuantityValid ? null : 'error'}
            style={{ width: '150px', marginLeft: '50px' }}
            defaultValue={fwUpdateBatchQuantity}
            controls={false}
            onChange={handleFWUpdateBatchQuantityInputOnChange}
          />
        </Form.Item>
        <Form.Item
          colon={false}
          style={{ fontWeight: 'bolder' }}
          label={<p style={{ fontSize: '16px' }}>Connection Timeout</p>}
        >
          <InputNumber
            status={isFWUpdateConnTimeoutValid ? null : 'error'}
            style={{ width: '150px', marginLeft: '10px' }}
            addonAfter="ms"
            controls={false}
            defaultValue={fwUpdateConnTimeout}
            onChange={handleConnectionTimeoutInputOnChange}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default FirmwareUpdate
