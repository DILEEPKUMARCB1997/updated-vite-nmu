import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SyncOutlined } from '@ant-design/icons'
import {
  dashboardSelector,
  requestHistoryData,
  showTrapTableData
  //updateTrapGraph
} from '../../features/dashboardSlice'
import { Button, Tooltip } from 'antd'
import ReactApexChart from 'react-apexcharts'

const TrapGraphSummary = () => {
  // const { mode } = useThemeStore()
  // const { token } = antdTheme.useToken()
  const { trapGraphData } = useSelector(dashboardSelector)
  const { tableData } = trapGraphData
  const dispatch = useDispatch()

  const snmpTrapMsgData = useMemo(() => {
    return {
      series: [
        {
          name: 'SNMP Trap Message Count',
          data: trapGraphData.data
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
          offsetX: -5,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              if (config.selectedDataPoints[0].length > 0) {
                onTrapGraphClick(config.dataPointIndex)
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
          categories: trapGraphData.label,
          labels: {
            rotate: -45,
            rotateAlways: true
          }
        },
        yaxis: {
          title: {
            text: 'Trap Msg Count',
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
    }
  }, [trapGraphData.data, trapGraphData.label])

  const onTrapGraphClick = (barIndex) => {
    dispatch(showTrapTableData(tableData[barIndex]))
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(requestHistoryData({ type: 'trap', sourceIP: '', ge: '', le: '' }))
    }, 1500)
  }, [])

  const handleRefresh = () => {
    console.log('trapGraph clicked', trapGraphData)
    dispatch(requestHistoryData({ type: 'trap', sourceIP: '', ge: '', le: '' }))
  }

  return (
    <>
      {' '}
      <div
        style={{
          margin: '0px 5px',
          marginTop: '0px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <i>{trapGraphData.lastUpdated}</i>
        <Tooltip title="Refresh">
          <Button icon={<SyncOutlined />} onClick={handleRefresh} />
        </Tooltip>
      </div>
      <div>
        <ReactApexChart
          options={snmpTrapMsgData.options}
          series={snmpTrapMsgData.series}
          type="bar"
          height={210}
          // width={400}
        />
      </div>
    </>
  )
}

export default TrapGraphSummary
