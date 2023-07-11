/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import domtoimage from 'dom-to-image'
import saveAs from 'file-saver'
import Graph from 'react-graph-vis'
import { ContextMenuTrigger } from 'react-contextmenu'
import {
  clearNewNodeTemp,
  requestSaveTopologyLayout,
  setDeviceListSelect,
  setImageExporting,
  setNetworkSelectElement,
  topologySelector
} from '../../../features/topologySlice'
import { TopologyImage } from './TopologyImage'
import { discoverySelector } from '../../../features/discoverySlice'
import { openDevicesMenu } from '../../../features/UIControllSlice'
import { notification } from 'antd'
import { datePad } from '../../comman/tools'
// import PropTypes from 'prop-types'

let roundnessList = {}
let virtualMac = []

const TopologyGraph = (props) => {
  // TopologyGraph.PropTypes = {
  //   onRef: PropTypes.func.isRequired
  // }
  const networkRef = useRef()
  console.log(networkRef)
  const dispatch = useDispatch()
  const [followPosition, setFollowPosition] = useState(true)
  const [networks, setNetworks] = useState(null)
  const [nodeData, setNodeData] = useState({
    nodeMACAddress: '',
    nodeDeviceType: '',
    nodeIPAddress: '',
    nodeModel: ''
  })

  const {
    graphOption,
    // editMode,
    physics,
    showIP,
    showModel,
    newNodeTemp,
    nodesData,
    edgesData,
    virtualNodeData,
    showHostname,
    showLinkText,
    currentGroup,
    nodesIds,
    event
  } = useSelector(topologySelector)

  const { defaultDeviceData, groupDeviceData } = useSelector(discoverySelector)
  const groupDevices =
    currentGroup === 'all' ? defaultDeviceData : groupDeviceData[currentGroup].deviceList

  const collect = () => ({
    MACAddress: nodeData.nodeMACAddress,
    IPAddress: nodeData.IPAddress,
    deviceType: nodeData.deviceType,
    model: nodeData.model
  })

  useEffect((prev) => {
    //ComponentDidMount Code
    props.onRef(networkRef)
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('enter-full-screen', updateDimensions)
    networkRef.current.Network.on('select', (params) => {
      const { nodes, edges } = params
      dispatch(setNetworkSelectElement({ nodes, edges }))
      let devicelistSelect = ''
      if (nodes.length === 1 && !nodes[0].startsWith('virtual')) {
        devicelistSelect = nodes
      }
      dispatch(setDeviceListSelect({ MACAddress: devicelistSelect }))
    })

    networkRef.current.Network.on('click', () => {
      dispatch(openDevicesMenu(false))
    })
    console.log(networkRef.current.Network)

    networkRef.current.Network.on('oncontext', (params) => {
      const { x, y } = params.pointer.DOM
      // const { groupDevices, currentGroup } = props
      const rightClickMAC = networkRef.current.Network.getNodeAt({ x, y })
      console.log('rightClickMAC', rightClickMAC)
      if (
        rightClickMAC === undefined ||
        groupDevices[rightClickMAC] === undefined ||
        !groupDevices[rightClickMAC].online ||
        (currentGroup === 'all' && !groupDevices[rightClickMAC].isAUZ)
      ) {
        dispatch(openDevicesMenu(false))
      } else {
        const { MACAddress, deviceType, IPAddress, model } = groupDevices[rightClickMAC]
        dispatch(openDevicesMenu(true))
        setNodeData({
          nodeMACAddress: MACAddress,
          nodeDeviceType: deviceType,
          nodeIPAddress: IPAddress,
          nodeModel: model
        })
      }
    })

    networkRef.current.Network.on('afterDrawing', (ctx) => {
      networkCanvas = ctx.canvas
    })

    switch (event) {
      case 'addNode':
        networkRef.current.Network.addNodeMode()
        break
      case 'addEdge':
        networkRef.current.Network.addEdgeMode()
        break
      default:
        break
    }

    if (newNodeTemp !== '') {
      dispatch(clearNewNodeTemp())
    }
    if (nodesIds.length !== 0 && followPosition) {
      setFollowPosition(false)
    }
    if (!currentGroup) {
      setFollowPosition(true)
    }

    return () => {
      props.onRef(undefined)
    }
  }, [])

  let networkCanvas
  const roundnessValue = [
    0, 0.15, -2.15, 0.25, -2.25, 0.35, -2.35, 0.45, -2.45, 0.55, -2.55, 0.65, -2.65, 0.75, -2.75,
    0.85, -2.85, 0.95, -2.95
  ]

  // const initNetworkInstance = (networkInstance) => {
  //   console.log(networkInstance)

  // }

  const updateDimensions = () => {
    networkRef.current.Network.redraw()
  }

  const networkFitViewPoint = () => {
    networkRef.current.Network.fit(fitViewPointOption)
  }

  const networkFocusNode = (node) => {
    if (nodesIds.includes(node)) {
      networkRef.current.Network.focus(node, nodeFocusOption)
    }
  }

  const networkDisableEditMode = () => {
    networkRef.current.Network.disableEditMode()
  }

  const networkAddNodeMode = () => {
    networkRef.current.Network.addNodeMode()
  }

  const networkAddEdgeMode = () => {
    networkRef.current.Network.addEdgeMode()
  }

  const handleShowSaveResult = () => (result) => {
    const type = result ? 'success' : 'error'
    notification[type]({
      message: `Topology Layout ${result ? 'successfully saved.' : 'save error.'}`
    })
  }

  const networkSaveLayout = () => {
    dispatch(
      requestSaveTopologyLayout(networkRef.current.Network.getPositions(), handleShowSaveResult())
    )
  }

  const networkSelectNodes = (nodeIds) => {
    networkRef.current.Network.selectNodes(nodeIds)
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
      .toSvg(networkCanvas, { filter })
      .then((dataUrl) => {
        saveAs(dataUrl, `${fileName}.svg`)
        return dispatch(setImageExporting(false))
      })
      .catch((error) => {
        console.error(error)
        return dispatch(setImageExporting(false))
      })
  }

  const options = {
    ...graphOption,
    manipulation: {
      enabled: false,
      /* eslint-disable */
      addNode: (data, callback) => {
        this.props.getNodePosition(data)
      },
      editNode: () => {
        console.log('editNode')
      },
      addEdge: (data, callback) => {
        /* eslint-enable */
        if (data.from !== data.to) {
          this.props.getEdgeLinkNode(data)
        }
      },
      editEdge: {
        editWithoutDrag: () => {
          console.log('editEdge')
        }
      }
    },
    physics: {
      ...graphOption.physics,
      enabled: physics
    }
  }

  const graph = { nodes: [], edges: [] }
  const showIds = []
  virtualMac = []

  Object.entries(nodesData).forEach(([key, element]) => {
    const label = `${element.MACAddress}${showIP ? `\n${element.IPAddress}` : ''}${
      showModel ? `\n${element.model}` : ''
    }${showHostname ? `\n${element.hostname}` : ''}`
    const x = followPosition || newNodeTemp === key ? element.x : undefined
    const y = followPosition || newNodeTemp === key ? element.y : undefined

    ;(element.model === 'EHG2408' || element.model === '') && virtualMac.push(element.MACAddress)

    graph.nodes.push({
      id: key,
      label,
      x,
      y,
      ...nodeStyle(element.status, element.model)
    })
    showIds.push(key)
  })

  Object.entries(virtualNodeData).forEach(([key, element]) => {
    const label = ''
    const x = followPosition || newNodeTemp === key ? element.x : undefined
    const y = followPosition || newNodeTemp === key ? element.y : undefined
    graph.nodes.push({
      id: key,
      label,
      x,
      y,
      ...nodeStyle(element.status, element.model)
    })
    showIds.push(key)
  })

  Object.entries(edgesData).forEach(([key, value]) => {
    const MACs = key.split('_')
    const leftMAC = MACs[0]
    const rightMAC = MACs[1]
    const { label, font, color, dashes } = edgeStyle(value, leftMAC, rightMAC)
    graph.edges.push({
      id: key,
      from: leftMAC,
      to: rightMAC,
      smooth: {
        roundness: roundnessValue[CalculateRoundness(`${MACs[0]}_${MACs[1]}`)]
      },
      label: showLinkText ? label : '',
      font,
      color,
      dashes
    })
  })

  fitViewPointOption = {
    ...fitViewPointOption,
    nodes: showIds
  }

  const events = {
    select: function (event) {
      var { nodes, edges } = event
      console.log(edges)
      console.log(nodes)
    }
  }

  return (
    <div>
      <ContextMenuTrigger
        id="default_table_row_menu"
        MACAddress={nodeData.nodeMACAddress}
        deviceType={nodeData.nodeDeviceType}
        IPAddress={nodeData.nodeIPAddress}
        model={nodeData.nodeModel}
        collect={collect}
        attributes={{
          style: {
            height: '100%'
          }
        }}
      >
        <Graph
          ref={networkRef}
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => setNetworks(network)}
        />
      </ContextMenuTrigger>
    </div>
  )
}

