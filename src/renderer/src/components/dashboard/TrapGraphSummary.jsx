import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardSelector,
  requestHistoryData,
  updateTrapGraph
} from '../../features/dashboardSlice'
import requestGraphData from './requestGraphData'
import { theme as antdTheme } from 'antd'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../../main/utils/IPCEvents'
import { Card } from 'antd'
import ReactApexChart from 'react-apexcharts'
import { useThemeStore } from '../../utils/themes/useStore'

const TrapGraphSummary = () => {
  const { mode } = useThemeStore()
  const { token } = antdTheme.useToken()
  const { trapGraphData } = useSelector(dashboardSelector)
  const dispatch = useDispatch()
  // const { label, data, tableData, lastUpdated } = trapGraphData
  console.log(trapGraphData)
  const [snmpTrapMsgData, setSnmpTrapMsgData] = useState({
    series: [
      {
        name: 'SNMP Trap Message Count',
        data: [12, 32, 43, 23, 65, 12, 11]
        // data: trapGraphData.data
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: 'bottom',
        horizontalAlign: 'center'
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        // categories: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
        categories: trapGraphData.label,

        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Trap Msg Count'
        }
      },
      fill: {
        type: 'solid',
        colors: [token.colorSuccess],
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
  })

  useEffect(() => {
    setTimeout(() => {
      dispatch(requestHistoryData({ type: 'trap', sourceIP: '', ge: '', le: '' }))
    }, 1500)
  }, [])
  return (
    // <div>
    //   <pre>
    //     <code>{JSON.stringify(trapGraphData, '', '\t')}</code>
    //   </pre>
    // </div>

    <div>
      <Card
        title="SNMP Trap Message Count"
        // size="small"
        bordered={false}
        style={{
          width: 450,
          height: 350
        }}
      >
        <ReactApexChart
          options={snmpTrapMsgData.options}
          series={snmpTrapMsgData.series}
          type="bar"
          // height={350}
          width={400}
        />
      </Card>
    </div>
  )
}

export default TrapGraphSummary
