import React from 'react'
import { useSelector } from 'react-redux'
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
  console.log(deviceRealTimeData)
  const { code } = deviceRealTimeData
  //console.log(code)
  return (
    <h6
      style={{
        fontSize: '1rem',
        marginTop: '0',
        marginBottom: '0.5rem',
        color:
          codes.type === codes.S002
            ? 'green'
            : codes.type === codes.E001
            ? 'red'
            : codes.type === codes.none
            ? 'blue'
            : 'none'
      }}
    >
      {code}
    </h6>
  )
}

export default Code