export default TopologyGraph

const nodeFocusOption = {
  scale: 1.0,
  animation: {
    duration: 1000,
    easingFunction: 'easeOutQuart'
  }
}

let fitViewPointOption = {
  nodes: [],
  animation: {
    duration: 1000,
    easingFunction: 'easeOutQuart'
  }
}

const onlineColor = 'blue'
const offlineColor = 'red'
const virtualColor = 'purple'

const matchColor = 'black'
const nonMatchColor = 'red'
// eslint-disable-next-line no-unused-vars
const notExistColor = 'gray'
const nonLayoutColor = 'black'
const blockedColor = 'orange'

const nodeStyle = (status, model) => {
  switch (status) {
    case 'online':
      return {
        image: TopologyImage(model),
        font: { color: onlineColor },
        color: onlineColor
      }
    case 'offline': {
      if (model === '') {
        return {
          image: TopologyImage('EHG2408'),
          font: { color: offlineColor },
          color: offlineColor
        }
      } else {
        return {
          image: TopologyImage(model),
          font: { color: offlineColor },
          color: offlineColor
        }
      }
    }
    case 'virtual': {
      return {
        shape: 'dot',
        font: { color: virtualColor },
        size: 8,
        color: virtualColor
      }
    }
    default:
      return {
        // eslint-disable-next-line no-undef
        image: unknow,
        font: { color: onlineColor },
        color: onlineColor
      }
  }
}

