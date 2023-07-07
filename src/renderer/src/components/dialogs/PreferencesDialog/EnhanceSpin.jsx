/* eslint-disable no-unused-vars */
import React from 'react'
import { Spin } from 'antd'

const EnhanceSpin = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        borderRadius: '4px',
        marginBottom: '20px',
        padding: '30px 50px',
        margin: '20px 0'
      }}
    >
      <Spin tip="Loading" />
    </div>
  )
}

export default EnhanceSpin
