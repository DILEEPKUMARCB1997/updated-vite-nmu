import React from 'react'
import { Table, Typography } from 'antd'

const { Title } = Typography

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

const dataSource = Object.keys(codes).map((code) => ({
  key: code,
  code
}))

const columns = [
  {
    title: 'Status',
    key: 'status',
    render: (record) => (
      <Title level={5} type={codes[record.code].type}>
        {codes[record.code].label}
      </Title>
    )
  }
]

const Code = () => {
  return <Table columns={columns} dataSource={dataSource} />
}

export default Code
