import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../../features/discoverySlice'
import { Card } from 'antd'
import { theme as antdTheme } from 'antd'

const DeviceSummary = () => {
  const { groupDeviceArrayData } = useSelector(discoverySelector)
  const { token } = antdTheme.useToken()

  const getSummaryDetails = () => {
    let online = 0
    let total = 0
    let offline = 0
    Object.entries(groupDeviceArrayData).forEach(([groupKey, groupValue]) => {
      if (groupKey !== 'unGrouped') {
        groupValue.map((el) => {
          total++
          if (el.online) {
            online++
          }
        })
      }
    })
    offline = total - online
    return { online, total, offline }
  }
  console.log(getSummaryDetails().total)

  const options = {
    chart: {
      type: 'radialBar',
      height: 320,
      offsetY: -20,
      offsetX: -30
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: false,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent'
        },
        track: {
          show: true,
          background: '#40475D',
          strokeWidth: '10%',
          opacity: 1,
          margin: 5 // margin is in pixels
        }
      }
    },
    // series: [getSummaryDetails().online, getSummaryDetails().offline],
    series: [30, 70],
    labels: ['Online', 'Offline'],
    colors: [token.colorSuccess, token.colorError],
    legend: {
      show: true,
      position: 'bottom',
      offsetX: -30,
      offsetY: -30,
      formatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '%'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    }
  }

  return (
    // <div>
    //   <pre>
    //     <code>{JSON.stringify(getSummaryDetails(), '', '\t')}</code>
    //     <h1>{getSummaryDetails().online}</h1>
    //   </pre>
    // </div>
    <div>
      <Card
        title="Device Summary"
        // size="small"
        bordered={false}
        style={{
          width: 300,
          height: 300
        }}
      >
        <ReactApexChart
          options={options}
          series={options.series}
          // type="pie"
          type="radialBar"
          height={300}
          width={300}
        />
      </Card>
    </div>
  )
}

export default DeviceSummary
