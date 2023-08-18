import React, { useRef, useEffect } from 'react'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import TopologyToolbar from '../components/topology/TopologyToolbar/TopologyToolbar'
import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { Card } from 'antd'

import {
  changeTopologyEvent,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling
} from '../features/topologySlice'
import { useDispatch } from 'react-redux'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'

const TopologyPage = () => {
  const dispatch = useDispatch()
  let graphRef = useRef()
  let modalRef = useRef()

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
    graphRef.current.networkDisableEditMode()
  }
  const handleAddNode = () => {
    dispatch(changeTopologyEvent('addNode'))
    graphRef.current.networkAddNodeMode()
  }

  const handleAddEdge = () => {
    dispatch(changeTopologyEvent('addEdge'))
    graphRef.current.networkAddEdgeMode()
  }
  const handleSaveLayout = () => {
    graphRef.current.networkAddEdgeMode()
  }
  const handleExportImage = () => {
    graphRef.current.networkExportImage()
  }
  const handleFitViewPoin = () => {
    graphRef.current.networkFitViewPoint()
  }
  const getNodePosition = (position) => {
    // modal.openModal(position)
    modalRef.current.openModal(position)
  }
  const getEdgeLinkNode = (nodes) => {
    // modal.openModal(nodes)
    modalRef.current.openModal(nodes)
  }

  return (
    <div>
      <TopologyButtons />
      <Card
        bodyStyle={{ boxSizing: 'border-box', width: '100%', padding: '15px', minWidth: '761px' }}
        bordered={false}
        title="Device Topology"
      >
        <div style={{ boxSizing: 'border-box', padding: '15px 10px 15px 15px', minWidth: '761px' }}>
          <TopologyToolbar
            handleExportImage={handleExportImage}
            handleFitViewPoin={handleFitViewPoin}
            handleAddNode={handleAddNode}
            handleAddEdge={handleAddEdge}
            // handleSearchNode={handleSearchNode}
            handleDisableEdit={handleDisableEdit}
            handleSaveLayout={handleSaveLayout}
            // handleChangeShowLabelItem={handleChangeShowLabelItem}
          />

          {/* <Card> */}
          <TopologyGraph
            onRef={(ref) => {
              graphRef = ref
              console.log(graphRef)
            }}
            getNodePosition={getNodePosition}
            getEdgeLinkNode={getEdgeLinkNode}
          />
          <TopologyAddModal
            onRef={(ref) => {
              modalRef = ref
            }}
            handleDisableEdit={handleDisableEdit}
          />
        </div>
      </Card>
    </div>
  )
}

export default TopologyPage
