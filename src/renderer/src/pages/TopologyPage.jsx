/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import TopologyToolbar from '../components/topology/TopologyToolbar/TopologyToolbar'
import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import {
  changeTopologyEvent,
  // setTopologyData,
  clearTopologyData
/* eslint-disable no-unused-vars */

// import React, { useRef } from 'react'
// import Card from 'antd/es/card/Card'
// //import styles from './Topology.module.css'
// import TopologyAddModal from '../components/topology/TopologyAddModal'
// import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
// import TopologyToolbar from '../components/Topology/TopologyToolbar'
// import { changeTopologyEvent } from '../features/topologySlice'
// import { useDispatch } from 'react-redux'
// //import TopologyToolbar from '../components/topology/'
// //import TopologyNavContainer from './TopologyNavContainer'
// // import TopologyToolbarContainer from './TopologyToolbarContainer'
// // import TopologyGraphContainer from './TopologyGraphContainer'
// // import TopologyAddModalContainer from './TopologyAddModalContainer'
// //const SEND_RP_TOPOLOGY_DATA = 'SEND_RP_TOPOLOGY_DATA'
// const Topology = (props) => {
//   const dispatch = useDispatch()

//   const graph = useRef()
//   const modal = useRef()

//   //  useEffect(() => {
//   //    ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   //    return () => {
//   //      props.clearTopologyData()
//   //      props.requestSwitchPolling(false)
//   //      ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   //    }
//   //  }, [props.topologyData])
//   // const topologyDataListener = (event, arg) => {
//   //   props.setTopologyData(arg)
//   // }
//   const handleFitViewPoint = () => {
//     graph.current.networkFitViewPoint()
//   }
//   const handleAddNode = () => {
//     changeTopologyEvent('addNode')
//     graph.current.networkAddNodeMode()
//   }
//   const getNodePosition = (position) => {
//     modal.current.openModal(position)
//   }
//   const handleSearchNode = (node) => {
//     graph.current.networkFocusNode(node)
//   }
//   const handleAddEdge = () => {
//     changeTopologyEvent('addEdge')
//     graph.current.networkAddEdgeMode()
//   }
//   const getEdgeLinkNode = (nodes) => {
//     modal.current.openModal(nodes)
//   }
//   const handleDisableEdit = () => {
//     dispatch(changeTopologyEvent(''))
//     graph.current.networkDisableEditMode()
//   }
//   const handleSaveLayout = () => {
//     graph.current.networkSaveLayout()
//   }
//   const topologyPanelSizeOnChange = () => {
//     graph.current.updateDimensions()
//   }
//   const handleSelectNode = (node) => {
//     graph.current.networkSelectNodes([node])
//     graph.current.networkFocusNode(node)
//   }
//   const handleExportImage = () => {
//     graph.current.networkExportImage()
//   }
//   const handleChangeShowLabelItem = () => {
//     graph.current.networkChangeShowLabelItem()
//   }
//   return (
//     // <div
//     //   style={{
//     //     // position: 'fixed',
//     //     //     width: '100%',
//     //     padding: '20px 10px 10px 10px'
//     //   }}
//     // >
//     //   {/* <Card
//     //     bordered={false}
//     //     size="small"
//     //     style={{
//     //       height: 550
//     //     }}
//     //     bodyStyle={{
//     //       padding: '15px'
//     //     }}
//     //   > */}
//     // <div>
//     <Card>
//       {/* <SplitterLayout>
//           <div>
//             <TopologyNavContainer handleSelectNode={this.handleSelectNode} />
//           </div> */}
//       <div
//         style={{
//           height: 'calc(100vh - 140px)',
//           position: 'relative',
//           padding: '15px 10px 15px 15px',
//           minWidth: '761px'
//         }}
//       >
//         <TopologyToolbar
//           handleExportImage={handleExportImage}
//           // handleFitViewPoin={handleFitViewPoin}
//           handleAddNode={handleAddNode}
//           handleSearchNode={handleSearchNode}
//           handleAddEdge={handleAddEdge}
//           handleDisableEdit={handleDisableEdit}
//           handleSaveLayout={handleSaveLayout}
//           handleChangeShowLabelItem={handleChangeShowLabelItem}
//         />
//         <TopologyGraph
//           onRef={(ref) => {
//             graph.current = ref
//           }}
//           getNodePosition={getNodePosition}
//           getEdgeLinkNode={getEdgeLinkNode}
//         />
//         <TopologyAddModal
//           onRef={(ref) => {
//             modal.current = ref
//           }}
//           handleDisableEdit={handleDisableEdit}
//         />
//       </div>
//       {/* <div
//           style={{
//             borderStyle: 'double',
//             boxSizing: 'border-box',
//             position: 'relative',
//             top: '-10px',
//             height: '380px',
//             padding: '30px 20px 20px 20px'
//           }}
//         ></div> */}

//       {/* </SplitterLayout> */}
//     </Card>
//   )
// }
// export default Topology

import React from 'react'

//import styles from './Topology.module.css'
// import TopologyAddModal from '../components/topology/TopologyAddModal'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import { Card } from 'antd'
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

import {
  changeTopologyEvent
  // setTopologyData,
  // clearTopologyData,
  // requestSwitchPolling
} from '../features/topologySlice'

import { useDispatch } from 'react-redux'
<<<<<<< HEAD

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
=======
import TopologyToolbar from '../components/Topology/TopologyToolbar'
// import TopologyAddModal from '../components/Topology/TopologyAddModal'
>>>>>>> cca18c6d41ad48ec97d7844dd0c78e2479ac5fe8

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
<<<<<<< HEAD
=======

>>>>>>> cca18c6d41ad48ec97d7844dd0c78e2479ac5fe8
export default TopologyPage
