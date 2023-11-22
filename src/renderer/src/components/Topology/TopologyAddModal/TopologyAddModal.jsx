/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Modal, InputNumber, Select, Input, Checkbox } from 'antd'
import {
  addNewEdge,
  addNewNode,
  addNewVirtualNode,
  topologySelector
} from '../../../features/topologySlice'
import { discoverySelector } from '../../../features/discoverySlice'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select
const MACAddressFormat = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

const TopologyAddModal = ({ handleDisableEdit }) => {
  const dispatch = useDispatch()
  const { currentGroup, nodesIds, event } = useSelector(topologySelector)
  const { groupDeviceData } = useSelector(discoverySelector)
  const [state, setState] = useState({
    open: false,
    addNodePosition: {},
    addNodeMAC: '',
    addEdgeNodes: {
      from: '',
      to: ''
    },
    addNodeMax: {
      from: 1,
      to: 1
    },
    fromPort: 1,
    toPort: 1,
    isVirtualNode: false,
    selectGroup: []
  })
  // const [open, setOpen] = useState(false)
  // const [addNodePosition, setAddNodePosition] = useState({})
  // const [addNodeMAC, setAddNodeMAC] = useState('')
  // const [addEdgeNodes, setAddEdgeNodes] = useState({
  //   from: '',
  //   to: ''
  // })
  // const [addNodeMax, setAddNodeMax] = useState({ from: 1, to: 1 })
  // const [fromPort, setFromPort] = useState(1)
  // const [toPort, setToPort] = useState(1)
  // const [isVirtualNode, setIsVirtualNode] = useState(false)
  // // const [selectGroup, setSelectGroup] = useState([])

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
    let Model = state.nodesData[modeln].model.toString('utf8')
    let MaxValue = 1
    if (Model.indexOf('-') > -1) {
      MaxValue = parseInt(Model.substring(Model.indexOf('-') - 2, Model.indexOf('-')))
    } else {
      MaxValue = parseInt(Model.substring(Model.length - 2, Model.length))
    }
    return MaxValue.toString() === 'NaN' ? 28 : MaxValue
  }

  const handleAddNodeMACInputChange = (event) => {
    setState({ addNodeMAC: event.target.value })
  }

  const handleModalOKButtonClick = () => {
    if (event === 'addNode') {
      if (state.isVirtualNode) {
        dispatch(
          addNewVirtualNode({
            x: state.addNodePosition.x,
            y: state.addNodePosition.y
          })
        )
      } else {
        dispatch(
          addNewNode({
            MACAddress: state.addNodeMAC,
            x: state.addNodePosition.x,
            y: state.addNodePosition.y,
            groupIds: state.selectGroup
          })
        )
      }
    } else {
      dispatch(
        addNewEdge({
          fromId: state.addEdgeNodes.from,
          toId: state.addEdgeNodes.to,
          fromPort: state.fromPort,
          toPort: state.toPort
        })
      )
    }
    handleModalCancel()
  }

  const handleModalCancel = () => {
    setState({
      open: false,
      addNodePosition: {},
      addNodeMAC: '',
      addEdgeNodes: {
        from: '',
        to: ''
      },
      addNodeMax: {
        from: 1,
        to: 1
      },
      fromPort: 1,
      toPort: 1,
      isVirtualNode: false,
      selectGroup: []
    })
    handleDisableEdit()
  }

  const handleModalCancelButtonClick = () => {
    handleModalCancel()
  }

  const handleFromPortInputChange = (value) => {
    if (value !== undefined) {
      setState({ fromPort: value })
    }
  }

  const handleToPortInputChange = (value) => {
    if (value !== undefined) {
      setState({ toPort: value })
    }
  }

  const handleVirtualNodeCheckOnChange = (value) => {
    setState({ isVirtualNode: value.target.checked })
  }

  const handleGroupSelectOnChange = (value) => {
    setState({ selectGroup: value })
  }

  const groupList = []
  Object.entries(groupDeviceData).forEach(([key, value]) => {
    if (key !== 'unGrouped') {
      groupList.push({ name: value.groupName, id: key })
    }
  })
  let groupSelectWidth = 105
  groupList.forEach((element) => {
    const minWidth = element.name.length * 12
    if (minWidth > groupSelectWidth) {
      groupSelectWidth = minWidth
    }
  })

  const isAddNodePass =
    (state.selectGroup.length !== 0 &&
      currentGroup === 'all' &&
      MACAddressFormat.test(state.addNodeMAC) &&
      !nodesIds.includes(state.addNodeMAC.toUpperCase())) ||
    (currentGroup !== 'all' &&
      MACAddressFormat.test(state.addNodeMAC) &&
      !nodesIds.includes(state.addNodeMAC.toUpperCase())) ||
    state.isVirtualNode
  const isAddEdgePass = state.fromPort !== '' && state.toPort !== ''
  const disableOKButton = event === 'addNode' ? !isAddNodePass : !isAddEdgePass
  const isFromVirtual = state.addEdgeNodes.from.startsWith('virtual')
  const isToVirtual = state.addEdgeNodes.to.startsWith('virtual')

  // const handleAddNodeMACInputChange = (event) => {
  //   setAddNodeMAC(event.target.value)
  // }

  // const handleModalOKButtonClick = () => {
  //   if (event === 'addNode') {
  //     if (isVirtualNode) {
  //       dispatch(
  //         addNewVirtualNode({
  //           x: addNodePosition.x,
  //           y: addNodePosition.y
  //         })
  //       )
  //     } else {
  //       dispatch(
  //         addNewNode({
  //           MACAddress: addNodeMAC,
  //           x: addNodePosition.x,
  //           y: addNodePosition.y,
  //           groupIds: selectGroup
  //         })
  //       )
  //     }
  //   } else {
  //     dispatch(
  //       addNewEdge({
  //         fromId: addEdgeNodes.from,
  //         toId: addEdgeNodes.to,
  //         fromPort: fromPort,
  //         toPort: toPort
  //       })
  //     )
  //   }
  //   handleModalCancel()
  // }

  // const handleModalCancel = () => {
  //   setOpen(open)
  //   setAddNodePosition(addNodePosition)
  //   setAddNodeMAC(addNodeMAC)
  //   setAddEdgeNodes(addEdgeNodes)
  //   setAddNodeMax(addNodeMax)
  //   setFromPort(fromPort)
  //   setToPort(toPort)
  //   setIsVirtualNode(isVirtualNode)
  //   setSelectGroup(selectGroup)

  //   handleDisableEdit()
  // }

  // const handleModalCancelButtonClick = () => {
  //   handleModalCancel()
  // }

  // const handleFromPortInputChange = (value) => {
  //   if (value !== undefined) {
  //     setFromPort(value)
  //   }
  // }

  // const handleToPortInputChange = (value) => {
  //   if (value !== undefined) {
  //     setToPort(value)
  //   }
  // }

  // const handleVirtualNodeCheckOnChange = (value) => {
  //   setIsVirtualNode(value.target.checked)
  // }

  // const handleGroupSelectOnChange = (value) => {
  //   setSelectGroup(value)
  // }
  // const groupList = []
  // Object.entries(groupDeviceData).forEach(([key, value]) => {
  //   if (key !== 'unGrouped') {
  //     groupList.push({ name: value.groupName, id: key })
  //   }
  // })
  // let groupSelectWidth = 105
  // groupList.forEach((element) => {
  //   const minWidth = element.name.length * 12
  //   if (minWidth > groupSelectWidth) {
  //     groupSelectWidth = minWidth
  //   }
  // })

  // const isAddNodePass =
  //   (selectGroup.length !== 0 &&
  //     currentGroup === 'all' &&
  //     MACAddressFormat.test(addNodeMAC) &&
  //     !nodesIds.includes(addNodeMAC.toUpperCase())) ||
  //   (currentGroup !== 'all' &&
  //     MACAddressFormat.test(addNodeMAC) &&
  //     !nodesIds.includes(addNodeMAC.toUpperCase())) ||
  //   isVirtualNode
  // const isAddEdgePass = fromPort !== '' && toPort !== ''
  // const disableOKButton = event === 'addNode' ? !isAddNodePass : !isAddEdgePass
  // const isFromVirtual = addEdgeNodes.from.startsWith('virtual')
  // const isToVirtual = addEdgeNodes.to.startsWith('virtual')

  return (
    <Modal
      // destroyOnClose
      title={event === 'addNode' ? 'Add Node' : 'Add Edge'}
      open
      onOk={handleModalOKButtonClick}
      onCancel={handleModalCancelButtonClick}
      okButtonProps={{ disabled: disableOKButton }}
    >
      {event === 'addNode' ? (
        <div>
          <Checkbox
            style={{ marginBottom: '5px' }}
            checked={state.isVirtualNode}
            onChange={handleVirtualNodeCheckOnChange}
          >
            Virtual Node
          </Checkbox>
          <Input
            disabled={state.isVirtualNode}
            value={state.addNodeMAC.toUpperCase()}
            placeholder="MAC Address"
            onChange={handleAddNodeMACInputChange}
          />
          {currentGroup === 'all' && (
            <Select
              mode="multiple"
              disabled={state.isVirtualNode}
              value={state.selectGroup}
              style={{ marginTop: '5px', minWidth: `${groupSelectWidth}px` }}
              onChange={handleGroupSelectOnChange}
            >
              {groupList.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.name}
                </Option>
              ))}
            </Select>
          )}
        </div>
      ) : (
        <div>
          <div>
            {'From '}
            <span style={{ color: 'blue', fontSize: '1.06rem' }}>
              {isFromVirtual ? 'Virtual Node' : state.addEdgeNodes.from}
            </span>
            {!isFromVirtual && (
              <div style={{ display: 'inline' }}>
                {' Port '}
                {
                  <InputNumber
                    placeholder="Port"
                    min={1}
                    max={state.addNodeMax.from}
                    value={state.fromPort}
                    onChange={handleFromPortInputChange}
                  />
                }
              </div>
            )}
          </div>
          <div style={{ marginTop: '5px' }}>
            {'To '}
            <span style={{ color: 'blue', fontSize: '1.06rem' }}>
              {isToVirtual ? 'Virtual Node' : state.addEdgeNodes.to}
            </span>
            {!isToVirtual && (
              <div style={{ display: 'inline' }}>
                {' Port '}
                {
                  <InputNumber
                    placeholder="Port"
                    min={1}
                    max={state.addNodeMax.to}
                    value={state.toPort}
                    onChange={handleToPortInputChange}
                  />
                }
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default TopologyAddModal

/*
import React, { useState, useEffect } from 'react'
import { Modal, InputNumber, Select, Input, Checkbox } from 'antd'
import {
  addNewEdge,
  addNewNode,
  addNewVirtualNode,
  topologySelector
} from '../../../features/topologySlice'
import { discoverySelector } from '../../../features/discoverySlice'
import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select
const MACAddressFormat = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

const TopologyAddModal = ({ handleDisableEdit, onRef }) => {
  const { currentGroup, nodesIds, event } = useSelector(topologySelector)
  const { groupDeviceData } = useSelector(discoverySelector)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    open: false,
    addNodePosition: {},
    addNodeMAC: '',
    addEdgeNodes: {
      from: '',
      to: ''
    },
    addNodeMax: {
      from: 1,
      to: 1
    },
    fromPort: 1,
    toPort: 1,
    isVirtualNode: false,
    selectGroup: []
  })

  useEffect(() => {
    onRef(undefined)
  }, [])

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
    let Model = state.nodesData[modeln].model.toString('utf8')
    let MaxValue = 1
    if (Model.indexOf('-') > -1) {
      MaxValue = parseInt(Model.substring(Model.indexOf('-') - 2, Model.indexOf('-')))
    } else {
      MaxValue = parseInt(Model.substring(Model.length - 2, Model.length))
    }
    return MaxValue.toString() === 'NaN' ? 28 : MaxValue
  }

  const handleAddNodeMACInputChange = (event) => {
    setState({ addNodeMAC: event.target.value })
  }

  const handleModalOKButtonClick = () => {
    if (event === 'addNode') {
      if (state.isVirtualNode) {
        dispatch(
          addNewVirtualNode({
            x: state.addNodePosition.x,
            y: state.addNodePosition.y
          })
        )
      } else {
        dispatch(
          addNewNode({
            MACAddress: state.addNodeMAC,
            x: state.addNodePosition.x,
            y: state.addNodePosition.y,
            groupIds: state.selectGroup
          })
        )
      }
    } else {
      dispatch(
        addNewEdge({
          fromId: state.addEdgeNodes.from,
          toId: state.addEdgeNodes.to,
          fromPort: state.fromPort,
          toPort: state.toPort
        })
      )
    }
    handleModalCancel()
  }

  const handleModalCancel = () => {
    setState({
      open: false,
      addNodePosition: {},
      addNodeMAC: '',
      addEdgeNodes: {
        from: '',
        to: ''
      },
      addNodeMax: {
        from: 1,
        to: 1
      },
      fromPort: 1,
      toPort: 1,
      isVirtualNode: false,
      selectGroup: []
    })
    handleDisableEdit()
  }

  const handleModalCancelButtonClick = () => {
    handleModalCancel()
  }

  const handleFromPortInputChange = (value) => {
    if (value !== undefined) {
      setState({ fromPort: value })
    }
  }

  const handleToPortInputChange = (value) => {
    if (value !== undefined) {
      setState({ toPort: value })
    }
  }

  const handleVirtualNodeCheckOnChange = (value) => {
    setState({ isVirtualNode: value.target.checked })
  }

  const handleGroupSelectOnChange = (value) => {
    setState({ selectGroup: value })
  }

  const groupList = []
  Object.entries(groupDeviceData).forEach(([key, value]) => {
    if (key !== 'unGrouped') {
      groupList.push({ name: value.groupName, id: key })
    }
  })
  let groupSelectWidth = 105
  groupList.forEach((element) => {
    const minWidth = element.name.length * 12
    if (minWidth > groupSelectWidth) {
      groupSelectWidth = minWidth
    }
  })

  const isAddNodePass =
    (state.selectGroup.length !== 0 &&
      currentGroup === 'all' &&
      MACAddressFormat.test(state.addNodeMAC) &&
      !nodesIds.includes(state.addNodeMAC.toUpperCase())) ||
    (currentGroup !== 'all' &&
      MACAddressFormat.test(state.addNodeMAC) &&
      !nodesIds.includes(state.addNodeMAC.toUpperCase())) ||
    state.isVirtualNode
  const isAddEdgePass = state.fromPort !== '' && state.toPort !== ''
  const disableOKButton = event === 'addNode' ? !isAddNodePass : !isAddEdgePass
  const isFromVirtual = state.addEdgeNodes.from.startsWith('virtual')
  const isToVirtual = state.addEdgeNodes.to.startsWith('virtual')
  return (
    <Modal
      destroyOnClose
      title={event === 'addNode' ? 'Add Node' : 'Add Edge'}
      //open={open}
      onOk={handleModalOKButtonClick}
      onCancel={handleModalCancelButtonClick}
      okButtonProps={{ disabled: disableOKButton }}
    >
      {event === 'addNode' ? (
        <div>
          <Checkbox
            // className={styles.checkbox}
            checked={state.isVirtualNode}
            onChange={handleVirtualNodeCheckOnChange}
          >
            Virtual Node
          </Checkbox>
          <Input
            disabled={state.isVirtualNode}
            value={state.addNodeMAC.toUpperCase()}
            placeholder="MAC Address"
            onChange={handleAddNodeMACInputChange}
          />
          {currentGroup === 'all' && (
            <Select
              mode="multiple"
              disabled={state.isVirtualNode}
              value={state.selectGroup}
              style={{ marginTop: '5px', minWidth: `${groupSelectWidth}px` }}
              onChange={handleGroupSelectOnChange}
            >
              {groupList.map((group) => (
                <Option key={group.id} value={group.id}>
                  {group.name}
                </Option>
              ))}
            </Select>
          )}
        </div>
      ) : (
        <div>
          <div>
            {'From '}
            <span
            //className={styles.nodename}
            >
              {isFromVirtual ? 'Virtual Node' : state.addEdgeNodes.from}
            </span>
            {!isFromVirtual && (
              <div
              //className={styles.portname}
              >
                {' Port '}
                {
                  <InputNumber
                    placeholder="Port"
                    min={1}
                    max={state.addNodeMax.from}
                    value={state.fromPort}
                    onChange={handleFromPortInputChange}
                  />
                }
              </div>
            )}
          </div>
          <div
          // className={styles.container}
          >
            {'To '}
            <span
            // className={styles.nodename}
            >
              {isToVirtual ? 'Virtual Node' : state.addEdgeNodes.to}
            </span>
            {!isToVirtual && (
              <div
              //className={styles.portname}
              >
                {' Port '}
                {
                  <InputNumber
                    placeholder="Port"
                    min={1}
                    max={state.addNodeMax.to}
                    value={state.toPort}
                    onChange={handleToPortInputChange}
                  />
                }
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default TopologyAddModal
*/
