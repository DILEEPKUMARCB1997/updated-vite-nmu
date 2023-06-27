import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GROUP_MEMBER_CHANGE,
  REQUEST_MP_SAVE_TOPOLOGY_LAYOUT,
  REQUEST_MP_SET_THE_GROUP_DATA,
  RESPONSE_RP_SAVE_TOPOLOGY_LAYOUT
} from '../../../main/utils/IPCEvents'

export const requestSaveTopologyLayout = (positions, callback) => (dispatch, getState) => {
  const { edgesData, currentGroup, nodesIds, changeGroupMemberData } = getState().topology
  window.electron.ipcRenderer.once(RESPONSE_RP_SAVE_TOPOLOGY_LAYOUT, (event, arg) => {
    callback(arg.success)
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SAVE_TOPOLOGY_LAYOUT, {
    positions,
    edgesData,
    currentGroup
  })
  if (currentGroup === 'all') {
    window.electron.ipcRenderer.send(REQUEST_MP_GROUP_MEMBER_CHANGE, {
      changeGroupMemberData
    })
  } else {
    window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
      cmd: 'addRemoveDevice',
      groupId: currentGroup,
      MACAddressList: nodesIds
    })
  }
  dispatch(clearTopologyData())
}

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
  reducers: {
    setDeviceListSelect: (state, { payload }) => {
      const { MACAddress } = payload
      return { ...state, devicelistSelect: MACAddress }
    },
    setNetworkSelectElement: (state, { payload }) => {
      const { nodes, edges } = payload
      return { ...state, selectEdges: edges, selectNodes: nodes }
    },
    setImageExporting: (state, { payload }) => {
      return { ...state, currentGroup: payload }
    },
    clearNewNodeTemp: (state) => {
      return { ...state, newNodeTemp: '' }
    },
    clearTopologyData: (state) => {
      return {
        ...state,
        event: '',
        editMode: false,
        selectNodes: [],
        selectEdges: [],
        changeGroupMemberData: {
          addDevice: {},
          removeDevice: []
        }
      }
    }
  }
})

export const {
  setDeviceListSelect,
  setNetworkSelectElement,
  clearNewNodeTemp,
  clearTopologyData,
  setImageExporting
} = topologySlice.actions

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
