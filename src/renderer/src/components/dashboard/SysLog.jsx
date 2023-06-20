/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  RESPONSE_RP_GET_EVENT_LOG_HISTORY,
  REQUEST_MP_GET_EVENT_LOG_HISTORY
} from '../../../../main/utils/IPCEvents'
import { dashboardSelector, updateSyslogGraphData } from '../../features/dashboardSlice'

const SysLog = () => {
  const { syslogGraphData } = useSelector(dashboardSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
      const { type, data } = arg
      dispatch(updateSyslogGraphData(syslogGraphData))
    })

    window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY)
  }, [])
  const syslogGraph = () => {
    let data = {
      labels: syslogGraphData.label,
      datasets: [
        {
          label: 'Syslog Message Count',
          backgroundColor: 'rgba(54, 162, 235,0.95)',
          data: syslogGraphData.data
        }
      ]
    }
    // eslint-disable-next-line no-undef
    let lastUpdated = syslogGraphData.lastUpdated
    let tableData = syslogGraphData.tableData
    return { data, lastUpdated, tableData }
  }

  return (
    <div>
      <pre>
        <code>{JSON.stringify(syslogGraphData, '', '\t')}</code>
      </pre>
    </div>
  )
}

export default SysLog
