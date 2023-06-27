import React from 'react'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import { Card } from 'antd'

const TopologyPage = () => {
  const getNodePosition = (position) => {
    modal.openModal(position)
  }
  const getEdgeLinkNode = (nodes) => {
    modal.openModal(nodes)
  }
  return (
    <Card bordered={false} title="Device Topology">
      <p>TopologyToolbarContainer</p>
      <TopologyGraph
        onRef={(ref) => {
          let graph = ref
        }}
        getNodePosition={getNodePosition}
        getEdgeLinkNode={getEdgeLinkNode}
      />
      <p>TopologyAddModalContainer</p>
    </Card>
  )
}

export default TopologyPage
