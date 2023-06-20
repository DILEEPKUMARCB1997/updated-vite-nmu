/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
  const dispatch = useDispatch()

  const [series, setSeries] = useState([
    {
      name: 'Information',
      data: [0, 1, 2, 3, 4, 5]
    },
    {
      name: 'Warning',
      data: [0, 1, 2, 3, 4, 5]
    },
    {
      name: 'Critical',
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
    },
    grid: {
      show: false,
      row: {
        //  colors: ['#000ff', '#f2f2f2']
      }
    }
  })

  useEffect(() => {
    // setSeries(series)
    dispatch(
      requestHistoryData({
        type: 'custom',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }, [series])

  const onCustomGraphClick = () => {
    dispatch(showCustomTableData(tableData))
  }

  const handleRefreshGraph = () => {
    setSeries(series)
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
        Events
        <div style={{ fontSize: '15px' }}>{customGraphData.lastUpdated}</div>
        <Button
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
