// import React, { useRef, useEffect } from 'react'
// import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
// import TopologyToolbar from '../components/topology/TopologyToolbar/TopologyToolbar'
// import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
// import { Card } from 'antd'

// import {
//   changeTopologyEvent,
//   setTopologyData,
//   clearTopologyData,
//   requestSwitchPolling
// } from '../features/topologySlice'
// import { useDispatch } from 'react-redux'
// import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'

// const TopologyPage = () => {
//   const dispatch = useDispatch()
//   let graphRef = useRef()
//   let modalRef = useRef()
//   // var modal
//   // var graph

//   // TopologyPage.propTypes = {
//   //   networkDisableEditMode: PropTypes.object.isRequired,
//   //   networkAddNodeMode: PropTypes.object.isRequired,
//   //   networkAddEdgeMode: PropTypes.object.isRequired,
//   //   networkExportImage: PropTypes.object.isRequired,
//   //   networkFitViewPoint: PropTypes.object.isRequired
//   // }

//   // useEffect(() => {
//   //   window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   //   dispatch(clearTopologyData())
//   //   dispatch(requestSwitchPolling(false))
//   //   window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   // }, [])

//   // const topologyDataListener = (event, arg) => {
//   //   dispatch(setTopologyData(arg))
//   // }
//   const handleDisableEdit = () => {
//     dispatch(changeTopologyEvent(''))
//     graphRef.current.networkDisableEditMode()
//   }
//   const handleAddNode = () => {
//     dispatch(changeTopologyEvent('addNode'))
//     graphRef.current.networkAddNodeMode()
//   }

//   const handleAddEdge = () => {
//     dispatch(changeTopologyEvent('addEdge'))
//     graphRef.current.networkAddEdgeMode()
//   }
//   const handleSaveLayout = () => {
//     graphRef.current.networkAddEdgeMode()
//   }
//   const handleExportImage = () => {
//     graphRef.current.networkExportImage()
//   }
//   const handleFitViewPoin = () => {
//     graphRef.current.networkFitViewPoint()
//   }
//   const getNodePosition = (position) => {
//     modal.openModal(position)
//     modalRef.current.openModal(position)
//   }
//   const getEdgeLinkNode = (nodes) => {
//     modal.openModal(nodes)
//     modalRef.current.openModal(nodes)
//   }
//   return (
//     <div
//       style={{
//         // position: 'absolute',
//         // width: '100%',
//         padding: '20px 10px 10px 10px'
//       }}
//     >
//       <Card
//         bordered={false}
//         size="small"
//         style={{
//           height: 550
//         }}
//         bodyStyle={{
//           padding: '5px'
//         }}
//       >
//         {/* <SplitterLayout>
//           <div>
//             <TopologyNavContainer handleSelectNode={handleSelectNode} />
//           </div> */}
//         <div
//           style={{
//             height: '140px',
//             boxSizing: 'border-box',
//             position: 'relative',
//             padding: '15px 10px 15px 15px',
//             minWidth: '761px'
//           }}
//         >
//           <TopologyToolbar
//             handleExportImage={handleExportImage}
//             handleFitViewPoin={handleFitViewPoin}
//             handleAddNode={handleAddNode}
//             handleAddEdge={handleAddEdge}
//             handleDisableEdit={handleDisableEdit}
//             handleSaveLayout={handleSaveLayout}
//           />
//           <TopologyGraph
//             onRef={(ref) => {
//               ref = { graphRef }
//             }}
//             getNodePosition={getNodePosition}
//             getEdgeLinkNode={getEdgeLinkNode}
//           />
//           {/* <TopologyAddModal
//             onRef={(ref) => {
//               modal.current = ref
//             }}
//             handleDisableEdit={handleDisableEdit}
//             handleSaveLayout={handleSaveLayout}
//           /> */}
//         </div>
//         {/* <div
//           style={{
//             borderStyle: 'double',
//             boxSizing: 'border-box',
//             position: 'relative',
//             top: '-50px',
//             height: '380px'
//           }}
//         ></div> */}
//       </Card>
//     </div>
//   // useEffect(() => {
//   //   window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   //   dispatch(clearTopologyData())
//   //   dispatch(requestSwitchPolling(false))
//   //   window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   // }, [])

