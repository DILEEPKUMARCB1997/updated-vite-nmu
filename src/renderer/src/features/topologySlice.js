// /* eslint-disable no-dupe-keys */
// import { createSlice } from '@reduxjs/toolkit'
// import {
//   REQUEST_MP_GROUP_MEMBER_CHANGE,
//   REQUEST_MP_SAVE_TOPOLOGY_LAYOUT,
//   REQUEST_MP_SET_THE_GROUP_DATA,
//   RESPONSE_RP_SAVE_TOPOLOGY_LAYOUT
// } from '../../../main/utils/IPCEvents'

// export const requestSaveTopologyLayout = (positions, callback) => (dispatch, getState) => {
//   const { edgesData, currentGroup, nodesIds, changeGroupMemberData } = getState().topology
//   window.electron.ipcRenderer.once(RESPONSE_RP_SAVE_TOPOLOGY_LAYOUT, (event, arg) => {
//     callback(arg.success)
//   })
//   window.electron.ipcRenderer.send(REQUEST_MP_SAVE_TOPOLOGY_LAYOUT, {
//     positions,
//     edgesData,
//     currentGroup
//   })
//   if (currentGroup === 'all') {
//     window.electron.ipcRenderer.send(REQUEST_MP_GROUP_MEMBER_CHANGE, {
//       changeGroupMemberData
//     })
//   } else {
//     window.electron.ipcRenderer.send(REQUEST_MP_SET_THE_GROUP_DATA, {
//       cmd: 'addRemoveDevice',
//       groupId: currentGroup,
//       MACAddressList: nodesIds
//     })
//   }
//   dispatch(clearTopologyData())
//   dispatch(changeTopologyEvent())
// }

// const topologySlice = createSlice({
//   name: 'topologySlice',
//   initialState: {
//     graphOption: {
//       nodes: {
//         shapeProperties: {
//           useBorderWithImage: false
//         },
//         scaling: {
//           min: 16,
//           max: 32
//         },
//         shape: 'image',
//         font: {
//           size: 12
//         }
//       },
//       edges: {
//         arrows: {
//           to: false,
//           middle: false,
//           from: false
//         },
//         smooth: {
//           type: 'curvedCW'
//         },
//         length: 450,
//         font: {
//           size: 12
//         }
//       },
//       interaction: {
//         multiselect: true
//       },
//       physics: {
//         barnesHut: {
//           gravitationalConstant: -27300,
//           centralGravity: 0.4,
//           springLength: 100,
//           springConstant: 0.01,
//           damping: 0.09
//         },
//         maxVelocity: 61,
//         minVelocity: 0.55,
//         timestep: 1
//       }
//     },
//     virtualNodeData: {},
//     nodesData: {},
//     edgesData: {},
//     nodesIds: [],
//     currentGroup: 'all',
//     editMode: false,
//     event: '',
//     showIP: true,
//     showModel: true,
//     showHostname: true,
//     showLinkText: true,
//     physics: false,
//     selectNodes: [],
//     selectEdges: [],
//     newNodeTemp: '',

//     changeGroupMemberData: {
//       addDevice: {},
//       removeDevice: []
//     },
//     devicelistSelect: '',
//     isImageExporting: false,
//     SNMPDeviceProperties: {}
//   },
//   reducers: {
//   addNewVirtualNode: (state, { payload }) => {
//     const { x, y } = payload
//     let nodeName
//     const virtualNodeList = Object.keys(state.virtualNodeData)
//     for (let i = 0; i <= virtualNodeList.length; i += 1) {
//       if (!virtualNodeList.includes(`virtual${i}`)) {
//         nodeName = `virtual${i}`
//         break
//       }
//     }
//     return {
//       ...state,
//       virtualNodeData: {
//         ...state.virtualNodeData,
//         [nodeName]: {
//           status: 'virtual',
//           x,
//           y
//         }
//       },
//       newNodeTemp: nodeName
//     }
//   },
//   addNewEdge: (state, { payload }) => {
//     const { fromId, toId, fromPort, toPort } = payload
//     let newNodes = {}
//     let key
//     const isFromVirtual = fromId.startsWith('virtual')
//     const isToVirtual = toId.startsWith('virtual')

