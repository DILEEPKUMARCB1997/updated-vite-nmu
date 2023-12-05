/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import TopologyToolbar from '../components/Topology/TopologyToolbar/TopologyToolbar'
import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { Card, Col, Row, Typography } from 'antd'
import { datePad } from '../components/comman/tools'
import domtoimage from 'dom-to-image'
import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'
import { saveAs } from 'file-saver'
import {
  changeTopologyEvent,
  setImageExporting,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling,
  topologySelector
} from '../features/topologySlice'
import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
// import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'

const TopologyPage = () => {
  const { event, nodesData, currentGroup } = useSelector(topologySelector)
  const dispatch = useDispatch()

  const [graph, setGraph] = useState(null)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)

    return () => {
      dispatch(clearTopologyData())
      dispatch(requestSwitchPolling(false))
      window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
    }
  }, [clearTopologyData, requestSwitchPolling])

  const topologyDataListener = (event, arg) => {
    setTopologyData(arg)
  }

  const handleFitViewPoint = () => {
    graph.networkFitViewPoint()
  }

  const handleAddNode = () => {
    dispatch(changeTopologyEvent('addNode'))
    event.networkAddNodeMode()
    // graph.networkAddNodeMode()
  }

  const getNodePosition = (position) => {
    modal.openModal(position)
  }

  const handleSearchNode = (node) => {
    graph.networkFocusNode(node)
  }

  const handleAddEdge = () => {
    dispatch(changeTopologyEvent('addEdge'))
    event.networkAddEdgeMode()
  }

  const getEdgeLinkNode = (nodes) => {
    modal.openModal(nodes)
  }

  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    event.networkDisableEditMode()
  }

  const handleSaveLayout = () => {
    graph.networkSaveLayout()
  }

  const topologyPanelSizeOnChange = () => {
    graph.updateDimensions()
  }

  const handleSelectNode = (node) => {
    graph.networkSelectNodes([node])
    graph.networkFocusNode(node)
  }

  const handleExportImage = () => {
    graph.networkExportImage()
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TopologyButtons />
        </Col>

        <Col span={24}>
          <Card
            bodyStyle={{
              boxSizing: 'border-box',
              width: '100%',
              padding: '15px',
              minWidth: '761px',
              minHeight: '520px'
            }}
            // style={{ height: 'calc(100vh - 105px)' }}

            bordered={false}
          >
            <Typography.Title level={4}>Device Topology</Typography.Title>
            <div
              style={{
                boxSizing: 'border-box',
                padding: '15px 10px 15px 15px',
                marginTop: '20px',
                minWidth: '761px'
                // height: 'calc(100vh - 105px)'
              }}
            >
              <TopologyToolbar
                handleExportImage={handleExportImage}
                handleFitViewPoint={handleFitViewPoint}
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
                  setGraph(ref)
                }}
                // onRef={(ref) => {
                //   graph = ref
                //   console.log(graph)
                // }}
                getNodePosition={getNodePosition}
                getEdgeLinkNode={getEdgeLinkNode}
              />
              {/* </Card> */}
              <TopologyAddModal
                onRef={(ref) => {
                  setModal(ref)
                }}
                handleDisableEdit={handleDisableEdit}
              />
              {/* <TopologyAddModal
                onRef={(ref) => {
                  modalRef = ref
                }}
                handleDisableEdit={handleDisableEdit}
              /> */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default TopologyPage
