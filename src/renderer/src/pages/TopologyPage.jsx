/* eslint-disable no-unused-vars */

// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, forwardRef } from 'react'
import TopologyToolbar from '../components/Topology/TopologyToolbar/TopologyToolbar'
import { Card, Col, Row, Typography } from 'antd'
import { datePad } from '../components/comman/tools'
import domtoimage from 'dom-to-image'
// import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'
import { saveAs } from 'file-saver'

import {
  changeTopologyEvent,
  setImageExporting,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling,
  topologySelector
} from '../features/topologySlice'
import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'
import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'
import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'

// const Graph = forwardRef((props, ref) => {
//   return <TopologyGraph ref={ref} {...props} />
// })
// const AddModal = forwardRef((props, ref) => {
//   return <TopologyAddModal ref={ref} {...props} />
// })

const TopologyPage = (props) => {
  const { event, nodesData, currentGroup } = useSelector(topologySelector)

  const dispatch = useDispatch()

  // const [graph, setGraph] = useState(null)
  const [modal, setModal] = useState(null)
  const inputRef = useRef(null)
  const fitRef = useRef(null)

  useEffect(() => {
    window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)

    return () => {
      window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
      dispatch(clearTopologyData())
      dispatch(requestSwitchPolling(false))
    }
  }, [])

  const topologyDataListener = (event, arg) => {
    dispatch(setTopologyData(arg))
  }
  const networkExportImage = () => {
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
      .toSvg(document.createElement('element'), { filter: filter })
      .then(function (dataUrl) {
        saveAs(dataUrl, `${fileName}.svg`)
        return dispatch(setImageExporting(false))
      })
      .catch((error) => {
        console.error(error)
        return dispatch(setImageExporting(false))
        /* do something */
      })
  }
  const openModal = (data) => {
    if (event === 'addNode') {
      setOpen(true)
      setAddNodePosition(data)
    } else {
      setOpen(true)
      setAddEdgeNodes(data)
      setAddNodeMax({
        from: data.from.startsWith('virtual') ? 1 : findPortMaxLength(data.from),
        to: data.to.startsWith('virtual') ? 1 : findPortMaxLength(data.to)
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

  const showIds = []
  fitViewPointOption = {
    ...fitViewPointOption,
    nodes: showIds
  }
  const networkFitViewPoint = () => {
    //   networkRef.current.Network.fit(fitViewPointOption)
    fitRef.current?.fit(fitViewPointOption)
    console.log('FitViewPoint', fitViewPointOption)
  }

  const handleFitViewPoint = () => {
    networkFitViewPoint()
  }

  const handleAddNode = () => {
    dispatch(changeTopologyEvent('addNode'))
    inputRef.current?.networkAddNodeMode()
    // graph.networkAddNodeMode()
  }

  const getNodePosition = (position) => {
    openModal(position)
  }

  const handleSearchNode = (node) => {
    inputRef.current?.networkFocusNode(node)
  }

  const handleAddEdge = () => {
    dispatch(changeTopologyEvent('addEdge'))
    inputRef.current?.networkAddEdgeMode()
  }

  const getEdgeLinkNode = (nodes) => {
    openModal(nodes)
  }

  const handleDisableEdit = () => {
    dispatch(changeTopologyEvent(''))
    inputRef.current?.networkDisableEditMode()
  }

  const handleSaveLayout = () => {
    inputRef.current?.networkSaveLayout()
  }

  const topologyPanelSizeOnChange = () => {
    inputRef.current?.updateDimensions()
  }

  const handleSelectNode = (node) => {
    inputRef.current?.networkSelectNodes([node])
    inputRef.current?.networkFocusNode(node)
  }
  // let networkCanvas
  const handleExportImage = () => {
    networkExportImage()
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
                  graph = ref
                }}
              />
              {/* <Graph
                refs={inputRef}
                onRef={(ref) => {
                  console.log('ref'.ref)
                }}
                getNodePosition={getNodePosition}
                getEdgeLinkNode={getEdgeLinkNode}
              />
              <AddModal refs={modal} /> */}
              {/* </Card> */}

              <TopologyAddModal
                onRef={(ref) => {
                  modalRef = ref
                }}
                getNodePosition={getNodePosition}
                handleDisableEdit={handleDisableEdit}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default TopologyPage
let fitViewPointOption = {
  nodes: [],
  animation: {
    duration: 1000,
    easingFunction: 'easeOutQuart'
  }
}

//................................//

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React, { useRef, useEffect, useState, forwardRef } from 'react'
// import TopologyToolbar from '../components/Topology/TopologyToolbar/TopologyToolbar'
// import { Card, Col, Row, Typography } from 'antd'
// import { datePad } from '../components/comman/tools'
// import domtoimage from 'dom-to-image'
// // import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'
// import { saveAs } from 'file-saver'
// import {
//   setTopologyData,
//   clearTopologyData,
//   requestSwitchPolling,
//   setImageExporting,
//   topologySelector
// } from '../features/topologySlice'
// import TopologyGraph from '../components/Topology/TopologyGraph/TopologyGraph'
// import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'
// import { useDispatch, useSelector } from 'react-redux'
// import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'

// import TopologyAddModal from '../components/Topology/TopologyAddModal/TopologyAddModal'

// const TopologyPage = (props) => {
//   const dispatch = useDispatch()
//   const { event, nodesData, currentGroup } = useSelector(topologySelector)
//   const [addNodePosition, setAddNodePosition] = useState({})
//   const [addNodeMAC, setAddNodeMAC] = useState('')
//   const [addEdgeNodes, setAddEdgeNodes] = useState({
//     from: '',
//     to: ''
//   })
//   const [addNodeMax, setAddNodeMax] = useState({
//     from: 1,
//     to: 1
//   })
//   const topologyDataListener = (event, arg) => {
//     dispatch(setTopologyData(arg))
//   }
//   useEffect(() => {
//     window.electron.ipcRenderer.on(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//     return () => {
//       dispatch(clearTopologyData())
//       dispatch(requestSwitchPolling(false))
//       window.electron.ipcRenderer.removeListener(SEND_RP_TOPOLOGY_DATA, topologyDataListener)
//     }
//   }, [])
//   const networkExportImage = () => {
//     dispatch(setImageExporting(true))
//     const now = new Date()
//     const nowYear = datePad(now.getFullYear().toString())
//     const nowMonth = datePad(now.getMonth() + 1).toString()
//     const nowDate = datePad(now.getDate().toString())
//     const nowHours = datePad(now.getHours().toString())
//     const nowMinutes = datePad(now.getMinutes().toString())
//     const nowSeconds = datePad(now.getSeconds().toString())

//     const fileName =
//       currentGroup + nowYear + nowMonth + nowDate + nowHours + nowMinutes + nowSeconds

//     function filter(node) {
//       return node.tagName !== 'i'
//     }

//     domtoimage
//       .toSvg(document.createElement('element'), { filter: filter })
//       .then(function (dataUrl) {
//         saveAs(dataUrl, `${fileName}.png`)
//         return dispatch(setImageExporting(false))
//       })
//       .catch((error) => {
//         console.error(error)
//         return dispatch(setImageExporting(false))
//         /* do something */
//       })
//   }
//   const handleExportImage = () => {
//     networkExportImage()
//   }

//   const openModal = (data) => {
//     if (event === 'addNode') {
//       setOpen(true)
//       setAddNodePosition(data)
//     } else {
//       setOpen(true)
//       setAddEdgeNodes(data)
//       setAddNodeMax({
//         from: data.from.startsWith('virtual') ? 1 : findPortMaxLength(data.from),
//         to: data.to.startsWith('virtual') ? 1 : findPortMaxLength(data.to)
//       })
//     }
//   }

//   const findPortMaxLength = (modeln) => {
//     let Model = nodesData[modeln].model.toString('utf8')
//     let MaxValue = 1
//     if (Model.indexOf('-') > -1) {
//       MaxValue = parseInt(Model.substring(Model.indexOf('-') - 2, Model.indexOf('-')))
//     } else {
//       MaxValue = parseInt(Model.substring(Model.length - 2, Model.length))
//     }
//     return MaxValue.toString() === 'NaN' ? 28 : MaxValue
//   }
//   const getNodePosition = (position) => {
//     openModal(position)
//     // console.log(inputRef.current?.openModal(position))
//   }
//   const getEdgeLinkNode = (nodes) => {
//     openModal(nodes)
//   }

//   return (
//     <div>
//       <Row gutter={[16, 16]}>
//         <Col span={24}>
//           <TopologyButtons />
//         </Col>

//         <Col span={24}>
//           <Card
//             bodyStyle={{
//               boxSizing: 'border-box',
//               width: '100%',
//               padding: '15px',
//               minWidth: '761px',
//               minHeight: '520px'
//             }}
//             // style={{ height: 'calc(100vh - 105px)' }}

//             bordered={false}
//           >
//             <Typography.Title level={4}>Device Topology</Typography.Title>
//             <div
//               style={{
//                 boxSizing: 'border-box',
//                 padding: '15px 10px 15px 15px',
//                 marginTop: '20px',
//                 minWidth: '761px'
//                 // height: 'calc(100vh - 105px)'
//               }}
//             >
//               <TopologyToolbar
//                 handleExportImage={handleExportImage}
//                 // handleFitViewPoint={handleFitViewPoint}
//                 // handleAddNode={handleAddNode}
//                 // handleAddEdge={handleAddEdge}
//                 // // handleSearchNode={handleSearchNode}
//                 // handleDisableEdit={handleDisableEdit}
//                 // handleSaveLayout={handleSaveLayout}
//                 // handleChangeShowLabelItem={handleChangeShowLabelItem}
//               />
//               <TopologyGraph getNodePosition={getNodePosition} getEdgeLinkNode={getEdgeLinkNode} />
//               <TopologyAddModal />
//               {/* <Card> */}
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   )
// }
// export default TopologyPage
