/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'

import {
  changeTopologyEvent,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling
} from '../features/topologySlice'

import { useDispatch } from 'react-redux'
import TopologyToolbar from '../components/Topology/TopologyToolbar'
import { Card } from 'antd'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
// import PropTypes from 'prop-types'
let graph
const TopologyPage = () => {
  // TopologyPage.propTypes = {
  //   networkDisableEditMode: PropTypes.object.isRequired,
  //   networkAddNodeMode: PropTypes.object.isRequired,
  //   networkAddEdgeMode: PropTypes.object.isRequired,
  //   networkExportImage: PropTypes.object.isRequired,
  //   networkFitViewPoint: PropTypes.object.isRequired
  // }
  const graphRef = useRef()
  const modalRef = useRef()
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
    modalRef.current.openModal(position)
  }
  const getEdgeLinkNode = (nodes) => {
    modalRef.current.openModal(nodes)
  }
  return (
    <div
      style={{
        // position: 'fixed',
        //     width: '100%',
        padding: '20px 10px 10px 10px'
      }}
    >
      <Card
        bordered={false}
        size="small"
        style={{
          height: 550
        }}
        bodyStyle={{
          padding: '15px'
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
        {/* <div
          style={{
            borderStyle: 'double',
            boxSizing: 'border-box',
            position: 'relative',
            top: '-10px',
            height: '380px',
            padding: '30px 20px 20px 20px'
          }}
        ></div> */}

        <TopologyGraph
          onRef={(ref) => {
            ref = { graphRef }
          }}
          // onRef={graphRef}
          getNodePosition={getNodePosition}
          getEdgeLinkNode={getEdgeLinkNode}
        />
      </Card>
    </div>
  )
}

export default TopologyPage
