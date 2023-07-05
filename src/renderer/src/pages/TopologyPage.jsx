// /* eslint-disable no-unused-vars */
// import React, { useEffect, useRef } from 'react'
// import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'

// import {
//   changeTopologyEvent,
//   // setTopologyData,
//   clearTopologyData,
//   topologySelector
// } from '../features/topologySlice'

// import { useDispatch } from 'react-redux'
// //import TopologyToolbar from '../components/Topology/TopologyToolbar'
// import { Card } from 'antd'
// import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
// //import PropTypes from 'prop-types'
// //import { ipcRenderer } from 'electron'
// import TopologyAddModal from '../components/topology/TopologyAddModal'
// //import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
// //import TopologyGraphContainer from './TopologyGraph/TopologyGraphContainer'
// //import TopologyToolbarContainer from './TopologyToolbar/TopologyToolbarContainer'
// //import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
// // import { Card } from 'antd'

// import { useSelector } from 'react-redux'

// const TopologyPage = () => {
//   // Topology.propTypes = {
//   //   // requestSwitchPolling: PropTypes.func.isRequired,
//   //   //setTopologyData: PropTypes.func.isRequired,
//   //   //changeTopologyEvent: PropTypes.func.isRequired,
//   //   //clearTopologyData: PropTypes.func.isRequired
//   // }
//   const { event } = useSelector(topologySelector)

//   //const graphRef = useRef()
//   const modalRef = useRef()

//   const handleDisableEdit = () => {
//     dispatch(changeTopologyEvent(''))
//     graph.networkDisableEditMode()
//     /* eslint-disable no-const-assign */
//     /* eslint-disable no-undef */
//     // import PropTypes from 'prop-types'
//     let graph

//     // TopologyPage.propTypes = {
//     //   networkDisableEditMode: PropTypes.object.isRequired,
//     //   networkAddNodeMode: PropTypes.object.isRequired,
//     //   networkAddEdgeMode: PropTypes.object.isRequired,
//     //   networkExportImage: PropTypes.object.isRequired,
//     //   networkFitViewPoint: PropTypes.object.isRequired
//     // }
//     const graphRef = useRef()
//     const modalRef = useRef()
//     const dispatch = useDispatch()
//     useEffect(() => {
//       window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//       dispatch(clearTopologyData())
//       //dispatch(requestSwitchPolling(false))
//       window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//     }, [])

//     const topologyDataListener = (event, arg) => {
//       // dispatch(setTopologyData(arg))
//     }
//     const handleDisableEdit = () => {
//       dispatch(changeTopologyEvent(''))
//       graphRef.current.networkDisableEditMode()
//     }
//     const handleAddNode = () => {
//       dispatch(changeTopologyEvent('addNode'))
//       graphRef.current.networkAddNodeMode()
//     }

//     const handleAddEdge = () => {
//       dispatch(changeTopologyEvent('addEdge'))
//       graphRef.current.networkAddEdgeMode()
//     }
//     const handleSaveLayout = () => {
//       graphRef.current.networkAddEdgeMode()
//     }
//     const handleExportImage = () => {
//       graphRef.current.networkExportImage()
//     }
//     const handleFitViewPoin = () => {
//       graphRef.current.networkFitViewPoint()
//     }
//     const getNodePosition = (position) => {
//       modalRef.current.openModal(position)
//     }
//     const getEdgeLinkNode = (nodes) => {
//       modalRef.current.openModal(nodes)
//     }

//     return (
//       <div>
//         <Card>
//           {/* <SplitterLayout
//           percentage
//           customClassName={styles.mainSplitter}
//           secondaryMinSize={80}
//           onSecondaryPaneSizeChange={this.topologyPanelSizeOnChange}
//         > */}
//           {/* <div>
//             <TopologyNavContainer handleSelectNode={this.handleSelectNode} />
//           </div> */}
//           <div>
//             <TopologyAddModal onRef={modalRef} handleDisableEdit={handleDisableEdit} />
//           </div>
//           {/* </SplitterLayout> */}
//           <div
//             style={{
//               position: 'absolute',
//               width: '100%',
//               padding: '25px 15px 15px 15px'
//             }}
//           >
//             <Card
//               bordered={false}
//               style={{
//                 height: '550px',

//                 boxSizing: 'border-box',
//                 position: 'relative',
//                 width: '1080px',
//                 padding: '15px',
//                 minWidth: '761px'
//               }}
//             >
//               <div
//                 style={{
//                   height: '140px',
//                   boxSizing: 'border-box',
//                   position: 'relative',
//                   padding: '15px 10px 15px 15px',
//                   minWidth: '761px'
//                 }}
//               ></div>
//               <div
//                 style={{
//                   borderStyle: 'double',
//                   boxSizing: 'border-box',
//                   position: 'relative',
//                   top: '-50px',
//                   height: '380px'
//                 }}
//               ></div>

//               <TopologyGraph
//                 onRef={(ref) => {
//                   ref = { graphRef }
//                 }}
//                 // onRef={graphRef}
//                 getNodePosition={getNodePosition}
//                 getEdgeLinkNode={getEdgeLinkNode}
//               />
//             </Card>
//           </div>
//         </Card>
//       </div>
//     )
//   }
// }

// export default TopologyPage

import React, { useRef } from 'react'
import Card from 'antd/es/card/Card'
//import styles from './Topology.module.css'
import TopologyAddModal from '../components/topology/TopologyAddModal'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import { changeTopologyEvent } from '../features/topologySlice'
import { useDispatch } from 'react-redux'
//import TopologyToolbar from '../components/topology/'
//import TopologyNavContainer from './TopologyNavContainer'
// import TopologyToolbarContainer from './TopologyToolbarContainer'
// import TopologyGraphContainer from './TopologyGraphContainer'
// import TopologyAddModalContainer from './TopologyAddModalContainer'
//const SEND_RP_TOPOLOGY_DATA = 'SEND_RP_TOPOLOGY_DATA'
const Topology = (props) => {
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
