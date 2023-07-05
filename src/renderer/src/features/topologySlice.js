import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_MP_SWITCH_POLLING_TOPOLOGY } from '../../../main/utils/IPCEvents'
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
export const requestSwitchPolling = (param) => () => {
  window.electron.ipcRenderer.send(REQUEST_MP_SWITCH_POLLING_TOPOLOGY, {
    isStartPolling: param
  })
}
export const setTopologyData = (param) => (dispatch, getState) => {
  const { nodesData, edgesData, virtualNodeData } = param

  Object.keys(nodesData).forEach((MACAddress) => {
    const { defaultDeviceData } = getState().discovery
    if (defaultDeviceData[MACAddress] !== undefined) {
      nodesData[MACAddress].status =
        defaultDeviceData[MACAddress].deviceType === 'all' ||
        (defaultDeviceData[MACAddress].deviceType === 'snmp' &&
          defaultDeviceData[MACAddress].online)
          ? 'online'
          : 'offline'
      nodesData[MACAddress].IPAddress = defaultDeviceData[MACAddress].IPAddress
      nodesData[MACAddress].model = defaultDeviceData[MACAddress].model
      nodesData[MACAddress].hostname = defaultDeviceData[MACAddress].hostname
    }
  })
  dispatch(SET_TOPOLOGY_DATA)
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
    changeTopologyEvent: (state, action) => {
      return { ...state, event: action.payload }
    },
    switchEditMode: (state, action) => {
      return { ...state, editMode: action.payload }
    },
    setTopologyViewSettings: (state, action) => {
      return { ...state, [action.payload]: !state[action.payload] }
    },
    clearTopologyLayout: (state, payload) => {
      return {
        ...state,
        virtualNodeData: { payload },
        nodesData: { payload },
        edgesData: { payload },
        nodesIds: [payload],
        selectNodes: [payload],
        selectEdges: [payload]
      }
    },
    removeNetworkSelectElement: (state, { payload }) => {
      let { nodesData, edgesData, virtualNodeData } = state
      const { selectNodes, selectEdges, changeGroupMemberData } = state

      selectNodes.forEach((element) => {
        if (element.startsWith('virtual')) {
          const { [element]: _, ...newData } = virtualNodeData
          virtualNodeData = { ...newData }
        } else {
          const { [element]: _, ...newData } = nodesData
          nodesData = { ...newData }
          if (state.currentGroup === 'all') {
            if (changeGroupMemberData.addDevice[element] !== undefined) {
              changeGroupMemberData.addDevice[element] = undefined
            } else {
              changeGroupMemberData.removeDevice.push(element)
            }
          }
        }
      })
      selectEdges.forEach((element) => {
        const { [element]: _, ...newData } = edgesData
        edgesData = { ...newData }
      })
      return {
        ...state,
        nodesData,
        edgesData,
        virtualNodeData,
        nodesIds: Object.keys(nodesData),
        selectNodes: [payload],
        selectEdges: [payload],
        changeGroupMemberData
      }
    },
    SET_TOPOLOGY_DATA: (state, action) => {
      if (state.event !== '') {
        return state
      }
      const { nodesData, edgesData, virtualNodeData } = action.payload
      return {
        ...state,
        virtualNodeData,
        nodesData,
        edgesData,
        nodesIds: Object.keys(nodesData)
      }
    },
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
  changeTopologyEvent,
  switchEditMode,
  setTopologyViewSettings,
  clearTopologyLayout,
  removeNetworkSelectElement,
  SET_TOPOLOGY_DATA,

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
