/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../../features/discoverySlice'
import { Col, Row } from 'antd'
import SummaryCard from './SummaryCard'

const DeviceSummary = () => {
  const { groupDeviceArrayData } = useSelector(discoverySelector)

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

  return (
    <div>
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
