/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { ConfigProvider, Table, Progress } from 'antd'
import { useTheme } from 'antd-style'
import FWUTableTab from './FWUTableTab/FWUTableTab'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'
import Code from '../Code/Code'
import FWUTableRow from './FWUTableTab/FWUTableRow'

const FWUTable = ({ MACAddress, IPAddress, model }) => {
  const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)
  console.log(deviceData)
  const { uploadProgress } = deviceRealTimeData
  console.log(uploadProgress)
  const rowData = ['model', 'IPAddress', 'MACAddress']
  const columns = [
    rowData.map((row) => ({ title: row, dataIndex: row, key: row })),
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'IP Address',
      dataIndex: 'IPAddress',
      key: 'IPAddress'
    },
    {
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      key: 'MACAddress'
    },
    {
      title: ' Progress',
      key: 'Progress',
      render: () => <Progress type="line" size="default" value={uploadProgress} status="active" />
    },
    {
      title: 'Status',
      key: 'status'
      //  render: () => <Code code="MAC Address" />
    }
  ]

  const data = [{ key: MACAddress, MACAddress, IPAddress, model }]

  const token = useTheme()

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorFillAlter: token.colorPrimaryBg,
            fontSize: 14
          }
        }
      }}
    >
      <Table columns={columns} dataSource={data} pagination={false}>
        <FWUTableTab />
        <FWUTableRow />
      </Table>
    </ConfigProvider>
  )
}

export default FWUTable

// {Object.entries(deviceData).map(([key, value]) => (
//   <FWUTableRow
//     key={MACAddress}
//     MACAddress={key}
//     IPAddress={value.IPAddress}
//     model={value.model}
//   />
// ))}
