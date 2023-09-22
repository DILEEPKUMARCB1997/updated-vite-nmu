/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react'
import { ConfigProvider, Table, Progress, Button } from 'antd'
import { useTheme } from 'antd-style'
import FWUTableTab from './FWUTableTab/FWUTableTab'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Code from '../Code/Code'
import FWUTableRow from './FWUTableTab/FWUTableRow'

const FWUTable = ({ MACAddress, IPAddress, model, statusRender, theme, columnData }) => {
  const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)
  console.log(deviceData)
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent(current + 1)
  }
  const handleBack = () => {
    setCurrent(current - 1)
  }
  const handleStepChange = (step) => {
    setCurrent({ step })
  }
  const { uploadProgress } = deviceRealTimeData
  console.log(uploadProgress)
  const statusRenderer = (status) => {
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
      render: (data) =>
        //     const statusRenderer = (status) => {
        //       if (status === 'none') {
        //         return <span>Waiting</span>
        //       } else if (status === 'a') {
        //         return <span>Upload Image</span>
        //       } else if (status === 'c') {
        //         return <span>User Cancel</span>
        //       } else if (status === 'S001') {
        //         return <span>Erasing</span>
        //       } else if (status === 'S002') {
        //         return <span style={{ color: 'green' }}>Update Successful</span>
        //       } else if (status === 'E001') {
        //         return <span style={{ color: 'red' }}>Upload Fail</span>
        //       } else if (status === 'TO') {
        //         return <span style={{ color: 'red' }}>Connect Timeout</span>
        //       } else {
        //         return <span>{status}</span>
        //       }
        //     }
        //     return data ? statusRenderer : <span>Error</span>
        //   }
        // }
        data ? (
          <span style={{ color: 'blue' }}>Waiting</span>
        ) : <span>Upload Image</span> ? (
          <span>User Cancel</span>
        ) : <span>Erasing</span> ? (
          <span style={{ color: 'green' }}>Update Successful</span>
        ) : <span style={{ color: 'red' }}>Upload Fail</span> ? (
          <span style={{ color: 'red' }}>Connect Timeout</span>
        ) : null
    }

    // render: () => <Code code="MAC Address" />
  ]

  const dataSource = Object.entries(deviceData).map(([key, value]) => ({
    key,
    model: value.model,
    IPAddress: value.IPAddress,
    MACAddress: key
  }))
  const token = useTheme()

  return (
    <ConfigProvider style={{ boxShadow: token?.Card?.boxShadow }}>
      <Table columns={columns} dataSource={dataSource} />
      <Code />
      {current < columnData && (
        <Button size="small" onClick={handleNext} disabled={current === 1}>
          Finish
          {theme.direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
        </Button>
      )}
      {current > 0 && (
        <Button size="small" onClick={handleBack} disabled={current === 0}>
          {theme.direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
          Updating
        </Button>
      )}
    </ConfigProvider>
  )
}

export default FWUTable

/*
// import React, { useState } from 'react'
// import { Table, Button, ConfigProvider, theme, Progress } from 'antd'
// import { LeftOutlined, RightOutlined } from '@ant-design/icons'
// import { firmwareSelector } from '../../../features/firmwareUpdate'
// import { useSelector } from 'react-redux'
// import { useTheme } from 'antd-style'
// import Code from '../Code/Code'

// const FWUTable = ({ columnData }) => {
//   const { deviceData, deviceRealTimeData, MACAddress } = useSelector(firmwareSelector)
//   console.log(deviceData)
//   const { uploadProgress } = deviceRealTimeData
//   console.log(uploadProgress)
//   const [current, setCurrent] = useState(0)

//   const token = useTheme

//   const columns = [
//     {
//       title: 'Model',
//       dataIndex: 'model',
//       key: 'model'
//     },
//     {
//       title: 'IP Address',
//       dataIndex: 'IPAddress',
//       key: 'IPAddress'
//     },
//     {
//       title: 'MAC Address',
//       dataIndex: 'MACAddress',
//       key: 'MACAddress'
//     },
//     {
//       title: 'Progress',
//       dataIndex: 'progress',
//       key: 'progress',
//       render: () => (
//         <Progress
//           type="line"
//           size="default"
//           value={uploadProgress}
//           status="active"
//           percent={30}
//           showInfo={false}
//         />
//       )
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       // render: () => <Code MACAddress={MACAddress} />
//       render: (status) => {
//         console.log(status)
//         switch (status) {
//           case 'none':
//             return <span>Waiting</span>
//           case 'a':
//             return <span>Upload Image</span>
//           case 'c':
//             return <span>User Cancel</span>
//           case 'S001':
//             return <span>Erasing</span>
//           case 'S002':
//             return <span>Update Successful</span>
//           case 'E001':
//             return <span>Upload Fail(E001)</span>
//           case 'E007':
//             return <span>Upload Fail(E007)</span>
//           case 'TO':
//             return <span>Connect Timeout</span>
//           default:
//             return <span>{status}</span>
//         }
//       }
//     }
//   ]

  // const dataSource = Object.entries(deviceData).map(([key, value]) => ({
  //   key,
  //   model: value.model,
  //   IPAddress: value.IPAddress,
  //   MACAddress: key
  // }))
//   const handleNext = () => {
//     setCurrent(current + 1)
//   }
//   const handleBack = () => {
//     setCurrent(current - 1)
//   }
//   return (
//     <ConfigProvider style={{ boxShadow: token?.Card?.boxShadow }}>
//       <Table columns={columns} dataSource={dataSource} />
//       <Code />
//       {current < columnData && (
//         <Button size="small" onClick={handleNext} disabled={current === 1}>
//           Finish
//           {theme.direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
//         </Button>
//       )}
//       {current > 0 && (
//         <Button size="small" onClick={handleBack} disabled={current === 0}>
//           {theme.direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
//           Updating
//         </Button>
//       )}
//     </ConfigProvider>
//   )
// }
// export default FWUTable
*/
