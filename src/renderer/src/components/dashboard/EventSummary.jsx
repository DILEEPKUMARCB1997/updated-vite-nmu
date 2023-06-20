/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './EventSummary.css'

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
} from '../../features/eventlogSlice'
import { Row, Col, Card } from 'antd'

var clearLogTimeOut1
const EventSummary = (props) => {
  const { information, critical, warning } = props
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
      clearLogTimeOut1 = setTimeout(
        () => {
          // type: UPDATE_LOG_DATA,

          const filterCustomLogDailyData = filterByDate([...state.customEventDailyData])
          return {
            ...state,

            customEventDailyData: filterCustomLogDailyData
          }
        },
        // default:
        //   return state;
        //  }
        msToMidnight
      )
    }
  }, [])

  useEffect(() => {
    clearTimeout(clearLogTimeOut1)
  }, [])

  return (
    <div className="cardWrapper">
      <Row gutter={8}>
        <Col span={8}>
          <Card
            title="Information"
            bodylabel={information}
            bordered={false}
            headStyle={{
              minHeight: '31px',
              backgroundColor: '#46b300',
              color: 'black',
              textAlign: 'center',
              padding: '0 10px'
            }}
            bodyStyle={{
              textAlign: 'center',
              backgroundColor: '#E8F5E9',
              color: 'black',
              padding: '0px',
              fontSize: '1.4rem',
              fontWeight: 'bold'
            }}
            style={{
              width: 120
            }}
          >
            {geteventdetails().information}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Warning"
            bodylabel={warning}
            bordered={false}
            headStyle={{
              minHeight: '31px',
              backgroundColor: '#F57F17',
              color: 'black',
              textAlign: 'center',
              padding: '0 10px'
            }}
            bodyStyle={{
              textAlign: 'center',
              backgroundColor: '#FFFDE7',
              color: 'black',
              padding: '0px',
              fontSize: '1.4rem',
              fontWeight: 'bold'
            }}
            style={{
              width: 120
            }}
          >
            {geteventdetails().warning}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Critical"
            bodylabel={critical}
            bordered={false}
            headStyle={{
              minHeight: '31px',
              backgroundColor: '#D50000',
              color: 'black',
              textAlign: 'center',
              padding: '0 10px'
            }}
            bodyStyle={{
              textAlign: 'center',
              backgroundColor: '#FFEBEE',
              color: 'black',
              padding: '0px',
              fontSize: '1.4rem',
              fontWeight: 'bold'
            }}
            style={{
              width: 120
            }}
          >
            {geteventdetails().critical}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EventSummary
