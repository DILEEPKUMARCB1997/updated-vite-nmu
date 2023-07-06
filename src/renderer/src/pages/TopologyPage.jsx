/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import TopologyToolbar from '../components/topology/TopologyToolbar/TopologyToolbar'
import {
  changeTopologyEvent,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling
} from '../features/topologySlice'

import { useDispatch } from 'react-redux'

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

  const graph = useRef()
  const modal = useRef()

  //  useEffect(() => {
  //    ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
  //    return () => {
  //      props.clearTopologyData()
  //      props.requestSwitchPolling(false)
  //      ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
  //    }
  //  }, [props.topologyData])
  const topologyDataListener = (event, arg) => {
    props.setTopologyData(arg)
  }
  const handleFitViewPoint = () => {
    graph.current.networkFitViewPoint()
  }
  const handleAddNode = () => {
    changeTopologyEvent('addNode')
    graph.current.networkAddNodeMode()
  }
  const getNodePosition = (position) => {
    modal.current.openModal(position)
  }
  const handleSearchNode = (node) => {
    graph.current.networkFocusNode(node)
  }
  const handleAddEdge = () => {
    changeTopologyEvent('addEdge')
    graph.current.networkAddEdgeMode()
  }
  const getEdgeLinkNode = (nodes) => {
    modal.current.openModal(nodes)
  }
  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    graph.current.networkDisableEditMode()
  }
  const handleSaveLayout = () => {
    graph.current.networkSaveLayout()
  }
  const topologyPanelSizeOnChange = () => {
    graph.current.updateDimensions()
  }
  const handleSelectNode = (node) => {
    graph.current.networkSelectNodes([node])
    graph.current.networkFocusNode(node)
  }
  const handleExportImage = () => {
    graph.current.networkExportImage()
  }
  const handleChangeShowLabelItem = () => {
    graph.current.networkChangeShowLabelItem()
  }
  return (
    <div>
      <Card>
        {/* <SplitterLayout>
          <div>
            <TopologyNavContainer handleSelectNode={this.handleSelectNode} />
          </div> */}
        <div
          style={{
            height: 'calc(100vh - 140px)',
            position: 'relative',
            padding: '15px 10px 15px 15px',
            minWidth: '761px'
          }}
        >
          <TopologyGraph
            onRef={(ref) => {
              graph.current = ref
            }}
            getNodePosition={getNodePosition}
            getEdgeLinkNode={getEdgeLinkNode}
          />
          <TopologyAddModal
            onRef={(ref) => {
              modal.current = ref
            }}
            handleDisableEdit={handleDisableEdit}
          />
        </div>
        {/* </SplitterLayout> */}
      </Card>
    </div>
  )
}
export default Topology
