/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { ConfigProvider, Table, Progress } from 'antd'
import { useTheme } from 'antd-style'
import FWUTableTab from './FWUTableTab/FWUTableTab'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'
// import Code from '../Code/Code'
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
      render: () => (
        <Progress
          type="line"
          size="default"
          value={uploadProgress}
          status="active"
          percent={30}
          showInfo={false}
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data, status) => {
        const statusRenderer = () => {
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
              return <span style={{ color: 'green' }}>Update Successful</span>
            case 'E001':
            case 'E007':
              return <span style={{ color: 'red' }}>Upload Fail</span>
            case 'TO':
              return <span style={{ color: 'red' }}>Connect Timeout</span>
            default:
              return <span>{status}</span>
          }
        }
        return data ? statusRenderer : null
      }
    }
  ]
  // console.log(Code)
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
