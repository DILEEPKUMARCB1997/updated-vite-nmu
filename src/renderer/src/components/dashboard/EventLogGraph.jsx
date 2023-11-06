/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import Chart from 'react-apexcharts'
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
  // const { customGraphData } = useSelector(useMemo(() => dashboardSelector, []))
  const { customGraphData } = useSelector(dashboardSelector)
  const { tableData } = customGraphData
  console.log(customGraphData)
  const [eventLogData, setEventLogData] = useState({
    series: [
      {
        name: 'Information',
        color: '#46b300',
        data: customGraphData.InformationData
      },
      {
        name: 'Warning',
        color: '#F57F17',
        data: customGraphData.WarningData
        // data: [10, 15, 30, 12, 0, 15, 27]
      },
      {
        name: 'Critical',
        color: '#D50000',
        data: customGraphData.CriticalData
        // data: [12, 6, 23, 25, 20, 35, 12]
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
              onCustomGraphClick(config.dataPointIndex)
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
        categories: customGraphData.label,
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
  })
  // const handleRefreshGraph = useCallback(() => {
  //   dispatch(
  //     requestHistoryData({
  //       type: 'custom',
  //       sourceIP: '',
  //       ge: '',
  //       le: ''
  //     })
  //   )
  // }, [dispatch])

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
  //   [dispatch]
  // )

  const onCustomGraphClick = (barIndex) => {
    dispatch(showCustomTableData(tableData[barIndex]))
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(requestHistoryData({ type: 'custom', sourceIP: '', ge: '', le: '' }))
    }, 1500)
  }, [])

  useEffect(() => {
    if (Array.isArray(customGraphData.WarningData) && customGraphData.WarningData.length > 0) {
      setEventLogData((prev) => ({
        ...prev,
        series: [
          {
            data: customGraphData.InformationData
          },
          {
            data: customGraphData.WarningData
          },
          {
            data: customGraphData.CriticaLData
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
          <i>{customGraphData.lastUpdated}</i>
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
