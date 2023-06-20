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
import './SyslogGraph.css'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

function getRandomInt(min = 1, max = 9) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
var interval1 = null

const SyslogGraph1 = (props) => {
  const dispatch = useDispatch()
  const { syslogGraphData } = useSelector(dashboardSelector)

  const [GraphData, setGraphData] = useState({
    series: [
      {
        name: 'Syslog Message Count',
        data: [0, 1, 2, 3, 4, 5]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'top'
      },
      fill: {
        type: 'solid'
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          dataLabels: {
            position: 'top' // top, center, bottom
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
        categories: syslogGraphData.label,
        position: 'bottom',
        labels: {
          rotate: -45,
          rotateAlways: true
        },
        axisBorder: {
          show: false
        },

        axisTicks: {
          show: false
        },
        fill: {
          type: 'gradient',
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
          text: 'syslog count'
        },

        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },

        labels: {
          show: true,
          formatter: function (val) {
            return val
          }
        }
      }
    }
  })

  const onSyslogGraphClick = (barIndex) => {
    let tableData = tableData[barIndex]
    showSyslogTableData(tableData)
  }
  const handleRefreshGraph = () => {
    dispatch(
      requestHistoryData({
        type: 'syslog',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        requestHistoryData({
          type: 'syslog',
          sourceIP: '',
          ge: '',
          le: ''
        })
      )
    }, 3000)
  }, [])

  return (
    <>
      <div
        style={{
          padding: '0px 5px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ padding: '0px 10px', fontSize: '15px', color: 'green' }}> Syslog Msg</div>
        <div style={{ padding: '0px 10px', color: 'green' }}>{syslogGraphData.lastUpdated}</div>
        <Button
          size="small"
          style={{ padding: '2px' }}
          onClick={handleRefreshGraph}
          title="Refresh"
        >
          <SyncOutlined fontSize="inherit" style={{ color: 'black' }} />
        </Button>
      </div>
      <div className="container">
        <Chart
          options={GraphData.options}
          series={GraphData.series}
          type="bar"
          width="320"
          onClick={onSyslogGraphClick}
        />
      </div>
    </>
  )
}

export default SyslogGraph1
