import React, { useRef, useEffect, useState } from 'react'
import TopologyGraph from '../components/topology/TopologyGraph/TopologyGraph'
import TopologyToolbar from '../components/topology/TopologyToolbar/TopologyToolbar'
import TopologyAddModal from '../components/topology/TopologyAddModal/TopologyAddModal'
import { Card } from 'antd'
import {
  changeTopologyEvent,
  setTopologyData,
  clearTopologyData,
  requestSwitchPolling,
  topologySelector
} from '../features/topologySlice'
import { useDispatch, useSelector } from 'react-redux'
import { SEND_RP_TOPOLOGY_DATA } from '../../../main/utils/IPCEvents'
import TopologyButtons from '../components/topology/TopologyButtons/TopologyButtons'

const TopologyPage = () => {
  const { event, nodesData } = useSelector(topologySelector)
  const [state, setState] = useState({
    open: true,
    addNodePosition: {},
    addEdgeNodes: { from: '', to: '' },
    addNodeMax: { from: 1, to: 1 }
  })
  console.log(state)
  const dispatch = useDispatch()
  let graphRef = useRef()
  let modalRef = useRef()

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
      <Card
        bodyStyle={{ boxSizing: 'border-box', width: '100%', padding: '15px', minWidth: '761px' }}
        bordered={false}
        title="Device Topology"
      >
        <div style={{ boxSizing: 'border-box', padding: '15px 10px 15px 15px', minWidth: '761px' }}>
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
              graphRef = ref
              console.log(graphRef)
            }}
            getNodePosition={getNodePosition}
            getEdgeLinkNode={getEdgeLinkNode}
          />
          <TopologyAddModal
            onRef={(ref) => {
              modalRef = ref
            }}
            handleDisableEdit={handleDisableEdit}
          />
        </div>
      </Card>
    </div>
  )
}

export default TopologyPage
