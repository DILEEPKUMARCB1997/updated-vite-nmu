// // /* eslint-disable no-unused-vars */
// // // /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react'
// import ReactApexChart from 'react-apexcharts'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   dashboardSelector,
//   requestHistoryData
//   // showCustomTableData
// } from '../../features/dashboardSlice'
// import { Button, Tooltip } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'

// const EventLog = () => {
//   const { customGraphData } = useSelector(dashboardSelector)
//   console.log(customGraphData)
//   //const { tableData } = customGraphData
//   const dispatch = useDispatch()
//   const [eventLogData, setEventLogData] = useState({
// series: [
//   {
//     name: 'Information',
//     color: '#46b300',
//     data: []
//   },
//   {
//     name: 'Warning',
//     color: '#F57F17',
//     data: []
//   },
//   {
//     name: 'Critical',
//     color: '#D50000',
//     data: []
//   }
// ],
//     options: {
//       chart: {
//         height: 320,
//         type: 'bar',
//         // stacked: true,
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
//       fill: {
//         type: 'solid'
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 0,
//           columnWidth: '50%',
//           dataLabels: {
//             position: 'top'
//           }
//         }
//       },
//       dataLabels: {
//         enabled: false,
//         formatter: function (val) {
//           return val + '%'
//         }
//       },

//       xaxis: {
//         // type: 'datetime',
//         categories: customGraphData.label,
//         //  ['08/11', '08/12', '08/13', '08/14', '08/15', '08/16', '08/17'],
//         position: 'bottom',
//         labels: {
//           rotate: -45,
//           rotateAlways: true
//         },
//         lines: {
//           show: false
//         },
//         fill: {
//           type: 'solid',
//           gradient: {
//             colorFrom: '#D8E3F0',
//             colorTo: '#BED1E6',
//             stops: [0, 100],
//             opacityFrom: 0.4,
//             opacityTo: 0.5
//           }
//         }
//       },
//       yaxis: {
//         // min: 0,
//         // max: 1,
//         lines: {
//           show: true
//         },
//         labels: {
//           formatter: (val) => {
//             return val / 1
//           }
//         }
//       }
//     }
//   })

//   useEffect(() => {
//     setTimeout(() => {
//       requestHistoryData({
//         type: 'custom',
//         sourceIP: '',
//         ge: '',
//         le: ''
//       })
//     }, 3000)
//   }, [])

//   useEffect(() => {
//     if (Array.isArray(customGraphData.data) && customGraphData.data.length > 0) {
//       setEventLogData((prev) => ({
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

//   const handleRefreshGraph = () => {
//     dispatch(
//       requestHistoryData({
//         type: 'custom',
//         sourceIP: '',
//         ge: '',
//         le: ''
//       })
//     )
//   }

//   return (
//     <div>
//       <div
//         style={{
//           padding: '0px 5px',
//           display: 'flex',
//           justifyContent: 'space-between'
//         }}
//       >
//         <i>{customGraphData.lastUpdated}</i>
//         <Tooltip title="Refresh">
//           <Button icon={<SyncOutlined onClick={handleRefreshGraph} />} />
//         </Tooltip>
//       </div>
//       <ReactApexChart
//         options={eventLogData.options}
//         series={eventLogData.series}
//         type="bar"
//         height={210}
//       />
//     </div>
//   )
// }
// export default EventLog

/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react'
// import Chart from 'react-apexcharts'

// import { useDispatch, useSelector } from 'react-redux'
// import { dashboardSelector, requestHistoryData } from '../../features/dashboardSlice'
// import { Button } from 'antd'
// import { SyncOutlined } from '@ant-design/icons'

// function getRandomInt(min = 1, max = 9) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
// const EventLog = () => {
//   const dispatch = useDispatch()
//   const { customGraphData } = useSelector(dashboardSelector)
//   console.log(customGraphData)

//   const [eventLogData, setEventLogData] = useState({
// series: [
//   {
//     name: 'Information',
//     color: '#46b300',
//     data: []
//   },
//   {
//     name: 'Warning',
//     color: '#F57F17',
//     data: []
//   },
//   {
//     name: 'Critical',
//     color: '#D50000',
//     data: []
//   }
// ],
//     options: {
//       chart: {
//         height: 320,
//         type: 'bar',
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
//       fill: {
//         type: 'solid'
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 0,
//           columnWidth: '50%',
//           dataLabels: {
//             position: 'top'
//           }
//         }
//       },
//       dataLabels: {
//         enabled: false,
//         formatter: function (val) {
//           return val + '%'
//         }
//       },

