/* eslint-disable no-unused-vars */
import React from 'react'
import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'
import { Input } from 'antd'
// import className from 'classnames'
import {
  setFWUpdateBatchQuantity,
  advancedSelector,
  setFWUpdateConnectionTimeout
} from '../../../../features/Preferences/advancedSlice'
import { useDispatch, useSelector } from 'react-redux'
// import './FirmwareUpdate.css'

const TITLE = 'Firmware Update'
const BATCH_QUANTITY_INPUT_LABLE = 'Batch Quantity'
const CONNECTION_TIMEOUT_INPUT_LABLE = 'Connection Timeout'

const FirmwareUpdate = () => {
  const dispatch = useDispatch()
  const { isFWUpdateBatchQuantityValid, isFWUpdateConnTimeoutValid } = useSelector(advancedSelector)

  const handleFWUpdateBatchQuantityInputOnChange = (event) => {
    dispatch(setFWUpdateBatchQuantity(event.target.value))
  }
  const handleConnectionTimeoutInputOnChange = (event) => {
    dispatch(setFWUpdateConnectionTimeout(event.target.value))
  }

  return (
    <EnhanceSubContent title={TITLE}>
      <div>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black' }}>
          {BATCH_QUANTITY_INPUT_LABLE}
        </span>
        <Input
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            height: '30px',
            width: '80px',
            paddingLeft: '3px',
            marginLeft: '60px'
          }}
          onChange={handleFWUpdateBatchQuantityInputOnChange}
        ></Input>
      </div>
      <div style={{ marginTop: '15px' }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'black' }}>
          {CONNECTION_TIMEOUT_INPUT_LABLE}
        </span>
        <Input
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            height: '30px',
            width: '80px',
            paddingLeft: '3px',
            marginLeft: '20px'
          }}
          suffix="ms"
          onChange={handleConnectionTimeoutInputOnChange}
        />
      </div>
    </EnhanceSubContent>
  )
}

export default FirmwareUpdate
