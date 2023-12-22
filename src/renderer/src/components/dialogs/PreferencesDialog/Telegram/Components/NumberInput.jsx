/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { InputNumber } from 'antd'
import React from 'react'

const NumberInput = (props) => {
  const { name, placeholder, value, onChange, error = null } = props
  return (
    <InputNumber
      name={name}
      data-testid="number"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size="middle"
      {...(error && { error: true, helperText: error })}
    />
  )
}

export default NumberInput
