/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  showCustomTableData
} from '../../features/dashboardSlice'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

function getRandomInt(min = 1, max = 9) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const EventLog = (props) => {
  const { data } = props
  const { customGraphData } = useSelector(dashboardSelector)
  console.log(customGraphData)
  const dispatch = useDispatch()

  const [eventLogData, setEventLogData] = useState({
    series: [
      {
        name: 'Information',
        color: '#46b300',
        data: [0, 1, 2, 3, 4, 5]
      },
      {
        name: 'Warning',
        color: '#F57F17',
        data: [0, 1, 2, 3, 4, 5]
      },
      {
        name: 'Critical',
        color: '#D50000',
        data: [0, 1, 2, 3, 4, 5]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 100,
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
          stops: [0, 50]
        }
      }
    }
  })

  useEffect(() => {
    setTimeout(() => {
      requestHistoryData({
        type: 'syslog',
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

  const onCustomGraphClick = (barIndex) => {
    let tableData = tableData[barIndex]
    showCustomTableData(tableData)
  }

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
        <span>
          <i>{customGraphData.lastUpdated}</i>
        </span>
        <Button
          title="Refresh"
          icon={<SyncOutlined />}
          style={{ padding: '5px' }}
          onClick={handleRefreshGraph}
        ></Button>
      </div>
      <ReactApexChart
        options={eventLogData.options}
        series={eventLogData.series}
        type="bar"
        height={210}
        data={data === null ? {} : data}
        onClick={(e, element) => {
          if (element.length > 0) {
            onCustomGraphClick(element[0]._index)
          }
        }}
      />
    </div>
  )
}
export default EventLog
