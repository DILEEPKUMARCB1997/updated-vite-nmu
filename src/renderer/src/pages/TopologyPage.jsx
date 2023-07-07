import React, { useRef } from 'react'
import Card from 'antd/es/card/Card'
//import styles from './Topology.module.css'
import TopologyAddModal from '../components/topology/TopologyAddModal'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import { changeTopologyEvent } from '../features/topologySlice'
import { useDispatch } from 'react-redux'
import TopologyToolbar from '../components/topology/TopologyToolbar'
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
            <TopologyNavContainer handleSelectNode={handleSelectNode} />
          </div> */}
        <div
          style={{
            height: 'calc(100vh - 140px)',
            position: 'relative',
            padding: '15px 10px 15px 15px',
            minWidth: '761px'
          }}
        >
          <TopologyToolbar
            handleExportImage={handleExportImage}
            handleFitViewPoint={handleFitViewPoint}
            handleAddNode={handleAddNode}
            handleSearchNode={handleSearchNode}
            handleAddEdge={handleAddEdge}
            handleDisableEdit={handleDisableEdit}
            handleSaveLayout={handleSaveLayout}
            handleChangeShowLabelItem={handleChangeShowLabelItem}
          />
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
