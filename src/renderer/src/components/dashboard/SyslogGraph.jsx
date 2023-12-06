import React, { useEffect, useMemo } from 'react'
import Chart from 'react-apexcharts'

import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  showSyslogTableData
} from '../../features/dashboardSlice'
import { Button, Tooltip } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

const SyslogGraph = () => {
  const dispatch = useDispatch()
  const { syslogGraphData } = useSelector(dashboardSelector)
  const { tableData, label, lastUpdated, data } = syslogGraphData

  const onSyslogGraphClick = (barIndex) => {
    dispatch(showSyslogTableData(tableData[barIndex]))
  }

  const graphData = useMemo(() => {
    return {
      series: [
        {
          name: 'Syslog Message Count',
          data: data
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
        grid: {
          show: true
        },

        xaxis: {
          categories: label,
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
    }
  }, [label, data])

  useEffect(() => {
    dispatch(requestHistoryData({ type: 'syslog', sourceIP: '', ge: '', le: '' }))
  }, [])

  const handleRefreshGraph = () => {
    console.log('syslogGraph clicked', syslogGraphData)
    dispatch(
      requestHistoryData({
        type: 'syslog',
        sourceIP: '',
        ge: '',
        le: ''
      })
    )
  }

  return (
    <>
      <div
        style={{
          padding: '0px 5px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <i data-testid="custom-element">{lastUpdated}</i>
        <Tooltip title="Refresh">
          <Button icon={<SyncOutlined />} onClick={handleRefreshGraph} />
        </Tooltip>
      </div>
      <div data-testid="syslog">
        <Chart options={graphData.options} series={graphData.series} type="bar" height={210} />
      </div>
    </>
  )
}

export default SyslogGraph
