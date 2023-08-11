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
          columnWidth: '50%',
          dataLabels: {
            position: 'top'
          }
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
    // dispatch(requestHistoryData(customGraphData))
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
