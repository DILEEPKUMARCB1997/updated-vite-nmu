/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { Button, theme } from 'antd'
import React from 'react'

const ControlButton = (props) => {
  const { useToken } = theme
  const { token } = useToken()
  const { text, type, color, style, htmlType, background, size, onClick, ...other } = props
  return (
    <Button
      htmlType={htmlType}
      type={type}
      size={size || 'large'}
      onClick={onClick}
      {...other}
      style={{
        ...style,
        marginLeft: '10px',
        background: background || token.colorPrimary,
        color: color || token.colorText
      }}
    >
      {text}
    </Button>
  )
}

export default ControlButton
