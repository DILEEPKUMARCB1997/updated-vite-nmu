/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// import React, { useState } from 'react'
// import { ConfigProvider, Table, Progress, Button } from 'antd'
// import { useTheme } from 'antd-style'
// import FWUTableTab from './FWUTableTab/FWUTableTab'
// import { firmwareSelector } from '../../../features/firmwareUpdate'
// import { useSelector } from 'react-redux'
// import { LeftOutlined, RightOutlined } from '@ant-design/icons'
// import Code from '../Code/Code'
// import FWUTableRow from './FWUTableTab/FWUTableRow'

// const FWUTable = ({ MACAddress, IPAddress, model, statusRender, theme, columnData }) => {
//   const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)
//   console.log(deviceData)
//   const [current, setCurrent] = useState(0)

//   const handleNext = () => {
//     setCurrent(current + 1)
//   }
//   const handleBack = () => {
//     setCurrent(current - 1)
//   }
//   const handleStepChange = (step) => {
//     setCurrent({ step })
//   }
//   const { uploadProgress } = deviceRealTimeData
//   console.log(uploadProgress)
//   const statusRenderer = (status) => {
//     switch (status) {
//       case 'none':
//         return <span>Waiting</span>
//       case 'a':
//         return <span>Upload Image</span>
//       case 'c':
//         return <span>User Cancel</span>
//       case 'S001':
//         return <span>Erasing</span>
//       case 'S002':
//         return <span style={{ color: 'green' }}>Update Successful</span>
//       case 'E001':
//       case 'E007':
//         return <span style={{ color: 'red' }}>Upload Fail</span>
//       case 'TO':
//         return <span style={{ color: 'red' }}>Connect Timeout</span>
//       default:
//         return <span>{status}</span>
//     }
//   }
//   const rowData = ['model', 'IPAddress', 'MACAddress']
//   const columns = [
//     rowData.map((row) => ({ title: row, dataIndex: row, key: row })),
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
//       title: ' Progress',
//       key: 'Progress',
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
//       render: (data) =>
//         data ? (
//           <span style={{ color: 'blue' }}>Waiting</span>
//         ) : <span>Upload Image</span> ? (
//           <span>User Cancel</span>
//         ) : <span>Erasing</span> ? (
//           <span style={{ color: 'green' }}>Update Successful</span>
//         ) : <span style={{ color: 'red' }}>Upload Fail</span> ? (
//           <span style={{ color: 'red' }}>Connect Timeout</span>
//         ) : null
//     }
//   ]

//   const dataSource = Object.entries(deviceData).map(([key, value]) => ({
//     key,
//     model: value.model,
//     IPAddress: value.IPAddress,
//     MACAddress: key
//   }))
//   const token = useTheme()

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

// import React from 'react';
// import { Table } from 'antd';
// import PropTypes from 'prop-types';
// import styles from './FWUDoneTable.scss';
// import FWUDoneTableRowContainer from './FWUDoneTableRow/FWUDoneTableRowContainer';

// const columnData = [
//  { key: 'model', label: 'Model' },
//  { key: 'IPAddress', label: 'IP Address' },
//  { key: 'MACAddress', label: 'MAC Address' },
//  { key: 'status', label: 'Status' },
// ];

// const FWUDoneTable = (props) => {
//  const columns = columnData.map(column => ({
//     title: column.label,
//     dataIndex: column.key,
//     key: column.key,
//  }));

//  return (
//     <Table
//       className={styles.table}
//       columns={columns}
//       dataSource={props.FWUDoneDeviceData}
//       rowKey="MACAddress"
//       pagination={false}
//     >
//       {props.FWUDoneDeviceData.map(value => (
//         <FWUDoneTableRowContainer key={value} MACAddress={value} />
//       ))}
//     </Table>
//  );
// };

// FWUDoneTable.propTypes = {
//  FWUDoneDeviceData: PropTypes.array.isRequired,
// };

// export default FWUDoneTable;

import React from 'react'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { Progress, Table } from 'antd'
import { useSelector } from 'react-redux'
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
let code = [codes.none, codes.a, codes.c, codes.S001, codes.S002, codes.E001, codes.E007, codes.TO]
//console.log(codes.type)
const columns = [
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
    sorter: (a, b) => (a.model > b.model ? 1 : -1)
  },
  {
    title: 'IP Address',
    dataIndex: 'IPAddress',
    key: 'IPAddress',
    sorter: (a, b) => (a.IPAddress > b.IPAddress ? 1 : -1)
  },
  {
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    key: 'MACAddress'
  },
  {
    title: 'Progress',
    dataIndex: 'progress',
    key: 'progress',
    render: (data) => {
      return <Progress percent={40} status="active" style={{ width: '150px' }} />
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => {
      const status = code[text]
      return (
        <span
        // style={{
        //   color: status.type === 'normal' ? 'black' : status.type === 'success' ? 'green' : 'red'
        // }}
        >
          WAITING
        </span>
      )
    }
  }
]

const FWUTable = () => {
  const { deviceData, deviceRealTimeData } = useSelector(firmwareSelector)
  const { uploadProgress } = deviceRealTimeData
  console.log(deviceData)
  const data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      code
    })
  }

  // Object.entries(deviceData).map(([key, value]) => ({
  //   key,
  //   MACAddress: key,
  //   IPAddress: value.IPAddress,
  //   model: value.model
  // }))

  return <Table columns={columns} dataSource={data} pagination={false} />
}

export default FWUTable

/*
import React from 'react'
import { Progress, Space, Table, Tag } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Progress percent={50} status="active" />
      </Space>
    )
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
const FWUTable = () => <Table columns={columns} dataSource={data} />
export default FWUTable
*/
