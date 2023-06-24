/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import {
  REQUEST_MP_GET_EVENT_LOG_HISTORY,
  RESPONSE_RP_GET_EVENT_LOG_HISTORY
} from '../../../../main/utils/IPCEvents'
import { useDispatch, useSelector } from 'react-redux'
import {
  eventLogSelector,
  updateCustomEventDaily,
  updateCustomHistory,
  clearHistoryData
} from '../../features/eventLogSlice'
import { Row, Col, Card } from 'antd'
import SummaryCard from './SummaryCard'

var clearLogTimeOut1
const EventSummary = () => {
  const { customEventDailyData } = useSelector(eventLogSelector)

  const geteventdetails = () => {
    const information = customEventDailyData.filter((x) => x.severity === 'Information').length
    const critical = customEventDailyData.filter((x) => x.severity === 'Critical').length
    const warning = customEventDailyData.filter((x) => x.severity === 'Warning').length

    return { information, critical, warning }
  }

  const dispatch = useDispatch()

  useEffect((types) => {
    //  const {types} = payload;
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_EVENT_LOG_HISTORY, (event, arg) => {
      const { type, data } = arg
      switch (type) {
        case 'custom':
          dispatch(updateCustomHistory(data))
          dispatch(updateCustomEventDaily())
          dispatch(clearHistoryData())
          break
        default:
          break
      }
    })

    window.electron.ipcRenderer.send(REQUEST_MP_GET_EVENT_LOG_HISTORY, {
      type: types,
      sourceIP: '',
      ge: '',
      le: ''
    })

    const now = new Date()
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day, ...
      0,
      0,
      0 // ...at 00:00:00 hours
    )
    const msToMidnight = night.getTime() - now.getTime()

    if (msToMidnight > 0) {
      clearLogTimeOut1 = setTimeout(() => {
        // type: UPDATE_LOG_DATA,

        const filterCustomLogDailyData = filterByDate([...state.customEventDailyData])
        return {
          ...state,

          customEventDailyData: filterCustomLogDailyData
        }
      }, msToMidnight)
    }
  }, [])

  return (
    <div className="cardWrapper">
      <Row gutter={8}>
        <Col span={8}>
          <SummaryCard
            title="Information"
            hbcolor="#46b300"
            bbcolor="#E8F5E9"
            bodylabel={geteventdetails().information}
          />
        </Col>
        <Col span={8}>
          <SummaryCard
            title="Warning"
            hbcolor="#F57F17"
            bbcolor="#FFFDE7"
            bodylabel={geteventdetails().warning}
          />
        </Col>
        <Col span={8}>
          <SummaryCard
            title="Critical"
            hbcolor="#D50000"
            bbcolor="#FFEBEE"
            bodylabel={geteventdetails().critical}
          />
        </Col>
      </Row>
    </div>
  )
}

export default EventSummary
