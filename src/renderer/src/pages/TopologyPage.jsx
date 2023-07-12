/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import TopologyToolbar from '../components/topology/TopologyToolbar/TopologyToolbar'
import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { Card } from 'antd'
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import {
  changeTopologyEvent
  // setTopologyData,
  // clearTopologyData,
  // requestSwitchPolling
} from '../features/topologySlice'
import { useDispatch } from 'react-redux'
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

    // useEffect(() => {
    //   window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
    //   dispatch(clearTopologyData())
    //   dispatch(requestSwitchPolling(false))
    //   window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
    // }, [])

    // const topologyDataListener = (event, arg) => {
    //   dispatch(setTopologyData(arg))
    // }
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
      modal.openModal(position)
      modalRef.current.openModal(position)
    }
    const getEdgeLinkNode = (nodes) => {
      modal.openModal(nodes)
      modalRef.current.openModal(nodes)
    }
    return (
      <div
        style={{
          // position: 'absolute',
          // width: '100%',
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
            padding: '5px'
          }}
        >
          {/* <SplitterLayout>
          <div>
            <TopologyNavContainer handleSelectNode={handleSelectNode} />
          </div> */}
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
            <TopologyGraph
              onRef={(ref) => {
                ref = { graphRef }
              }}
              getNodePosition={getNodePosition}
              getEdgeLinkNode={getEdgeLinkNode}
            />
            {/* <TopologyAddModal
            onRef={(ref) => {
              modal.current = ref
            }}
            handleDisableEdit={handleDisableEdit}
            handleSaveLayout={handleSaveLayout}
          /> */}
          </div>
          {/* <div
          style={{
            borderStyle: 'double',
            boxSizing: 'border-box',
            position: 'relative',
            top: '-50px',
            height: '380px'
          }}
        ></div> */}
        </Card>
      </div>
    )
  }
}
export default TopologyPage
