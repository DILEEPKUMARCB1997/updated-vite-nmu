import React from 'react'
import { Typography } from 'antd'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './Code.css'

const codes = {
  none: { type: 'normal', label: 'Waiting' },
  a: { type: 'normal', label: 'Upload Image' },
  c: { type: 'normal', label: 'User Cancel' },
  S001: { type: 'normal', label: 'Erasing' },
  S002: { type: 'success', label: 'Update Successful' },
  E001: { type: 'error', label: 'Upload Fail(E001)' },
  E007: { type: 'error', label: 'Upload Fail(E007)' },
  TO: { type: 'error', label: 'Connect Timeout' }
}

const Code = ({ code }) => {
  return (
    <Typography.Text className={classNames('codeText', 'normal,error ,success'[codes[code]])}>
      {codes[code]}
    </Typography.Text>
  )
}

Code.propTypes = {
  code: PropTypes.string.isRequired
}

export default Code
