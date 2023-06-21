import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../../features/discoverySlice'
import { Card, Col, Row, Table } from 'antd'
import { theme as antdTheme } from 'antd'
import SummaryCard from './SummaryCard'

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

  // const options = {
  //   chart: {
  //     type: 'radialBar',
  //     height: 'auto',
  //     offsetY: -30,
  //     offsetX: -50
  //   },
  //   plotOptions: {
  //     radialBar: {
  //       size: undefined,
  //       inverseOrder: false,
  //       hollow: {
  //         margin: 5,
  //         size: '30%',
  //         background: 'transparent'
  //       },
  //       track: {
  //         show: true,
  //         background: '#e1e3eb',
  //         strokeWidth: '97%',
  //         opacity: 1,
  //         margin: 5 // margin is in pixels
  //       }
  //     }
  //   },
  //   // series: [getSummaryDetails().online, getSummaryDetails().offline],
  //   series: [30, 70],
  //   labels: ['Online', 'Offline'],
  //   colors: [token.colorSuccess, token.colorError],
  //   legend: {
  //     show: true,
  //     position: 'right',
  //     offsetX: 10,
  //     offsetY: 30,
  //     formatter: function (val, opts) {
  //       return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
  //     }
  //   },
  //   fill: {
  //     type: 'gradient',
  //     gradient: {
  //       shade: 'dark',
  //       type: 'horizontal',
  //       shadeIntensity: 0.5,
  //       inverseColors: true,
  //       opacityFrom: 1,
  //       opacityTo: 1,
  //       stops: [0, 100]
  //     }
  //   }
  // }

  return (
    // <div>
    //   <pre>
    //     <code>{JSON.stringify(getSummaryDetails(), '', '\t')}</code>
    //     <h1>{getSummaryDetails().online}</h1>
    //   </pre>
    // </div>

    <div>
      {/* <ReactApexChart
        options={options}
        series={options.series}
        // type="pie"
        type="radialBar"
        height={150}
        width={400}
      /> */}

      {/* <Table columns={columns} dataSource={dataSource} /> */}
      <Row gutter={16}>
        <Col span={12}>
          <SummaryCard
            title="Online"
            hbcolor="#46b300"
            bbcolor="#E8F5E9"
            bodylabel={getSummaryDetails().online}
          />
        </Col>
        <Col span={12}>
          <SummaryCard
            title="Offline"
            hbcolor="#D50000"
            bbcolor="#FFEBEE"
            bodylabel={getSummaryDetails().offline}
          />
        </Col>
      </Row>
    </div>
  )
}

export default DeviceSummary
