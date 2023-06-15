import React from 'react'
import DeviceSummary from '../components/dashboard/DeviceSummary'
import DiskSpceSummary from '../components/dashboard/DiskSpceSummary'

const DashboardPage = () => {
  return (
    <div>
      <DeviceSummary />
      <DiskSpceSummary />
    </div>
  )
}

export default DashboardPage
