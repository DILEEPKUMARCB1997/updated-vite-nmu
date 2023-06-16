import React from 'react'
import DeviceSummary from '../components/dashboard/DeviceSummary'
import DiskSpaceSummary from '../components/dashboard/DiskSpaceSummary'
import TrapGraphSummary from '../components/dashboard/TrapGraphSummary'

const DashboardPage = () => {
  return (
    <div>
      <DeviceSummary />
      <br />
      <DiskSpaceSummary />
      <br />
      <TrapGraphSummary />
    </div>
  )
}

export default DashboardPage
