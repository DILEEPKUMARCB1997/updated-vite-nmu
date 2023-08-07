// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React from 'react'
// import { ConfigProvider, Table, Typography, Row, Card } from 'antd'
// import { useTheme } from 'antd-style'
// import { useSelector } from 'react-redux'
// import { syslogSettingSelector } from '../../../../features/SyslogSettingSlice'

// const SUCCESS = 1
// const ERROR = 2
// const results = ['WAITING', 'SUCCESS', 'ERROR']
// const DeviceList = () => {
//   const { deviceStatus } = useSelector(syslogSettingSelector)
//   console.log(deviceStatus)

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
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status'
//     }
//   ]

//   //const data = [{ key: MACAddress, MACAddress, IPAddress, model }]

//   const token = useTheme()

//   return (
//     <ConfigProvider
//       theme={{
//         inherit: true,
//         components: {
//           Table: {
//             colorFillAlter: token.colorPrimaryBg,
//             fontSize: 14
//           }
//         }
//       }}
//     >
//       <Card
//         size="small"
//         // style={{ width: '100%', height: '100%' }}
//         bordered={false}
//         style={{
//           height: '450px',
//           width: '30rem',
//           //  marginRight: '90px',
//           borderRadius: '4px',
//           boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
//         }}
//         // bodyStyle={{ padding: '5px' }}
//       >
//         <Typography.Title level={5} style={{ color: token.colorPrimary }}>
//           Devices
//         </Typography.Title>
//         <Table columns={columns} pagination={false}>
//           <Typography.Paragraph>
//             {Object.entries(deviceStatus).map(([MACAddress, element]) => (
//               <Row key={MACAddress} style={{ backgroundColor: '#51d1e1' }}>
//                 <Typography.Text>{element.model}</Typography.Text>
//                 <Typography.Text>{MACAddress}</Typography.Text>
//                 <Typography.Text>{element.IPAddress}</Typography.Text>
//                 <Typography.Text
//                   style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', padding: '12px 8px' }}
//                 >
//                   {element.status === SUCCESS && (
//                     <span style={{ color: ' rgb(32, 173, 7)' }}>Success</span>
//                   )}
//                   {element.status === ERROR && <span style={{ color: 'red' }}>Error</span>}
//                   {results[element.status]}
//                 </Typography.Text>
//               </Row>
//             ))}
//           </Typography.Paragraph>
//         </Table>
//       </Card>
//     </ConfigProvider>
//   )
// }

// export default DeviceList

/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { ConfigProvider, Card, Typography, Table, theme } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { syslogSettingSelector } from '../../../../features/SyslogSettingSlice'
import { useSelector } from 'react-redux'

const SUCCESS = 1
const ERROR = 2
const results = ['WAITING', 'SUCCESS', 'ERROR']
const columns = [
  {
    title: 'Modal',
    dataIndex: 'modal',
    key: 'modal',
    sorter: (a, b) => a.modal - b.modal,
    render: (element) => {
      {
        element.modal
      }
    }
  },
  {
    title: 'MAC Address',
    dataIndex: 'MACAddress',
    key: 'MACAddress',
    sorter: (a, b) => a.MACAddress - b.MACAddress,
    render: (element) => {
      {
        element.MACAddress
      }
    }
  },
  {
    title: 'IP Address',
    dataIndex: 'IPAddress',
    key: 'IPAddress',
    sorter: (a, b) => a.IPAddress - b.IPAddress,
    render: (element) => {
      {
        element.IPAddress
      }
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (element) =>
      element ? (
        <span
          style={{
            backgroundColor:
              element.status === SUCCESS ? 'green' : element.status === ERROR ? 'red' : 'gray',
            color: 'white',
            padding: '5px',
            borderRadius: '5px'
          }}
        >
          {results[element.status]}
        </span>
      ) : (
        <span
          style={{
            backgroundColor:
              element.status === ERROR ? 'red' : element.status === SUCCESS ? 'green' : 'gray',
            color: 'white',
            padding: '5px',
            borderRadius: '5px'
          }}
        >
          {results[element.status]}
        </span>
      )
  }
]
const DeviceList = () => {
  const { isTaskRunning, deviceStatus } = useSelector(syslogSettingSelector)
  console.log(isTaskRunning)

  const { useToken } = theme
  const { token } = useToken()
  const dataSource = []
  useEffect(() => {
    dataSource.push(deviceStatus)
    console.log(dataSource)
  }, [])
  return (
    <Card
      title=" Devices"
      size="small"
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
      style={{
        height: '480px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div style={{ height: '400px' }}>
        <div
          style={{
            maxHeight: '295px',
            overflow: 'auto',
            marginTop: '8px',
            marginBottom: '5px',
            padding: '10px'
          }}
        >
          <Table
            rowKey="MACAddress"
            columns={columns}
            dataSource={dataSource}
            style={{ width: '100%' }}
            // onClick={handleDeviceListItemOnClick()}
            // dataSource={data(deviceStatus)}
            pagination={{
              position: ['bottomCenter'],
              showQuickJumper: true,
              size: 'default',
              // total: data(deviceStatus).length,
              defaultPageSize: 10,
              pageSizeOptions: [10, 15, 20, 25],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }}
          ></Table>
        </div>
      </div>
    </Card>
  )
}

export default DeviceList
