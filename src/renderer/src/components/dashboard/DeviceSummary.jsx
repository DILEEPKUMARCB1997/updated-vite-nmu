/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { discoverySelector } from '../../features/discoverySlice'

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
  console.log(getSummaryDetails().total)

  return (
    <div>
      <pre>
        <code>{JSON.stringify(getSummaryDetails(), '', '\t')}</code>
        <h1>{getSummaryDetails().online}</h1>
      </pre>
    </div>
  )
}

export default DeviceSummary
