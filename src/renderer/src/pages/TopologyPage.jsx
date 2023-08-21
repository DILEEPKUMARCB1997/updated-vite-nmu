/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import TopologyToolbar from '../components/Topology/TopologyToolbar/TopologyToolbar'
// import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { Card, Typography } from 'antd'
import { datePad } from '../components/comman/tools'
import domtoimage from 'dom-to-image'
// import domtoimage from 'dom-to-image-more'
import { saveAs } from 'file-saver'
import {
  changeTopologyEvent,
  setImageExporting,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling,
  topologySelector
} from '../features/topologySlice'
// import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
// import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'

const TopologyPage = (props) => {
  const { event, nodesData, currentGroup } = useSelector(topologySelector)
  const dispatch = useDispatch()
  let graph = useRef()
  let modalRef = useRef()
  // let graphRef = useRef()
  const [state, setState] = useState({
    open: true,
    addNodePosition: {},
    addEdgeNodes: { from: '', to: '' },
    addNodeMax: { from: 1, to: 1 }
  })
  console.log(state)
  let fitViewPointOption = {
    nodes: [],
    animation: {
      duration: 1000,
      easingFunction: 'easeOutQuart'
    }
  }

  // var modal
  // var graph

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
    dispatch(clearTopologyData())
    dispatch(requestSwitchPolling(false))
    window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
  }, [])

  const topologyDataListener = (event, arg) => {
    dispatch(setTopologyData(arg))
  }
  const openModal = (data) => {
    //console.log(props);
    if (event === 'addNode') {
      setState({
        open: true,
        addNodePosition: data
      })
    } else {
      setState({
        open: true,
        addEdgeNodes: data,
        addNodeMax: {
          from: data.from.startsWith('virtual') ? 1 : findPortMaxLength(data.from),
          to: data.to.startsWith('virtual') ? 1 : findPortMaxLength(data.to)
        }
      })
    }
  }

  const findPortMaxLength = (modeln) => {
    let Model = nodesData[modeln].model.toString('utf8')
    let MaxValue = 1
    if (Model.indexOf('-') > -1) {
      MaxValue = parseInt(Model.substring(Model.indexOf('-') - 2, Model.indexOf('-')))
    } else {
      MaxValue = parseInt(Model.substring(Model.length - 2, Model.length))
    }
    return MaxValue.toString() === 'NaN' ? 28 : MaxValue
  }

  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    // graphRef.current.networkDisableEditMode()
    graph.networkDisableEditMode()
  }
  const handleAddNode = () => {
    dispatch(changeTopologyEvent('addNode'))
    // graphRef.current.networkAddNodeMode()
    graph.networkAddNodeMode()
  }

  const handleAddEdge = () => {
    dispatch(changeTopologyEvent('addEdge'))
    // graphRef.current.networkAddEdgeMode()
    graph.networkAddEdgeMode()
  }
  const handleSaveLayout = () => {
    // graphRef.current.networkAddEdgeMode()
    graph.networkAddEdgeMode()
  }
  let networkCanvas
  const networkExportImage = (props) => {
    dispatch(setImageExporting(true))
    const now = new Date()
    const nowYear = datePad(now.getFullYear().toString())
    const nowMonth = datePad(now.getMonth() + 1).toString()
    const nowDate = datePad(now.getDate().toString())
    const nowHours = datePad(now.getHours().toString())
    const nowMinutes = datePad(now.getMinutes().toString())
    const nowSeconds = datePad(now.getSeconds().toString())
    const fileName =
      currentGroup + nowYear + nowMonth + nowDate + nowHours + nowMinutes + nowSeconds
    function filter(node) {
      return node.tagName !== 'i'
    }
    domtoimage
      .toSvg(networkCanvas, { filter: filter })
      .then((dataUrl) => {
        saveAs(dataUrl, `${fileName}.svg`)
        return dispatch(setImageExporting(false))
      })
      .catch((error) => {
        console.error(error)
        return dispatch(setImageExporting(false))
      })
  }
  //   domtoimage
  //     .toBlob(networkCanvas)
  //     .then((blob) => {
  //       window.saveAs(blob, `${fileName}.png`)
  //       return dispatch(setImageExporting(false))
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       return dispatch(setImageExporting(false))
  //     })
  // }
  const handleExportImage = () => {
    // graphRef.current.networkExportImage()
    networkExportImage()
  }
  const handleFitViewPoin = () => {
    // graphRef.current.networkFitViewPoint()
    graph.networkFitViewPoint()
  }
  const getNodePosition = (position) => {
    // modal.openModal(position)
    openModal(position)
  }
  const getEdgeLinkNode = (nodes) => {
    console.log(nodes)
    // modal.openModal(nodes)
    openModal(nodes)
  }

  return (
    <div>
      <TopologyButtons />
      {/* <TopologyButtons /> */}
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
              graph = ref
              console.log(graph)
            }}
            getNodePosition={getNodePosition}
            getEdgeLinkNode={getEdgeLinkNode}
          />
          {/* </Card> */}
          {/* <TopologyAddModal
            onRef={(ref) => {
              modalRef = ref
            }}
            handleDisableEdit={handleDisableEdit}
          /> */}
        </div>
      </Card>
    </div>
  )
}

// TopologyPage.propTypes = {
//   networkDisableEditMode: PropTypes.object.isRequired,
//   networkAddNodeMode: PropTypes.object.isRequired,
//   networkAddEdgeMode: PropTypes.object.isRequired,
//   networkExportImage: PropTypes.object.isRequired,
//   : PropTypes.object.isRequired
// }

// useEffect(() => {
//   window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//   dispatch(clearTopologyData())
//   dispatch(requestSwitchPolling(false))
//   window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
// }, [])

// const topologyDataListener = (event, arg) => {
//   dispatch(setTopologyData(arg))
// }
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
//   const handleFitViewPoint = () => {
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
//             handleFitViewPoint={handleFitViewPoint}
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
//       </Card>
//     </div>
//   )
// }
export default TopologyPage