//     if (isFromVirtual && isToVirtual) {
//       key = `${fromId}_${toId}`
//       newNodes = {
//         leftPort: '',
//         rightPort: '',
//         status: 'notExist'
//       }
//     } else if (isFromVirtual) {
//       key = `${toId}_${fromId}`
//       newNodes = {
//         leftPort: `port${toPort}`,
//         rightPort: '',
//         status: 'notExist'
//       }
//     } else if (isToVirtual) {
//       key = `${fromId}_${toId}`
//       newNodes = {
//         leftPort: `port${fromPort}`,
//         rightPort: '',
//         status: 'notExist'
//       }
//     } else if (toId > fromId) {
//       key = `${fromId}_${toId}_port${fromPort}_port${toPort}`
//       newNodes = {
//         leftPort: `port${fromPort}`,
//         rightPort: `port${toPort}`,
//         status: 'notExist'
//       }
//     } else {
//       key = `${toId}_${fromId}_port${toPort}_port${fromPort}`
//       newNodes = {
//         leftPort: `port${toPort}`,
//         rightPort: `port${fromPort}`,
//         status: 'notExist'
//       }
//     }
//     return {
//       ...state,
//       edgesData: {
//         ...state.edgesData,
//         [key]: {
//           ...newNodes
//         }
//       }
//     }
//   },
//   addNewNode: (state, { payload }) => {
//     const { MACAddress, x, y, groupIds } = payload
//     const { changeGroupMemberData } = state
//     if (state.currentGroup === 'all') {
//       const index = changeGroupMemberData.removeDevice.indexOf(MACAddress)
//       if (index !== -1) {
//         changeGroupMemberData.removeDevice.splice(index, 1)
//       } else {
//         changeGroupMemberData.addDevice[MACAddress] = groupIds
//       }
//     }
//     return {
//       ...state,
//       nodesData: {
//         ...state.nodesData,
//         [MACAddress]: {
//           IPAddress: '',
//           MACAddress,
//           model: '',
//           hostname: '',
//           status: 'offline',
//           x,
//           y
//         }
//       },
//       newNodeTemp: MACAddress,
//       nodesIds: [...state.nodesIds, MACAddress],
//       changeGroupMemberData
//     }
//   }
// },
//   changeTopologyEvent: (state, { action }) => {
//     const { payload } = action
//     return { ...state, event: payload }
//   },

//   setDeviceListSelect: (state, { payload }) => {
//     const { MACAddress } = payload
//     return { ...state, devicelistSelect: MACAddress }
//   },
//   setNetworkSelectElement: (state, { payload }) => {
//     const { nodes, edges } = payload
//     return { ...state, selectEdges: edges, selectNodes: nodes }
//   },
//   setImageExporting: (state, { payload }) => {
//     return { ...state, currentGroup: payload }
//   },

//   clearNewNodeTemp: (state) => {
//     return { ...state, newNodeTemp: '' }
//   },
//   clearTopologyData: (state) => {
//     return {
//       ...state,
//       event: '',
//       editMode: false,
//       selectNodes: [],
//       selectEdges: [],
//       changeGroupMemberData: {
//         addDevice: {},
//         removeDevice: []
//       }
//     }
//   }
// })

// export const {
//   addNewNode,
//   addNewEdge,
//   addNewVirtualNode,
//   changeTopologyEvent,
//   setDeviceListSelect,
//   setNetworkSelectElement,
//   clearNewNodeTemp,
//   clearTopologyData,
//   setImageExporting
// } = topologySlice.actions

// export const topologySelector = (state) => {
//   const {
//     graphOption,
//     virtualNodeData,
//     nodesData,
//     edgesData,
//     nodesIds,
//     currentGroup,
//     editMode,
//     event,
//     showIP,
//     showModel,
//     showHostname,
//     showLinkText,
//     physics,
//     selectNodes,
//     selectEdges,
//     newNodeTemp,
//     changeGroupMemberData,
//     devicelistSelect,
//     isImageExporting,
//     SNMPDeviceProperties
//   } = state.topology
//   return {
//     graphOption,
//     virtualNodeData,
//     nodesData,
//     edgesData,
//     nodesIds,
//     currentGroup,
//     editMode,
//     event,
//     showIP,
//     showModel,
//     showHostname,
//     showLinkText,
//     physics,
//     selectNodes,
//     selectEdges,
//     newNodeTemp,
//     changeGroupMemberData,
//     devicelistSelect,
//     isImageExporting,
//     SNMPDeviceProperties
//   }
// }

// export default topologySlice

import { createSlice } from '@reduxjs/toolkit'
//import { REQUEST_MP_SWITCH_POLLING_TOPOLOGY } from '../../../main/utils/IPCEvents'
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
  addNewEdge,
  addNewNode,
  addNewVirtualNode,
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
