import { createSlice } from '@reduxjs/toolkit'

const topologySlice = createSlice({
  name: 'topologySlice',
  initialState: {
    graphOption: {
      nodes: {
        shapeProperties: {
          useBorderWithImage: false
        },
        scaling: {
          min: 16,
          max: 32
        },
        shape: 'image',
        font: {
          size: 12
        }
      },
      edges: {
        arrows: {
          to: false,
          middle: false,
          from: false
        },
        smooth: {
          type: 'curvedCW'
        },
        length: 450,
        font: {
          size: 12
        }
      },
      interaction: {
        multiselect: true
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -27300,
          centralGravity: 0.4,
          springLength: 100,
          springConstant: 0.01,
          damping: 0.09
        },
        maxVelocity: 61,
        minVelocity: 0.55,
        timestep: 1
      }
    },
    virtualNodeData: {},
    nodesData: {},
    edgesData: {},
    nodesIds: [],
    currentGroup: 'all',
    editMode: false,
    event: '',
    showIP: true,
    showModel: true,
    showHostname: true,
    showLinkText: true,
    physics: false,
    selectNodes: [],
    selectEdges: [],
    newNodeTemp: '',

    changeGroupMemberData: {
      addDevice: {},
      removeDevice: []
    },
    devicelistSelect: '',
    isImageExporting: false,
    SNMPDeviceProperties: {}
  },
  reducers: {}
})

export const {} = topologySlice.actions

export const topologySelector = (state) => {
  const {
    graphOption,
    virtualNodeData,
    nodesData,
    edgesData,
    nodesIds,
    currentGroup,
    editMode,
    event,
    showIP,
    showModel,
    showHostname,
    showLinkText,
    physics,
    selectNodes,
    selectEdges,
    newNodeTemp,
    changeGroupMemberData,
    devicelistSelect,
    isImageExporting,
    SNMPDeviceProperties
  } = state.topology
  return {
    graphOption,
    virtualNodeData,
    nodesData,
    edgesData,
    nodesIds,
    currentGroup,
    editMode,
    event,
    showIP,
    showModel,
    showHostname,
    showLinkText,
    physics,
    selectNodes,
    selectEdges,
    newNodeTemp,
    changeGroupMemberData,
    devicelistSelect,
    isImageExporting,
    SNMPDeviceProperties
  }
}

export default topologySlice
