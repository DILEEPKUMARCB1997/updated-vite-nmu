/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Modal, InputNumber, Select, Input, Checkbox, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewEdge,
  addNewNode,
  addNewVirtualNode,
  topologySelector
} from '../../../features/topologySlice'

const { Option } = Select
const MACAddressFormat = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

const TopologyAddModal = ({ handleDisableEdit, nodesData }) => {
  const { currentGroup, event, nodesIds } = useSelector(topologySelector)
  console.log(currentGroup)
  const dispatch = useDispatch()
  //const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVirtualNode, setIsVirtualNode] = useState(false)
  const [open, setOpen] = useState(false)
  const [addNodeMax, setAddNodeMax] = useState([])
  const [addNodeMAC, setAddNodeMAC] = useState('')
  const [toPort, setToPort] = useState(1)
  const [selectGroup, setSelectGroup] = useState([])
  const [addEdgeNodes, setAddEdgeNodes] = useState({ from: '', to: '' })
  const [fromPort, setFromPort] = useState(1)
  const [addNodePosition, setAddNodePosition] = useState('')

  useEffect(() => {
    // onRef(modalRef)
  }, [])

  const openModal = (data) => {
    //console.log(props);
    if (event === 'addNode') {
      setOpen(true)
      setAddNodePosition(data)
    } else {
      setOpen(true)
      setAddEdgeNodes(data)
      setAddNodeMax({
        from: data.from.startsWith('virtual') ? 1 : findPortMaxLength(data.from),
        to: data.to.startsWith('virtual') ? 1 : findPortMaxLength(data.to)
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
    setAddNodePosition({})
    setAddNodeMAC('')
    setAddEdgeNodes({
      from: '',
      to: ''
    })
    setAddNodeMax({
      from: 1,
      to: 1
    })

    setFromPort(1)
    setToPort(1)

    setIsVirtualNode(false)
    setSelectGroup([])
    dispatch(handleDisableEdit())
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

  let groupDeviceData = {}
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

  return (
    <Modal
      destroyOnClose
      title={event === 'addNode' ? 'Add Node' : 'Add Edge'}
      onOk={handleModalOKButtonClick}
      onCancel={handleModalCancelButtonClick}
      okButtonProps={{ disabled: disableOKButton }}
    >
      {event === 'addNode' ? (
        <Card style={{ marginTop: '15px' }}>
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
        </Card>
      ) : (
        <Card style={{ marginTop: '15px' }}>
          <div>
            {'From '}
            <span style={{ color: 'blue', fontSize: '1.06rem', marginTop: '5px' }}>
              {isFromVirtual ? 'Virtual Node' : addEdgeNodes.from}
            </span>
            {!isFromVirtual && (
              <div style={{ display: 'inline' }}>
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
              <div style={{ display: 'inline ' }}>
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
        </Card>
      )}
    </Modal>
  )
}

export default TopologyAddModal