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
  const [open, setOpen] = useState(false)
  const [addNodePosition, setAddNodePosition] = useState({})
  const [addNodeMAC, setAddNodeMAC] = useState('')
  const [addEdgeNodes, setAddEdgeNodes] = useState({
    from: '',
    to: ''
  })
  const [addNodeMax, setAddNodeMax] = useState({ from: 1, to: 1 })
  const [fromPort, setFromPort] = useState(1)
  const [toPort, setToPort] = useState(1)
  const [isVirtualNode, setIsVirtualNode] = useState(false)
  const [selectGroup, setSelectGroup] = useState([])

  const handleAddNodeMACInputChange = (event) => {
    setAddNodeMAC(event.target.value)
  }

  const handleModalOKButtonClick = () => {
    if (event === 'addNode') {
      if (isVirtualNode) {
        dispatch(
          addNewVirtualNode({
            x: addNodePosition.x,
            y: addNodePosition.y
          })
        )
      } else {
        dispatch(
          addNewNode({
            MACAddress: addNodeMAC,
            x: addNodePosition.x,
            y: addNodePosition.y,
            groupIds: selectGroup
          })
        )
      }
    } else {
      dispatch(
        addNewEdge({
          fromId: addEdgeNodes.from,
          toId: addEdgeNodes.to,
          fromPort: fromPort,
          toPort: toPort
        })
      )
    }
    handleModalCancel()
  }

  const handleModalCancel = () => {
    setOpen(open)
    setAddNodePosition(addNodePosition)
    setAddNodeMAC(addNodeMAC)
    setAddEdgeNodes(addEdgeNodes)
    setAddNodeMax(addNodeMax)
    setFromPort(fromPort)
    setToPort(toPort)
    setIsVirtualNode(isVirtualNode)
    setSelectGroup(selectGroup)

    handleDisableEdit()
  }

  const handleModalCancelButtonClick = () => {
    handleModalCancel()
  }

  const handleFromPortInputChange = (value) => {
    if (value !== undefined) {
      setFromPort(value)
    }
  }

  const handleToPortInputChange = (value) => {
    if (value !== undefined) {
      setToPort(value)
    }
  }

  const handleVirtualNodeCheckOnChange = (value) => {
    setIsVirtualNode(value.target.checked)
  }

  const handleGroupSelectOnChange = (value) => {
    setSelectGroup(value)
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
    (selectGroup.length !== 0 &&
      currentGroup === 'all' &&
      MACAddressFormat.test(addNodeMAC) &&
      !nodesIds.includes(addNodeMAC.toUpperCase())) ||
    (currentGroup !== 'all' &&
      MACAddressFormat.test(addNodeMAC) &&
      !nodesIds.includes(addNodeMAC.toUpperCase())) ||
    isVirtualNode
  const isAddEdgePass = fromPort !== '' && toPort !== ''
  const disableOKButton = event === 'addNode' ? !isAddNodePass : !isAddEdgePass
  const isFromVirtual = addEdgeNodes.from.startsWith('virtual')
  const isToVirtual = addEdgeNodes.to.startsWith('virtual')
  return (
    <Modal
      // destroyOnClose
      title={event === 'addNode' ? 'Add Node' : 'Add Edge'}
      //open
      onOk={handleModalOKButtonClick}
      onCancel={handleModalCancelButtonClick}
      okButtonProps={{ disabled: disableOKButton }}
    >
      {event === 'addNode' ? (
        <div>
          <Checkbox
            style={{ marginBottom: '5px' }}
            checked={isVirtualNode}
            onChange={handleVirtualNodeCheckOnChange}
          >
            Virtual Node
          </Checkbox>
          <Input
            disabled={isVirtualNode}
            value={addNodeMAC.toUpperCase()}
            placeholder="MAC Address"
            onChange={handleAddNodeMACInputChange}
          />
          {currentGroup === 'all' && (
            <Select
              mode="multiple"
              disabled={isVirtualNode}
              value={selectGroup}
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
              {isFromVirtual ? 'Virtual Node' : addEdgeNodes.from}
            </span>
            {!isFromVirtual && (
              <div style={{ display: 'inline' }}>
                {' Port '}
                {
                  <InputNumber
                    placeholder="Port"
                    min={1}
                    max={addNodeMax.from}
                    value={fromPort}
                    onChange={handleFromPortInputChange}
                  />
                }
              </div>
            )}
          </div>
          <div style={{ marginTop: '5px' }}>
            {'To '}
            <span style={{ color: 'blue', fontSize: '1.06rem' }}>
              {isToVirtual ? 'Virtual Node' : addEdgeNodes.to}
            </span>
            {!isToVirtual && (
              <div style={{ display: 'inline' }}>
                {' Port '}
                {
                  <InputNumber
                    placeholder="Port"
                    min={1}
                    max={addNodeMax.to}
                    value={toPort}
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
