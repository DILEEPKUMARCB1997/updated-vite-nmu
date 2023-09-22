import React from 'react'
import { Badge } from 'antd'
const Code = () => {
  const codes = {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    //   none: { type: 'normal', label: 'Waiting' },
    //   a: { type: 'normal', label: 'Upload Image' },
    //   c: { type: 'normal', label: 'User Cancel' },
    //   S001: { type: 'normal', label: 'Erasing' },
    //   S002: { type: 'success', label: 'Update Successful' },
    //   E001: { type: 'error', label: 'Upload Fail(E001)' },
    //   E007: { type: 'error', label: 'Upload Fail(E007)' },
    //   TO: { type: 'error', label: 'Connect Timeout' }
    render: (status) => {
      console.log(status)
      switch (status) {
        case 'none':
          return <span>Waiting</span>
        case 'a':
          return <span>Upload Image</span>
        case 'c':
          return <span>User Cancel</span>
        case 'S001':
          return <span>Erasing</span>
        case 'S002':
          return <span>Update Successful</span>
        case 'E001':
          return <span>Upload Fail(E001)</span>
        case 'E007':
          return <span>Upload Fail(E007)</span>
        case 'TO':
          return <span>Connect Timeout</span>
        default:
          return <span>{status}</span>
      }
    }
  }
  // }
  return <Badge status={codes.case} />
}
export default Code