//       xaxis: {
//         categories: customGraphData.label,
//         position: 'bottom',
//         labels: {
//           rotate: -45,
//           rotateAlways: true
//         },
//         fill: {
//           type: 'solid',
//           gradient: {
//             colorFrom: '#D8E3F0',
//             colorTo: '#BED1E6',
//             stops: [0, 100],
//             opacityFrom: 0.4,
//             opacityTo: 0.5
//           }
//         }
//       },
//       yaxis: {
//         title: {
//           lines: {
//             show: true
//           }
//         }
//       }
//     }
//   })

//   const handleRefreshGraph = () => {
//     dispatch(
//       requestHistoryData({
//         type: 'custom',
//         sourceIP: '',
//         ge: '',
//         le: ''
//       })
//     )
//   }

//   useEffect(() => {
//     setEventLogData(eventLogData)
//     setTimeout(() => {
//       dispatch(
//         requestHistoryData({
//           type: 'custom',
//           sourceIP: '',
//           ge: '',
//           le: ''
//         })
//       )
//     }, 3000)
//   }, [])

//   useEffect(() => {
//     if (Array.isArray(customGraphData.data) && customGraphData.data.length > 0) {
//       setEventLogData((prev) => ({
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

//   return (
//     <>
//       <div
//         style={{
//           padding: '0px 5px',
//           display: 'flex',
//           justifyContent: 'space-between'
//         }}
//       >
//         <div>
//           <i>{customGraphData.lastUpdated}</i>
//         </div>
//         <Button
//           style={{ padding: '5px' }}
//           onClick={handleRefreshGraph}
//           title="Refresh"
//           icon={<SyncOutlined />}
//         />
//       </div>
//       <div>
//         <Chart
//           options={eventLogData.options}
//           series={eventLogData.series}
//           type="bar"
//           height={210}
//           width={400}
//         />
//       </div>
//     </>
//   )
// }

// export default EventLog

/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  showSyslogTableData
} from '../../features/dashboardSlice'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

function getRandomInt(min = 1, max = 9) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const EventLog = (props) => {
  const dispatch = useDispatch()
  const { customGraphData } = useSelector(dashboardSelector)
  console.log(customGraphData)

  const [eventLogData, setEventLogData] = useState({
    series: [
      {
        name: 'Information',
        color: '#46b300',
        data: []
      },
      {
        name: 'Warning',
        color: '#F57F17',
        data: []
      },
      {
        name: 'Critical',
        color: '#D50000',
        data: []
      }
    ],
    options: {
      chart: {
        height: 320,
        type: 'bar',
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
      fill: {
        type: 'solid'
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          columnWidth: '50%',
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + '%'
        }
      },

      xaxis: {
        categories: customGraphData.label,
        // type: 'datetime',
        //    categories: customGraphData.label,
        // ['08/11', '08/12', '08/13', '08/14', '08/15', '08/16', '08/17'],
        position: 'bottom',
        labels: {
          rotate: -45,
          rotateAlways: true
        },
        fill: {
          type: 'solid',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      yaxis: {
        title: {
          lines: {
            show: true
          }
        }
      }
    }
  })

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

  useEffect(() => {
    setEventLogData(eventLogData)
    setTimeout(() => {
      dispatch(
        requestHistoryData({
          type: 'custom',
          sourceIP: '',
          ge: '',
          le: ''
        })
      )
    }, 3000)
  }, [])

  useEffect(() => {
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

  return (
    <>
      <div
        style={{
          padding: '0px 5px',
          display: 'flex',
          justifyContent: 'space-between'
          // fontSize: '15px'
        }}
      >
        <div>
          <i>{customGraphData.lastUpdated}</i>
        </div>
        <Button
          style={{ padding: '5px' }}
          onClick={handleRefreshGraph}
          title="Refresh"
          icon={<SyncOutlined />}
        />
      </div>
      <div>
        <Chart
          // data={GraphData.data === null ? {} : GraphData.data}
          options={eventLogData.options}
          series={eventLogData.series}
          type="bar"
          height={210}
          width={400}
          // onClick={onSyslogGraphClick}
        />
      </div>
    </>
  )
}

export default EventLog
