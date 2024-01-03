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
  const { onRef } = props
  const networkRef = useRef()
  console.log(networkRef)
  const dispatch = useDispatch()
  const [followPosition, setFollowPosition] = useState(true)
  const [network, setNetwork] = useState(null)
  const [nodeData, setNodeData] = useState({
    nodeMACAddress: '',
    nodeDeviceType: '',
    nodeIPAddress: '',
    nodeModel: ''
  })

  const {
    graphOption,
    editMode,
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

  useEffect(() => {
    console.log('props', props)
  }, [])

  useEffect(() => {
    switch (props.event) {
      case 'addNode':
        props.network.addNodeMode()
        break
      case 'addEdge':
        props.network.addEdgeMode()
        break
      default:
        break
    }
  }, [
    props.event,
    props.newNodeTemp,
    props.nodesIds,
    props.currentGroup,
    // prevProps.currentGroup,
    followPosition,
    props.network
  ])

  const roundnessValue = [
    0, 0.15, -2.15, 0.25, -2.25, 0.35, -2.35, 0.45, -2.45, 0.55, -2.55, 0.65, -2.65, 0.75, -2.75,
    0.85, -2.85, 0.95, -2.95
  ]

  const initNetworkInstance = (networkInstance) => {
    // networkRef.current.Network = networkInstance
    setNetwork(networkInstance)
  }

  const updateDimensions = () => {
    networkRef.current.fitView()
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

  // const networkExportImage = () => {
  //   dispatch(setImageExporting(true))
  //   const now = new Date()
  //   const nowYear = datePad(now.getFullYear().toString())
  //   const nowMonth = datePad(now.getMonth() + 1).toString()
  //   const nowDate = datePad(now.getDate().toString())
  //   const nowHours = datePad(now.getHours().toString())
  //   const nowMinutes = datePad(now.getMinutes().toString())
  //   const nowSeconds = datePad(now.getSeconds().toString())

  //   const fileName =
  //     currentGroup + nowYear + nowMonth + nowDate + nowHours + nowMinutes + nowSeconds
  //   function filter(node) {
  //     return node.tagName !== 'i'
  //   }

  //   domtoimage
  //     .toSvg(networkCanvas, { filter })
  //     .then((dataUrl) => {
  //       saveAs(dataUrl, `${fileName}.png`)
  //       return dispatch(setImageExporting(false))
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       return dispatch(setImageExporting(false))
  //     })
  // }

  const options = {
    ...graphOption,
    manipulation: {
      enabled: false,
      /* eslint-disable */
      addNode: (data, callback) => {
        this.props.getNodePosition(data)
      },
      editNode: () => {
        // console.log('editNode')
      },
      addEdge: (data, callback) => {
        /* eslint-enable */
        if (data.from !== data.to) {
          this.props.getEdgeLinkNode(data)
        }
      },
      editEdge: {
        editWithoutDrag: () => {
          //console.log('editEdge')
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
      //console.log(edges)
      // console.log(nodes)
    }
  }

  // console.log(networkRef.current)

  return (
    <div style={{ border: 'double', marginTop: '50px', height: 'calc(100%-96px)' }}>
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
          // onRef={onRef}
          graph={graph}
          options={options}
          events={events}
          getNetwork={initNetworkInstance}
        />
      </ContextMenuTrigger>
    </div>
  )
}

export default React.memo(TopologyGraph)

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
  //console.log('element', element)
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

/*
import React, { useRef, useEffect } from 'react';
import { Graph, Edge } from 'react-vis-network';
import ContextMenuTrigger from './ContextMenuTrigger';
import 'react-vis-network/styles/styles.css';
import './styles.css';

const TopologyGraph = (props) => {
 const network = useRef(null);
 const nodes = useRef([]);
 const edges = useRef([]);

 const fitViewPointOption = {
    nodes: [],
 };

 const getEdgeLinkNode = (edgeData) => {
    const edgeLinkNode = network.current.body.data.edges.get(edgeData.id);
    props.setEdgeLinkNode(edgeLinkNode);
 };

 const getNodePosition = (nodeData) => {
    const nodePosition = network.current.body.data.nodes.get(nodeData.id);
    props.setNodePosition(nodePosition);
 };

 const nodeStyle = (status, model) => {
    const node = {
      color: '#2b828d',
      shape: 'box',
      borderWidth: 2,
    };

    if (status === 'disconnected') {
      node.color = '#8b2b2b';
    }

    if (model === 'EHG2408' || model === '') {
      node.shape = 'hexagon';
    }

    return node;
 };

 const edgeStyle = (status, leftMAC, rightMAC) => {
    const edge = {
      color: '#848484',
      font: {
        color: '#848484',
      },
      label: `${status.toUpperCase()}`,
      dashes: false,
    };

    return edge;
 };

 useEffect(() => {
    if (props.graphOption.nodesData) {
      nodes.current = [];
      edges.current = [];

      const showIds = [];
      const virtualMac = [];
      const roundnessList = {};

      Object.entries(props.graphOption.nodesData).forEach(
        ([key, element]) => {
          const label = `${element.MACAddress}${
            props.graphOption.showIP ? `\n${element.IPAddress}` : ''
          }${props.graphOption.showModel ? `\n${element.model}` : ''}${
            props.graphOption.showHostname ? `\n${element.hostname}` : ''
          }`;
          const x =
            props.graphOption.followPosition ||
            props.graphOption.newNodeTemp === key
              ? element.x
              : undefined;
          const y =
            props.graphOption.followPosition ||
            props.graphOption.newNodeTemp === key
              ? element.y
              : undefined;

          (element.model === 'EHG2408' || element.model === '') &&
            virtualMac.push(element.MACAddress);

          nodes.current.push({
            id: key,
            label,
            x,
            y,
            ...nodeStyle(element.status, element.model),
          });
          showIds.push(key);
        }
      );

      Object.entries(props.graphOption.virtualNodeData).forEach(
        ([key, element]) => {
          const label = '';
          const x =
            props.graphOption.followPosition ||
            props.graphOption.newNodeTemp === key
              ? element.x
              : undefined;
          const y =
            props.graphOption.followPosition ||
            props.graphOption.newNodeTemp === key
              ? element.y
              : undefined;
          nodes.current.push({
            id: key,
            label,
            x,
            y,
            ...nodeStyle(element.status, element.model),
          });
          showIds.push(key);
        }
      );

      Object.entries(props.graphOption.edgesData).forEach(
        ([key, value]) => {
          const MACs = key.split('_');
          const leftMAC = MACs[0];
          const rightMAC = MACs[1];
          const edgeLabel = value.status;

          const leftIndex = showIds.indexOf( = MACs[1];

          edges.current.push({
            id: key,leftMAC);
          const rightIndex = showIds.indexOf
            from: leftMAC,
            to: rightMAC,
(rightMAC);

          const leftRoundness =            label: `${value.status.toUpperCase()}`,
            ...
            roundnessList[leftMAC] !== undefined
              ?edgeStyle(value.status, leftMAC, rightMAC),
 roundnessList[leftMAC]
              : 0.5;          });
        }
      );

      network.current.setData({ nodes:
          const rightRoundness =
            roundnessList[rightMAC nodes.current, edges: edges.current });
      network.current.redraw] !== undefined
              ? roundnessList[rightMAC]
();
    }
 }, [props.graphOption]);

               : 0.5;

          if (leftIndex > -1const options = {
    autoResize: true,
    nodes: { && rightIndex > -1) {
            edges.
      borderWidth: 2,
      size: 30,
      fontcurrent.push({
              id: key,
              from: leftMAC,
: {
        size: 12,
        color: '#00              to: rightMAC,
              label: edgeLabel,
              leftRound0000',
      },
      shapeProperties: {
        borderRadius: 5ness,
              rightRoundness,
              ...edgeStyle(value.status, left,
      },
    },
    edges: {
      width: 2,
      fontMAC, rightMAC),
            });
          }
        }
      );

     : {
        size: 10,
        color: '#000000',
      }, virtualMac.forEach((mac) => {
        if (showIds.includes(mac)) {

      arrows: {
        to: {
          enabled: true,
          scaleFactor:  const virtualNodes = [];
          props.graphOption.virtualNodeData[mac].forEach((1,
        },
      },
    },
    layout: {
      hierarchical: {
        directionvirtualNode) => {
            if (showIds.includes(virtualNode.id)) {
              virtualNodes.push: 'UD',
        sortMethod: 'directed',
      },
    },
    interaction: {
      drag(virtualNode.id);
            }
          });

          virtualNodes.forEach((virtualNode, indexNodes: true,
      dragView: true,
      hover: true,
      selectConnectedEdges: false,
) => {
            if (index < virtualNodes.length - 1) {
              edges.current.push({
                     zoomView: true,
    },
    physics: {
      enabled: true,
      solver: 'repulsion',
      id: `virtualEdge_${virtualNode}_${virtualNodes[index + 1]}`,
                from: virtualNode,
 repulsion: {
        nodeDistance: 150,
      },
      hierarchicalRepulsion: {
        nodeDistance:                to: virtualNodes[index + 1],
                color: { color: '#848484', highlight: '#8 120,
      },
      stabilization: {
        enabled: true,
        iterations: 1000,48484' },
                label: 'virtual',
                dashes: true,
              });
      },
    },
 };

 return (
    <div className="graph-container">
      <Graph
        ref={
            }
          });
        }
      });

      network.current.fit({
        nodes: nodes.current,
       network}
        graph={props.graphOption.graph}
        options={options}
        getNetwork={(networkInstance) => {
          animation: true,
      });

      props.setEdgeLinkNode(null);
      props.setNodePosition(null);
    }
 network.current = networkInstance;
        }}
        events={{
          selectNode: (event) => {
            getNodePosition(event. }, [props.graphOption]);

 const events = {
    onMouseOver: (event) => {
      const nodeId = event.nodesnodes[0]);
          },
          selectEdge: (event) => {
            getEdgeLinkNode(event.edges[0]);
          },
        }}
     [0];
      if (nodeId) {
        const node = nodes.current.find((n) => n.id === nodeId);
        const nodeLabel >
        {nodes.current.map((node) => (
          <ContextMenuTrigger
            key={node.id}
            node = node.label;
        props.setHoverNode({ nodeId, nodeLabel });
      }
    },
    onMouseOut: ()={node}
            nodes={nodes.current}
            edges={edges.current}
            getNodePosition={getNodePosition}
            get => {
      props.setHoverNode(null);
    },
    onSelectNode: (event) => {
      const nodeId = event.nodes[0];EdgeLinkNode={getEdgeLinkNode}
          />
        ))}
        {edges.current.map((edge) => (
          <Edge
            key={edge.id}

      const node = nodes.current.find((n) => n.id === nodeId);
      getNodePosition(node);
    },
    onSelectEdge: (event) => id={edge.id}
            from={edge.from}
            to={edge.to}
            label={edge.label}
            font={edge.font}
            dashes={edge.dashes}
          {
      const edgeId = event.edges[0];
      const edge = edges.current.find((e) => e.id === edgeId);
      getEdgeLinkNode(edge);
    },
 };

 return (
    <div className="graph-container">
      <Graph />
        ))}
      </Graph>
    </div>
 );
};

export default TopologyGraph;
*/
