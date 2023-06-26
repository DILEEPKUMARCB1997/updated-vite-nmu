import React from 'react'
import { Card } from 'antd'
import TopologyAddModal from '../components/topology/TopologyAddModal'
const TopologyPage = () => {
  return (
    <Card bordered={false} title="Device Topology">
      <p>TopologyToolbarContainer</p>
      <p>TopologyGraphContainer</p>
      <TopologyAddModal />
    </Card>
  )
}

export default TopologyPage
