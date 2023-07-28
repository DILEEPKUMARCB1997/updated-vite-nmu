// /* eslint-disable no-unused-vars */
// // /* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector, requestHistoryData } from '../../features/dashboardSlice'
import { Button, Tooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

const EventLog = () => {
  const { customGraphData } = useSelector(dashboardSelector)
  console.log(customGraphData)
  const dispatch = useDispatch()
  const [eventLogData, setEventLogData] = useState({
    series: [
      {
        name: 'Information',
        color: '#46b300',
        data: customGraphData.InformationData
      },
      {
        name: 'Warning',
        color: '#F57F17',
        data: customGraphData.WarningData
      },
      {
        name: 'Critical',
        color: '#D50000',
        data: customGraphData.CriticalData
      }
    ],

    options: {
      chart: {
        type: 'bar',
        height: 320,
        toolbar: {
          show: false
        },
        offsetY: -20,
        offsetX: -5
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetY: 20
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },

      grid: {
        show: true
      },
      xaxis: {
        type: 'category',
        categories: customGraphData.label,
        labels: {
          rotate: -45,
          rotateAlways: true
        }
      },
      yaxis: {
        title: {
          lines: {
            show: true
          }
        }
      },
      fill: {
        type: 'solid',

        gradient: {
          shade: 'lights',
          type: 'horizontal',
          shadeIntensity: 1,
          gradientToColors: undefined,
          inverseColors: false,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    }
  })

  useEffect(() => {
    setTimeout(() => {
      requestHistoryData({
        type: 'custom',
        sourceIP: '',
        ge: '',
        le: ''
      })
    }, 3000)
  }, [])

  useEffect(() => {
    dispatch(requestHistoryData(customGraphData))
    if (Array.isArray(customGraphData.data) && customGraphData.data.length > 0) {
      setEventLogData((prev) => ({
        ...prev,
        series: [
          {
            data: customGraphData.data
          }
        ],
        options: {
          ...prev.options,
          xaxis: {
            categories: customGraphData.label
          }
        }
      }))
    }
  }, [customGraphData])

  const handleRefreshGraph = () => {
    dispatch(
      requestHistoryData({
        type: 'custom',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }

  return (
    <div>
      <div
        style={{
          padding: '0px 5px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <i>{customGraphData.lastUpdated}</i>
        <Tooltip title="Refresh">
          <Button icon={<SyncOutlined onClick={handleRefreshGraph} />} />
        </Tooltip>
      </div>
      <ReactApexChart
        options={eventLogData.options}
        series={eventLogData.series}
        type="bar"
        height={210}
      />
    </div>
  )
}
export default EventLog
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { SyncOutlined } from '@ant-design/icons'
// import {
//   dashboardSelector,
//   requestHistoryData,
//   updateTrapGraph
// } from '../../features/dashboardSlice'
// import { Button, Tooltip, theme as antdTheme } from 'antd'
// import { Card } from 'antd'
// import ReactApexChart from 'react-apexcharts'
// import { useThemeStore } from '../../utils/themes/useStore'

// const EventLog = () => {
//   const { mode } = useThemeStore()
//   const { token } = antdTheme.useToken()
//   const { customGraphData } = useSelector(dashboardSelector)
//   const dispatch = useDispatch()
//   // const { label, data, tableData, lastUpdated } = customGraphData
//   console.log(customGraphData)
//   const [snmpTrapMsgData, setSnmpTrapMsgData] = useState({
//     series: [
//       {
//         name: 'Information',
//         color: '#46b300',
//         data: []
//       },
//       {
//         name: 'Warning',
//         color: '#F57F17',
//         data: []
//       },
//       {
//         name: 'Critical',
//         color: '#D50000',
//         data: []
//       }
//     ],
//     options: {
//       chart: {
//         type: 'bar',
//         // background: token.colorBgContainer,
//         height: 320,
//         toolbar: {
//           show: false
//         },
//         offsetY: -20,
//         offsetX: -5
//       },
//       legend: {
//         show: true,
//         showForSingleSeries: true,
//         position: 'top',
//         horizontalAlign: 'center',
//         offsetY: 20
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 0,
//           columnWidth: '50%'
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         width: 2
//       },

//       grid: {
//         show: true
//       },
//       xaxis: {
//         type: 'category',
//         // categories: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
//         categories: customGraphData.label,
//         labels: {
//           rotate: -45,
//           rotateAlways: true
//         }
//       },
//       yaxis: {
//         title: {
//           // text: 'Trap Msg Count',
//           lines: {
//             show: true
//           }
//         }
//       },
//       fill: {
//         type: 'solid',

//         gradient: {
//           shade: 'lights',
//           type: 'horizontal',
//           shadeIntensity: 1,
//           gradientToColors: undefined,
//           inverseColors: false,
//           opacityFrom: 0.85,
//           opacityTo: 0.85,
//           stops: [50, 0, 100]
//         }
//       }
//     }
//   })

//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(requestHistoryData({ type: 'trap', sourceIP: '', ge: '', le: '' }))
//     }, 1500)
//   }, [])

//   useEffect(() => {
//     if (Array.isArray(customGraphData.data) && customGraphData.data.length > 0) {
//       setSnmpTrapMsgData((prev) => ({
//         ...prev,
//         series: [
//           {
//             data: customGraphData.data
//           }
//         ],
//         options: {
//           ...prev.options,
//           xaxis: {
//             categories: customGraphData.label
//           }
//         }
//       }))
//     }
//   }, [customGraphData])

//   const handleRefresh = () => {
//     dispatch(requestHistoryData({ type: 'custom', sourceIP: '', ge: '', le: '' }))
//   }

//   return (
//     <>
//       {' '}
//       <div
//         style={{
//           margin: '0px 5px',
//           marginTop: '0px',
//           display: 'flex',
//           justifyContent: 'space-between'
//         }}
//       >
//         <i>{customGraphData.lastUpdated}</i>
//         <Tooltip title="Refresh">
//           <Button icon={<SyncOutlined />} onClick={handleRefresh} />
//         </Tooltip>
//       </div>
//       <div>
//         <ReactApexChart
//           options={snmpTrapMsgData.options}
//           series={snmpTrapMsgData.series}
//           type="bar"
//           height={210}
//           width={400}
//         />
//       </div>
//     </>
//   )
// }

// export default EventLog
