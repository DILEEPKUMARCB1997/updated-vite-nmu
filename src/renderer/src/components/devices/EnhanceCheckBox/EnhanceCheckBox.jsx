/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Checkbox } from 'antd'
import { discoverySelector } from '../../../features/discoverySlice'
import { useSelector } from 'react-redux'
import './EnhanceCheckBox.css'

const EnhanceCheckBox = (props) => {
  const { showCheckBox } = useSelector(discoverySelector)
  const handleCheckBoxChange = (event, checked) => {
    props.handleCheckBoxChange(checked)
  }
  return (
    <div className={`${'cell'} ${showCheckBox ? 'cellVisible' : null}`}>
      {!props.disable && props.model !== 'Cisco CGS2520' && (
        <Checkbox
          className={props.parents === 'header' ? 'headerCell ' : null}
          disabled={props.disable}
          checked={props.isSelect}
          onChange={handleCheckBoxChange}
        />
      )}
    </div>
  )
}

export default EnhanceCheckBox
