/* eslint-disable no-unused-vars */
import Card from 'antd/es/card/Card'
import React, { useEffect } from 'react'

import {
  changeTopologyEvent,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling
} from '../features/topologySlice'
import { useDispatch } from 'react-redux'
import TopologyToolbar from '../components/Topology/TopologyToolbar'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'

const TopologyPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
    dispatch(clearTopologyData())
    dispatch(requestSwitchPolling(false))
    window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
  }, [])

  const topologyDataListener = (event, arg) => {
    dispatch(setTopologyData(arg))
  }
  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    this.graph.networkDisableEditMode()
  }
  const handleAddNode = () => {
    dispatch(changeTopologyEvent('addNode'))
    this.graph.networkAddNodeMode()
  }

  const handleAddEdge = () => {
    dispatch(changeTopologyEvent('addEdge'))
    this.graph.networkAddEdgeMode()
  }
  const handleSaveLayout = () => {
    this.graph.networkSaveLayout()
  }
  const handleExportImage = () => {
    this.graph.networkExportImage()
  }
  const handleFitViewPoin = () => {
    this.graph.networkFitViewPoint()
  }
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        padding: '25px 15px 15px 15px'
      }}
    >
      <Card
        bordered={false}
        style={{
          height: '550px',

          boxSizing: 'border-box',
          position: 'relative',
          width: '1080px',
          padding: '15px',
          minWidth: '761px'
        }}
      >
        <div
          style={{
            height: '140px',
            boxSizing: 'border-box',
            position: 'relative',
            padding: '15px 10px 15px 15px',
            minWidth: '761px'
          }}
        >
          <TopologyToolbar
            handleExportImage={handleExportImage}
            handleFitViewPoin={handleFitViewPoin}
            handleAddNode={handleAddNode}
            handleAddEdge={handleAddEdge}
            handleDisableEdit={handleDisableEdit}
            handleSaveLayout={handleSaveLayout}
          />
        </div>

        <div
          style={{
            borderStyle: 'double',
            boxSizing: 'border-box',
            position: 'relative',
            top: '-50px',
            height: '380px'
          }}
        ></div>
      </Card>
    </div>
  )
}

export default TopologyPage
