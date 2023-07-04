/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import React, { useRef } from 'react'
// import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
// import TopologyAddModal from '../components/topology/TopologyAddModal'
// //import { changeTopologyEvent } from '../features/topologySlice'
// //import { networkDisableEditMode } from '../components/topology/TopologyGraph/TopologyGraph'
// import { Card } from 'antd'
// import { useDispatch } from 'react-redux'

// const TopologyPage = () => {
//   //const { graph } = props
//   let networkRef = useRef()
//   const dispatch = useDispatch()
//   const getNodePosition = (position) => {
//     modal.openModal(position)
//   }
//   const getEdgeLinkNode = (nodes) => {
//     modal.openModal(nodes)
//   }
//   const networkDisableEditMode = () => {
//     networkRef.current.disableEditMode()
//   }
//   const handleDisableEdit = () => {
//     //dispatch(changeTopologyEvent)
//     networkDisableEditMode()
//   }
//   return (
//     <Card bordered={false} title="Device Topology">
//       <p>TopologyToolbarContainer</p>

//       <TopologyAddModal
//         onRef={(ref) => {
//           // eslint-disable-next-line no-unused-vars
//           let modal = ref
//         }}
//         handleDisableEdit={handleDisableEdit}
//       />
//       <TopologyGraph
//         onRef={(ref) => {
//           let graph = ref
//         }}
//         getNodePosition={getNodePosition}
//         getEdgeLinkNode={getEdgeLinkNode}
//       />
//     </Card>
//   )
// }

// export default TopologyPage

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
//import { ipcRenderer } from 'electron'
import TopologyAddModal from '../components/topology/TopologyAddModal'
//import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
//import TopologyGraphContainer from './TopologyGraph/TopologyGraphContainer'
//import TopologyToolbarContainer from './TopologyToolbar/TopologyToolbarContainer'
//import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
import { Card } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { topologySelector, changeTopologyEvent } from '../features/topologySlice'

const TopologyPage = () => {
  // Topology.propTypes = {
  //   // requestSwitchPolling: PropTypes.func.isRequired,
  //   //setTopologyData: PropTypes.func.isRequired,
  //   //changeTopologyEvent: PropTypes.func.isRequired,
  //   //clearTopologyData: PropTypes.func.isRequired
  // }
  const { event } = useSelector(topologySelector)
  const dispatch = useDispatch()
  //const graphRef = useRef()
  const modalRef = useRef()

  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    graph.networkDisableEditMode()
  }

  return (
    <div>
      <Card>
        {/* <SplitterLayout
          percentage
          customClassName={styles.mainSplitter}
          secondaryMinSize={80}
          onSecondaryPaneSizeChange={this.topologyPanelSizeOnChange}
        > */}
        {/* <div>
            <TopologyNavContainer handleSelectNode={this.handleSelectNode} />
          </div> */}
        <div>
          <TopologyAddModal onRef={modalRef} handleDisableEdit={handleDisableEdit} />
        </div>
        {/* </SplitterLayout> */}
      </Card>
    </div>
  )
}

export default TopologyPage
//import TopologyNavContainer from './TopologyNav/TopologyNavContainer'

// export default function Topology(props) {
//   Topology.propTypes = {
//     changeTopologyEvent: PropTypes.func.isRequired
//   }
//   const { event } = useSelector(topologySelector)
// const graphRef = useRef()
// const modalRef = useRef()
// const dispatch = useDispatch()

//   // useEffect(() => {
//   //   window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   //   return () => {
//   //     dispatch(clearTopologyData())
//   //     requestSwitchPolling(false)
//   //     window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   //   }
//   // }, [])

//   // const topologyDataListener = (event, arg) => {
//   //   setTopologyData(arg)
//   // }

//   // const handleFitViewPoint = () => {
//   //   graphRef.current.networkFitViewPoint()
//   // }

//   // const handleAddNode = () => {
//   //   changeTopologyEvent('addNode')
//   //   graphRef.current.networkAddNodeMode()
//   // }

//   const getNodePosition = (position) => {
//     modalRef.current.openModal(position)
//   }

//   const handleSearchNode = (node) => {
//     graphRef.current.networkFocusNode(node)
//   }

//   const handleAddEdge = () => {
//     props.changeTopologyEvent('addEdge')
//     graphRef.current.networkAddEdgeMode()
//   }

//   const getEdgeLinkNode = (nodes) => {
//     modalRef.current.openModal(nodes)
//   }

//   // const handleDisableEdit = () => {
//   //   dispatch(changeTopologyEvent({}))
//   //   graphRef.current.networkDisableEditMode()
//   // }
// function handleDisableEdit() {
//   dispatch(changeTopologyEvent(''))
//   this.graph.networkDisableEditMode()
// }

//   const handleSaveLayout = () => {
//     graphRef.current.networkSaveLayout()
//   }

//   const topologyPanelSizeOnChange = () => {
//     graphRef.current.updateDimensions()
//   }

//   const handleSelectNode = (node) => {
//     graphRef.current.networkSelectNodes([node])
//     graphRef.current.networkFocusNode(node)
//   }

//   const handleExportImage = () => {
//     graphRef.current.networkExportImage()
//   }

//   return (
//     <div>
//       <Card>
//         {/* <SplitterLayout
//           percentage
//           customClassName={styles.mainSplitter}
//           secondaryMinSize={80}
//           onSecondaryPaneSizeChange={this.topologyPanelSizeOnChange}
//         > */}
//         {/* <div>
//             <TopologyNavContainer handleSelectNode={this.handleSelectNode} />
//           </div> */}
//         <div>
//           <TopologyAddModal onRef={modalRef} handleDisableEdit={handleDisableEdit} />
//         </div>
//         {/* </SplitterLayout> */}
//       </Card>
//     </div>
//   )
// }

// Topology.propTypes = {
//   requestSwitchPolling: PropTypes.func.isRequired,
//   setTopologyData: PropTypes.func.isRequired,
//   changeTopologyEvent: PropTypes.func.isRequired,
//   clearTopologyData: PropTypes.func.isRequired
// }