//   // const topologyDataListener = (event, arg) => {
//   //   dispatch(setTopologyData(arg))
//   // }
//   const handleDisableEdit = () => {
//     dispatch(changeTopologyEvent(''))
//     graphRef.networkDisableEditMode()
//   }
//   const handleAddNode = () => {
//     dispatch(changeTopologyEvent('addNode'))
//     graphRef.networkAddNodeMode()
//   }

//   const handleAddEdge = () => {
//     dispatch(changeTopologyEvent('addEdge'))
//     graphRef.networkAddEdgeMode()
//   }
//   const handleSaveLayout = () => {
//     graphRef.networkAddEdgeMode()
//   }
//   const handleExportImage = () => {
//     graphRef.networkExportImage()
//   }
//   const handleFitViewPoin = () => {
//     graphRef.networkFitViewPoint()
//   }
//   const getNodePosition = (position) => {
//     modalRef.openModal(position)
//     // modalRef.current.openModal(position)
//   }
//   const getEdgeLinkNode = (nodes) => {
//     modalRef.openModal(nodes)
//     // modalRef.current.openModal(nodes)
//   }
//   // return (
//   // <div
//   //   style={{
//   //     // position: 'absolute',
//   //     // width: '100%',
//   //     padding: '20px 10px 10px 10px'
//   //   }}
//   // >
//   // <Card
//   //   bordered={false}
//   //   size="small"
//   //   style={{
//   //     height: 550
//   //   }}
//   //   bodyStyle={{
//   //     padding: '5px'
//   //   }}
//   // >
//   {
//     /* <SplitterLayout>
//           <div>
//             <TopologyNavContainer handleSelectNode={handleSelectNode} />
//           </div> */
//   }
//   {
//     /* <div
//         style={{
//           height: '140px',
//           boxSizing: 'border-box',
//           position: 'relative',
//           padding: '15px 10px 15px 15px',
//           minWidth: '761px'
//         }}
//       > */
//   }
//   {
//     /* <TopologyToolbar
//         handleExportImage={handleExportImage}
//         handleFitViewPoin={handleFitViewPoin}
//         handleAddNode={handleAddNode}
//         handleAddEdge={handleAddEdge}
//         handleDisableEdit={handleDisableEdit}
//         handleSaveLayout={handleSaveLayout}
//       />

//       <TopologyGraph
//         onRef={(ref) => {
//           ref = { graphRef }
//         }}
//         getNodePosition={getNodePosition}
//         getEdgeLinkNode={getEdgeLinkNode}
//       />

//       <TopologyAddModal
//         onRef={(ref) => {
//           modal.current = ref
//         }}
//         handleDisableEdit={handleDisableEdit}
//         handleSaveLayout={handleSaveLayout}
//       /> */
//   }
//   {
//     /* </div> */
//   }
//   {
//     /* <div
//         style={{
//           borderStyle: 'double',
//           boxSizing: 'border-box',
//           position: 'relative',
//           top: '-50px',
//           height: '380px'
//         }}
//       ></div> */
//   }
//   {
//     /* </Card> */
//   }
//   // </div>
//   // )
//   //................................................................

//   return (
//     <Card
//       bodyStyle={{ boxSizing: 'border-box', width: '100%', padding: '15px', minWidth: '761px' }}
//       bordered={false}
//       title="Device Topology"
//     >
//       <div style={{ boxSizing: 'border-box', padding: '15px 10px 15px 15px', minWidth: '761px' }}>
//         <TopologyToolbar
//           handleExportImage={handleExportImage}
//           handleFitViewPoin={handleFitViewPoin}
//           handleAddNode={handleAddNode}
//           // handleSearchNode={handleSearchNode}
//           handleDisableEdit={handleDisableEdit}
//           handleSaveLayout={handleSaveLayout}
//           // handleChangeShowLabelItem={handleChangeShowLabelItem}
//         />

//         {/* <Card> */}
//         <TopologyGraph
//           onRef={(ref) => {
//             graphRef = ref
//             console.log(graphRef)
//           }}
//           getNodePosition={getNodePosition}
//           getEdgeLinkNode={getEdgeLinkNode}
//         />
//         {/* </Card> */}
//         <TopologyAddModal
//           onRef={(ref) => {
//             modalRef = ref
//           }}
//           handleDisableEdit={handleDisableEdit}
//         />
//       </div>
//     </Card>
//   )
// }

// export default TopologyPage

import React from 'react'

const TopologyPage = () => {
  return <div>TopologyPage</div>
}

export default TopologyPage
