import React from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { firmwareSelector } from '../../../features/firmwareUpdate'
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

const Code = () => {
  const { deviceRealTimeData } = useSelector(firmwareSelector)
  const { code } = deviceRealTimeData
  const code1 =
    codes.S002.type === 'success'
      ? 'green'
      : codes.E001.type === 'error'
      ? 'red'
      : codes.none.label === 'normal'
      ? 'blue'
      : 'null'

  return (
    <div>
      <span>
        <Tag style={{ color: code1 }}>{codes.none.label[code]}</Tag>
      </span>
    </div>
  )
}

export default Code
