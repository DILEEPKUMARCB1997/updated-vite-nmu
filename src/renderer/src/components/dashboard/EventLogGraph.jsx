/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  showCustomTableData
} from '../../features/dashboardSlice'
import { Button } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

const EventLogGraph = () => {
  const dispatch = useDispatch()
  const { customGraphData } = useSelector(dashboardSelector)
  const { tableData, label, InformationData, WarningData, CriticalData, lastUpdated } =
    customGraphData
  console.log(customGraphData)
  const eventLogData = useMemo(() => {
    return {
      series: [
        {
          name: 'Information',
          color: '#46b300',
          data: InformationData
          // data: [23, 13, 45, 19, 12, 27, 26]
        },
        {
          name: 'Warning',
          color: '#F57F17',
          data: WarningData
          // data: [12, 15, 25, 34, 23, 12, 23]
        },
        {
          name: 'Critical',
          color: '#D50000',
          data: CriticalData
          // data: [40, 13, 34, 26, 27, 19, 12]
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
              console.log('config', config)
              if (config.selectedDataPoints[config.seriesIndex].length > 0) {
                // onCustomGraphClick(config.dataPointIndex)
                dispatch(showCustomTableData(tableData[config.dataPointIndex]))
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
          type: 'category',
          categories: label,
          position: 'bottom',
          labels: {
            rotate: -45,
            rotateAlways: true,
            show: true
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
    }
  }, [InformationData, CriticalData, WarningData, label])

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

  // const onCustomGraphClick = useCallback(
  //   (barIndex) => {
  //     dispatch(showCustomTableData(tableData[barIndex]))
  //   },
  //   [dispatch, tableData]
  // )

  useEffect(() => {
    setTimeout(() => {
      dispatch(requestHistoryData({ type: 'custom', sourceIP: '', ge: '', le: '' }))
    }, 1500)
  }, [])

  // useEffect(() => {
  //   if (Array.isArray(InformationData) && InformationData.length > 0) {
  //     setEventLogData((prev) => ({
  //       ...prev,
  //       series: [
  //         {
  //           data: InformationData
  //         },
  //         {
  //           data: WarningData
  //         },
  //         {
  //           data: CriticalData
  //         }
  //       ],
  //       options: {
  //         ...prev.options,
  //         xaxis: {
  //           categories: label
  //         }
  //       }
  //     }))
  //   }
  // }, [InformationData, WarningData, CriticalData, label])

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
          <i>{lastUpdated}</i>
        </div>
        <Button
          style={{ padding: '5px' }}
          onClick={handleRefreshGraph}
          title="Refresh"
          icon={<SyncOutlined />}
        />
      </div>
      <div>
        <ReactApexChart
          options={eventLogData.options}
          series={eventLogData.series}
          type="bar"
          height={210}
        />
      </div>
    </>
  )
}

export default EventLogGraph
