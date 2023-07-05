/* eslint-disable no-unused-vars */
import React from 'react'
import EnhanceSubContent from '../../EnhanceSubContent/EnhanceSubContent'
import { Input } from 'antd'
import {
  setFWUpdateBatchQuantity,
  advancedSelector
} from '../../../../features/Preferences/advancedSlice'
import { useDispatch, useSelector } from 'react-redux'

const TITLE = 'Firmware Update'
const BATCH_QUANTITY_INPUT_LABLE = 'Batch Quantity'

const FirmwareUpdate = () => {
  const dispatch = useDispatch()
  const { isFWUpdateBatchQuantityValid } = useSelector(advancedSelector)
  const handleFWUpdateBatchQuantityInputOnChange = (event) => {
    dispatch(setFWUpdateBatchQuantity(event.target.value))
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
    </EnhanceSubContent>
  )
}

export default FirmwareUpdate
