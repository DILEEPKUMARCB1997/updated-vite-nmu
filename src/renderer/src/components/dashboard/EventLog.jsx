/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  showCustomTableData,
  updateCustomGraphData
} from '../../features/dashboardSlice'

import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

const EventLog = (props) => {
  const { tableData, data } = props

  const { customGraphData } = useSelector(dashboardSelector)
  console.log(customGraphData)
  const dispatch = useDispatch()

  const [series, setSeries] = useState([
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
  ])
  const [options, setOptions] = useState({
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
          justifyContent: 'space-between'
        }}
      >
        <div>
          <i>{customGraphData.lastUpdated}</i>
        </div>
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
        height={210}
        data={data === null ? {} : data}
        onClick={onCustomGraphClick}
      />
    </div>
  )
}
export default EventLog
