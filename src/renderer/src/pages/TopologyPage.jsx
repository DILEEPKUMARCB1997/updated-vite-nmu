/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Card } from 'antd'
import TopologyAddModal from '../components/topology/TopologyAddModal'
import { useDispatch } from 'react-redux'
import { changeTopologyEvent } from '../features/topologySlice'
const TopologyPage = (props) => {
  const { onRef } = props
  const dispatch = useDispatch()

  useEffect(() => {
    //dispatch(onRef())
    return () => {
      //onRef(undefined)
    }
  }, [])

  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    //this.graph.networkDisableEditMode()
  }
  return (
    <Card bordered={false} title="Device Topology">
      <p>TopologyToolbarContainer</p>
      <p>TopologyGraphContainer</p>
      <TopologyAddModal onRef={onRef} handleDisableEdit={handleDisableEdit} />
    </Card>
  )
}

export default TopologyPage
