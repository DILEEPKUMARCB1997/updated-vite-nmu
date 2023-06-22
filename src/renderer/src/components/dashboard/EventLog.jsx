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

const EventLog = (props) => {
  const { tableData, data } = props

  const { customGraphData } = useSelector(dashboardSelector)
  // console.log(customGraphData)
  const dispatch = useDispatch()

  const [series, setSeries] = useState([
    {
      name: 'Information',
      color: 'rgba(70, 179, 0,0.95)',
      data: [0, 1, 2, 3, 4, 5]
    },
    {
      name: 'Warning',
      color: 'rgba(245, 127, 23,0.95)',
      data: [0, 1, 2, 3, 4, 5]
    },
    {
      name: 'Critical',
      color: 'rgba(213, 0, 0,0.95)',
      data: [0, 1, 2, 3, 4, 5]
    }
  ])
  const [options, setOptions] = useState({
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
      categories: customGraphData.label,
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
      // title: {
      //   text: '123'
      // },

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
  })

  useEffect(() => {
    dispatch(
      requestHistoryData({
        type: 'custom',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }, [])

  const onCustomGraphClick = () => {
    dispatch(showCustomTableData(tableData))
  }

  const handleRefreshGraph = () => {
    setSeries(series)
    setOptions(options)
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
    <div id="chart">
      <div
        style={{
          padding: '0px 5px',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'blue',
          fontSize: '18px'
        }}
      >
        <div style={{ fontSize: '15px' }}>{customGraphData.lastUpdated}</div>
        <Button
          title="Refresh"
          icon={<SyncOutlined />}
          style={{ padding: '5px' }}
          onClick={handleRefreshGraph}
        ></Button>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        data={data === null ? {} : data}
        onClick={onCustomGraphClick}
      />
    </div>
  )
}
export default EventLog
