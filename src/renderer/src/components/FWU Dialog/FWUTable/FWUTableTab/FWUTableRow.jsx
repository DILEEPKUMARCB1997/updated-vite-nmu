/* eslint-disable react/prop-types */
import React from 'react'
import { Table, Progress } from 'antd'
//import PropTypes from 'prop-types';
import Code from '../../Code/Code'
const rowData = ['model', 'IPAddress', 'MACAddress']

const FWUTableRow = ({ MACAddress, IPAddress, model }) => {
  const columns = [
    rowData.map((row) => ({ title: row, dataIndex: row, key: row })),
    {
      title: ' Update Progress',
      key: 'updateProgress',
      render: () => <Progress type="primary" MACAddress={MACAddress} />
    },
    { title: 'Code', key: 'code', render: () => <Code MACAddress={MACAddress} /> }
  ]

  const data = [{ key: MACAddress, MACAddress, IPAddress, model }]

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default FWUTableRow
