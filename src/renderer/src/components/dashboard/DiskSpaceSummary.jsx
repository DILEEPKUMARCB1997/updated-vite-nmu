// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import {
  REQUEST_MP_GET_DISK_USES,
  RESPONSE_RP_GET_DISK_USES
} from '../../../../main/utils/IPCEvents'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector, initDiskUses } from '../../features/dashboardSlice'
import ReactApexChart from 'react-apexcharts'

const DiskSpaceSummary = () => {
  const dispatch = useDispatch()
  const { diskUses } = useSelector(dashboardSelector)
  // console.log(diskUses)
  useEffect(() => {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_DISK_USES, (event, arg) => {
      if (arg.success) {
        const diskUse = arg.data
        dispatch(initDiskUses(diskUse))
      } else {
        console.log('Error get disk uses data')
      }
    })
    window.electron.ipcRenderer.send(REQUEST_MP_GET_DISK_USES, {})
  }, [])

  const options = {
    series: [diskUses.diskUsed],
    labels: [`Disk Space Used - ${diskUses.diskUsed} %`],
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'right',
      offsetX: 40,
      offsetY: 90,
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
      offsetX: -35,
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
          show: true,
          name: {
            offsetY: 5,
            show: true,
            color: '#1a1818',
            fontSize: '15px',
            // eslint-disable-next-line no-dupe-keys
            show: false
          },
          value: {
            formatter: function (val) {
              return val + '%'
            },
            color: '#111',
            fontSize: '25px',
            fontWeight: 'bold',
            offsetY: 10,
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
    <div data-testid="graph">
      <ReactApexChart options={options} series={options.series} type="radialBar" width={500} />
    </div>
  )
}

export default DiskSpaceSummary
