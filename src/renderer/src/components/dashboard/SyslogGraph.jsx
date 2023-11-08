/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  showSyslogTableData
} from '../../features/dashboardSlice'
import { Button, Tooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

// function getRandomInt(min = 1, max = 9) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
const SyslogGraph = () => {
  const { syslogGraphData } = useSelector(dashboardSelector)
  const { tableData } = syslogGraphData
  const dispatch = useDispatch()
  console.log('syslog', syslogGraphData)

  const onSyslogGraphClick = (barIndex) => {
    dispatch(showSyslogTableData(tableData[barIndex]))
  }
  const [graphData, setGraphData] = useState({
    series: [
      {
        name: 'Syslog Message Count',
        data: syslogGraphData.data
      }
    ],
    options: {
      chart: {
        height: 320,
        type: 'bar',
        // stacked: true,
        toolbar: {
          show: false
        },
        offsetY: -20,
        offsetX: -5,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (config.selectedDataPoints[0].length > 0) {
              onSyslogGraphClick(config.dataPointIndex)
            }
          }
        }
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
      grid: {
        show: true
      },

      xaxis: {
        categories: syslogGraphData.label,
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
          text: 'syslog count',
          lines: {
            show: true
          }
        }
      }
    }
  })

  const handleRefreshGraph = useCallback(() => {
    dispatch(
      requestHistoryData({
        type: 'syslog',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }, [])

  useEffect(() => {
    dispatch(
      requestHistoryData({
        type: 'syslog',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }, [])

  useEffect(() => {
    if (Array.isArray(syslogGraphData.data) && syslogGraphData.data.length > 0) {
      setGraphData((prev) => ({
        ...prev,
        series: [
          {
            data: syslogGraphData.data
          }
        ],
        options: {
          ...prev.options,
          xaxis: {
            categories: syslogGraphData.label
          }
        }
      }))
    }
  }, [syslogGraphData])

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
        <i>{syslogGraphData.lastUpdated}</i>
        <Tooltip title="Refresh">
          <Button icon={<SyncOutlined />} onClick={handleRefreshGraph} />
        </Tooltip>
      </div>
      <div>
        <Chart options={graphData.options} series={graphData.series} type="bar" height={210} />
      </div>
    </>
  )
}

export default SyslogGraph
