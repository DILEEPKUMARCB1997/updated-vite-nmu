/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Form, Input } from 'antd'
import React from 'react'

const CustomInput = (props) => {
  const { name, label, placeholder, value, onChange, error = null } = props
  return (
    <div>
      {/* <Form.Item name={name} label={label} layout="vertical"> */}
      <Input
        size="large"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
      />
      {/* </Form.Item> */}
    </div>
  )
}

export default CustomInput