const edgeStyle = (element, leftMAC, rightMAC) => {
  console.log('element', element)
  //console.log('leftMAC', leftMAC);
  //console.log('rightMAC', rightMAC);
  //console.log('virtualMAC', virtualMac);
  switch (element.status) {
    case 'virtual': {
      const label = leftMAC.startsWith('virtual') ? '' : `${leftMAC}:${element.leftPort}`
      return {
        label,
        font: { color: virtualColor },
        color: { color: virtualColor, highlight: virtualColor }
      }
    }
    case 'match':
      return {
        label: `${leftMAC}:${element.leftPort}\n${rightMAC}:${element.rightPort}`,
        font: { color: matchColor },
        color: { color: matchColor, highlight: matchColor }
      }
    case 'blocked':
      return {
        label: `${leftMAC}:${element.leftPort}\n${rightMAC}:${element.rightPort}`,
        font: { color: blockedColor },
        color: { color: blockedColor, highlight: blockedColor }
      }
    case 'nonMatch': {
      const leftRealPort = element.realData.leftPort
      const rightRealPort = element.realData.rightPort
      const { leftPort, rightPort } = element
      const label = rightMAC.startsWith('virtual')
        ? `${leftMAC}:${leftPort}${leftRealPort !== '' ? `(${leftRealPort})` : ''}`
        : `${leftMAC}:${leftPort}${
            leftRealPort !== '' ? `(${leftRealPort})` : ''
          }\n${rightMAC}:${rightPort}${rightRealPort !== '' ? `(${rightRealPort})` : ''}`

      return {
        label,
        font: { color: nonMatchColor },
        color: { color: nonMatchColor, highlight: nonMatchColor }
      }
    }
    case 'nonLayout': {
      return {
        label: `${leftMAC}:${element.leftPort}\n${rightMAC}:${element.rightPort}`,
        font: { color: nonLayoutColor },
        color: { color: nonLayoutColor, highlight: nonLayoutColor }
      }
    }
    default: {
      if (isVirtualMac({ leftMAC, rightMAC, element }) && !rightMAC.startsWith('virtual')) {
        return {
          label: rightMAC.startsWith('virtual')
            ? `${leftMAC}:${element.leftPort}`
            : `${leftMAC}:${element.leftPort}\n${rightMAC}:${element.rightPort}`,
          font: { color: virtualColor },
          color: {
            color: virtualColor,
            highlight: virtualColor
          },
          dashes: false
        }
      } else {
        return {
          label: rightMAC.startsWith('virtual')
            ? `${leftMAC}:${element.leftPort}`
            : `${leftMAC}:${element.leftPort}\n${rightMAC}:${element.rightPort}`,
          font: { color: nonLayoutColor },
          color: { color: nonLayoutColor, highlight: nonLayoutColor },
          dashes: true
        }
      }
    }
  }
}

const isVirtualMac = (Macs) => {
  const { leftMAC, rightMAC, element } = Macs
  const virtualPort = ['port7', 'port8']
  if (virtualMac.includes(leftMAC) || virtualMac.includes(rightMAC)) {
    if (virtualPort.includes(element.leftPort) || virtualPort.includes(element.rightPort)) {
      return true
    } else {
      return false
    }
  } else return false
}

const CalculateRoundness = (key) => {
  if (roundnessList[key] === undefined) {
    roundnessList[key] = 0
  } else {
    roundnessList[key] += 1
  }
  return roundnessList[key]
}
