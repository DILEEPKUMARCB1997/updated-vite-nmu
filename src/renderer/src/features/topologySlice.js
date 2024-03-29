/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_SWITCH_POLLING_TOPOLOGY,
  REQUEST_MP_TOPOLOGY_SET_CURRENT_GROUP,
  REQUEST_MP_GROUP_MEMBER_CHANGE,
  REQUEST_MP_SAVE_TOPOLOGY_LAYOUT,
  REQUEST_MP_SET_THE_GROUP_DATA,
  RESPONSE_RP_SAVE_TOPOLOGY_LAYOUT,
  RESPONSE_RP_GET_DEVICE_PROPERTIES,
  REQUEST_MP_GET_DEVICE_PROPERTIES,
  SEND_RP_TOPOLOGY_DATA
} from '../../../main/utils/IPCEvents'
import { createSelector } from 'reselect'
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

export const setTopologyData = (param) => (dispatch, getState) => {
  const { nodesData, edgesData, virtualNodeData } = param
  console.log('NodesData', nodesData)
  console.log('EdgesData', edgesData)
  console.log('VirtualNode', virtualNodeData)
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
  dispatch(settingTopologyData({ nodesData, edgesData, virtualNodeData }))
}

export const requestSwitchPolling = (param) => () => {
  window.electron.ipcRenderer.send(REQUEST_MP_SWITCH_POLLING_TOPOLOGY, {
    isStartPolling: param
  })
  console.log('startTopology', param)
}

export const setCurrentGroup = (payload) => (dispatch) => {
  window.electron.ipcRenderer.send(REQUEST_MP_TOPOLOGY_SET_CURRENT_GROUP, {
    groupId: payload === 'all' ? 0 : payload
  })
  dispatch(setTopologyCurrentGroup(payload))
}

export const setNetworkSelectElement = (payload) => (dispatch) => {
  dispatch(settingNetworkSelectElement(payload))

  const { nodes } = payload
  let devicelistSelect = ''
  if (nodes.length === 1 && !nodes[0].startsWith('virtual')) {
    ;[devicelistSelect] = nodes
  }
  dispatch(SET_DEVICE_LIST_SELECT({ MACAddress: devicelistSelect }))
}

export const requestGetDeviceProperties = (payload) => (dispatch) => {
  const { MACAddress } = payload
  if (MACAddress !== '') {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_DEVICE_PROPERTIES, (event, arg) => {
      dispatch(setSNMPDeviceProperties(arg.data))
    })

    window.electron.ipcRenderer.send(REQUEST_MP_GET_DEVICE_PROPERTIES, { MACAddress })
  }
}

export const setDeviceListSelect = (payload) => (dispatch) => {
  dispatch(SET_DEVICE_LIST_SELECT(payload))
  dispatch(requestGetDeviceProperties(payload))
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
    changeCurrentGroup: (state, { payload }) => {
      return { ...state, currentGroup: payload }
    },
    setTopologyCurrentGroup: (state, action) => {
      return {
        ...state,
        currentGroup: action.payload,
        selectNodes: [],
        selectEdges: [],
        nodesData: {},
        edgesData: {},
        virtualNodeData: {},
        nodesIds: [],
        devicelistSelect: ''
      }
    },
    addNewVirtualNode: (state, action) => {
      const { x, y } = action.payload
      let nodeName
      const virtualNodeList = Object.keys(state.virtualNodeData)
      for (let i = 0; i <= virtualNodeList.length; i += 1) {
        if (!virtualNodeList.includes(`virtual${i}`)) {
          nodeName = `virtual${i}`
          break
        }
      }
      return {
        ...state,
        virtualNodeData: {
          ...state.virtualNodeData,
          [nodeName]: {
            status: 'virtual',
            x,
            y
          }
        },
        newNodeTemp: nodeName
      }
    },
    addNewNode: (state, action) => {
      const { MACAddress, x, y, groupIds } = action.payload
      const { changeGroupMemberData } = state
      if (state.currentGroup === 'all') {
        const index = changeGroupMemberData.removeDevice.indexOf(MACAddress)
        if (index !== -1) {
          changeGroupMemberData.removeDevice.splice(index, 1)
        } else {
          changeGroupMemberData.addDevice[MACAddress] = groupIds
        }
      }
      return {
        ...state,
        nodesData: {
          ...state.nodesData,
          [MACAddress]: {
            IPAddress: '',
            MACAddress,
            model: '',
            hostname: '',
            status: 'offline',
            x,
            y
          }
        },
        newNodeTemp: MACAddress,
        nodesIds: [...state.nodesIds, MACAddress],
        changeGroupMemberData
      }
    },
    addNewEdge: (state, action) => {
      const { fromId, toId, fromPort, toPort } = action.payload
      let newNodes = {}
      let key
      const isFromVirtual = fromId.startsWith('virtual')
      const isToVirtual = toId.startsWith('virtual')

      if (isFromVirtual && isToVirtual) {
        key = `${fromId}_${toId}`
        newNodes = {
          leftPort: '',
          rightPort: '',
          status: 'notExist'
        }
      } else if (isFromVirtual) {
        key = `${toId}_${fromId}`
        newNodes = {
          leftPort: `port${toPort}`,
          rightPort: '',
          status: 'notExist'
        }
      } else if (isToVirtual) {
        key = `${fromId}_${toId}`
        newNodes = {
          leftPort: `port${fromPort}`,
          rightPort: '',
          status: 'notExist'
        }
      } else if (toId > fromId) {
        key = `${fromId}_${toId}_port${fromPort}_port${toPort}`
        newNodes = {
          leftPort: `port${fromPort}`,
          rightPort: `port${toPort}`,
          status: 'notExist'
        }
      } else {
        key = `${toId}_${fromId}_port${toPort}_port${fromPort}`
        newNodes = {
          leftPort: `port${toPort}`,
          rightPort: `port${fromPort}`,
          status: 'notExist'
        }
      }
      return {
        ...state,
        edgesData: {
          ...state.edgesData,
          [key]: {
            ...newNodes
          }
        }
      }
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
    settingTopologyData: (state, { payload }) => {
      if (state.event !== '') {
        return state
      }
      const { nodesData, edgesData, virtualNodeData } = payload
      return {
        ...state,
        virtualNodeData,
        nodesData,
        edgesData,
        nodesIds: Object.keys(nodesData)
      }
    },

    SET_DEVICE_LIST_SELECT: (state, { payload }) => {
      const { MACAddress } = payload
      return { ...state, devicelistSelect: MACAddress }
    },
    settingNetworkSelectElement: (state, { payload }) => {
      const { nodes, edges } = payload
      return { ...state, selectEdges: edges, selectNodes: nodes }
    },
    setSNMPDeviceProperties: (state, action) => {
      return { ...state, SNMPDeviceProperties: action.payload }
    },
    setImageExporting: (state, action) => {
      return { ...state, isImageExporting: action.payload }
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
  setTopologyCurrentGroup,
  switchEditMode,
  setTopologyViewSettings,
  removeNetworkSelectElement,
  setSNMPDeviceProperties,
  settingTopologyData,
  addNewEdge,
  addNewNode,
  addNewVirtualNode,
  SET_DEVICE_LIST_SELECT,
  settingNetworkSelectElement,
  clearNewNodeTemp,
  clearTopologyData,
  clearTopologyLayout,
  setImageExporting
} = topologySlice.actions
const memoizedTopologySelector = (state) => state.topology
export const topologySelector = createSelector(
  memoizedTopologySelector,
  ({
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
  }) => ({
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
  })
)
export default topologySlice
