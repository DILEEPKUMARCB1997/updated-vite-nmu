/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector, requestHistoryData } from '../../features/dashboardSlice'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
const EventLog = () => {
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
        type: 'category',
        categories: customGraphData.label,
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

  // useEffect(() => {
  //   //setEventLogData(eventLogData)
  //   setTimeout(() => {
  //     dispatch(
  //       requestHistoryData({
  //         type: 'custom',
  //         sourceIP: '',
  //         ge: '',
  //         le: ''
  //       })
  //     )
  //   }, 3000)
  // }, [])

  // useEffect(() => {
  //   if (Array.isArray(customGraphData.data) && customGraphData.data.length > 0) {
  //     setEventLogData((prev) => ({
  //       ...prev,
  //       series: [
  //         {
  //           data: customGraphData.data
  //         }
  //       ],
  //       options: {
  //         ...prev.options,
  //         xaxis: {
  //           categories: customGraphData.label
  //         }
  //       }
  //     }))
  //   }
  // }, [customGraphData])

  return (
    <>
      <div
        style={{
          padding: '0px 5px',
          display: 'flex',
          justifyContent: 'space-between'
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
          options={eventLogData.options}
          series={eventLogData.series}
          type="bar"
          height={210}
        />
      </div>
    </>
  )
}

export default EventLog
