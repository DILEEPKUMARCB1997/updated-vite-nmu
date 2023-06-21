import React, { useEffect } from 'react'
import {
  REQUEST_MP_GET_DISK_USES,
  RESPONSE_RP_GET_DISK_USES
} from '../../../../main/utils/IPCEvents'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector, initDiskUses } from '../../features/dashboardSlice'
import { Card } from 'antd'
import ReactApexChart from 'react-apexcharts'

const DiskSpaceSummary = () => {
  const dispatch = useDispatch()
  const { diskUses } = useSelector(dashboardSelector)
  useEffect(() => {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_DISK_USES, (event, arg) => {
      if (arg.success) {
        console.log(arg)
        const diskUse = arg.data
        dispatch(initDiskUses(diskUse))
      } else {
        console.log('Error get disk uses data')
      }
    })
    window.electron.ipcRenderer.send(REQUEST_MP_GET_DISK_USES, {})
  }, [])

  console.log(diskUses)

  const options = {
    series: [diskUses.diskUsed],
    labels: [
      `Disk Space Used - ${diskUses.diskUsed} %`
      // `Disk Space Free - ${diskUses.diskFree} %`
    ],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      offsetX: -10,
      offsetY: 40,
      formatter: function (val) {
        return val
      },
      labels: {
        useSeriesColors: false
      }
    },
    chart: {
      height: 350,
      type: 'radialBar',
      offsetX: -5,
      offsetY: -25,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '50%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          show: true,
          background: '#fff',
          strokeWidth: '100%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          name: {
            offsetY: 5,
            show: true,
            color: '#1a1818',
            fontSize: '15px',
            show: false
          },
          value: {
            formatter: function (val) {
              return val + '%'
            },
            color: '#111',
            fontSize: '15px',
            fontWeight: 'bold',
            offsetY: 5,
            show: true
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#afa1e5'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'solid'
    }
    // labels: ['Disk Space Used']
  }

  return (
    // <div>
    //   <pre>
    //     <code>{JSON.stringify(diskUses, '', '\t')}</code>
    //   </pre>
    // </div>

    // <div>
    //   <Card
    //     title="Disk Space Utilization Summary"
    //     // size="small"
    //     bordered={false}
    //     style={{
    //       width: 300
    //     }}
    //   >
    //     <ReactApexChart options={options} series={options.series} type="radialBar" height={250} />
    //   </Card>
    // </div>

    <div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="radialBar"
        height={150}
        width={400}
      />
    </div>
  )
}

export default DiskSpaceSummary
