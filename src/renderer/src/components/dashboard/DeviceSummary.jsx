import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../../features/discoverySlice'
import { Card, Col, Row, Table } from 'antd'
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
          <Card
            size="small"
            title="Online"
            style={{ height: 60, backgroundColor: '#D2FBD3' }}
            headStyle={{
              minHeight: '31px',
              backgroundColor: '#0ECA19',
              color: '#fff',
              textAlign: 'center',
              padding: '0 10px',
              fontSize: '15px'
            }}
            bodyStyle={{
              backgroundColor: '#D2FBD3',
              textAlign: 'center',
              color: 'black',
              padding: '0px',
              fontWeight: 'bold',
              fontSize: '25px'
            }}
          >
            {getSummaryDetails().online}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            title="Offline"
            style={{ height: 60, backgroundColor: '#FDECEC' }}
            headStyle={{
              minHeight: '31px',
              backgroundColor: '#CD0E1D',
              color: '#fff',
              textAlign: 'center',
              padding: '0 10px',
              fontSize: '15px'
            }}
            bodyStyle={{
              backgroundColor: '#FDECEC',
              textAlign: 'center',
              color: 'black',
              padding: '0px',
              fontWeight: 'bold',
              fontSize: '25px'
            }}
          >
            {getSummaryDetails().offline}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DeviceSummary
