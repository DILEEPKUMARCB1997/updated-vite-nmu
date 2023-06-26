/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// import React, { useState } from 'react'
// import { Checkbox, Modal, InputNumber, Input, Select } from 'antd'
// import { addNewEdge, addNewNode, addNewVirtualNode } from '../../features/topologySlice'

// const { Option } = Select
// const MACAddressFormat = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

// const TopologyAddModal = (props) => {
//   const { event, nodesIds, groupList, groupSelectWidth, currentGroup } = props
//   const [addEdgeNodes, setAddEdgeNodes] = useState('')
// const [addNodeMax, setAddNodeMax] = useState('')
// const [isVirtualNode, setIsVirtualNode] = useState(false)
//   const [fromPort, setFromPort] = useState('')
// const [toPort, setToPort] = useState('')
// const [addNodeMAC, setAddNodeMAC] = useState('')
//   const [open, setOpen] = useState(false)
// const [selectGroup, setSelectGroup] = useState([])
//   const [addNodePosition, setAddNodePosition] = useState({})
// const isAddNodePass =
//   (selectGroup.length !== 0 &&
//     currentGroup === 'all' &&
//     MACAddressFormat.test(addNodeMAC) &&
//     !nodesIds.includes(addNodeMAC.toUpperCase())) ||
//   (currentGroup !== 'all' &&
//     MACAddressFormat.test(addNodeMAC) &&
//     !nodesIds.includes(addNodeMAC.toUpperCase())) ||
//   isVirtualNode
//   const isAddEdgePasss = fromPort !== '' && toPort !== ''
//   const disableOKButton = event === 'addNode' ? !isAddNodePass : !isAddEdgePasss
//   const isFromVirtual = addEdgeNodes.from.startsWith('virtual')
//   const isToVirtual = addEdgeNodes.to.startsWith('virtual')

//   openModal = (data) => {
//     //console.log(props);
//     if (event === 'addNode') {
//       setOpen(true)
//       setAddNodePosition(data)
//     } else {
//       setOpen(true)
//       setAddEdgeNodes(data)
//       setAddNodeMax({
//         from: data.from.startsWith('virtual') ? 1 : findPortMaxLength(data.from),
//         to: data.to.startsWith('virtual') ? 1 : findPortMaxLength(data.to)
//       })
//     }
//   }

// const handleGroupSelectOnChange = (value) => {
//   setSelectGroup({ selectGroup: value })
// }
// const handleVirtualNodeCheckOnChange = (value) => {
//   setIsVirtualNode({ isVirtualNode: value.target.checked })
// }
// const handleToPortInputChange = (value) => {
//   if (value !== undefined) {
//     setToPort({ toPort: value })
//   }
// }
//   const handleFromPortInputChange = (value) => {
//     if (value !== undefined) {
//       setFromPort({ fromPort: value })
//     }
//   }
// const handleModalCancelButtonClick = () => {
//   handleModalCancel()
// }
//   const findPortMaxLength = (modeln) => {
//     let Model = nodesData[modeln].model.toString('utf8')
//     let MaxValue = 1
//     if (Model.indexOf('-') > -1) {
//       MaxValue = parseInt(Model.substring(Model.indexOf('-') - 2, Model.indexOf('-')))
//     } else {
//       MaxValue = parseInt(Model.substring(Model.length - 2, Model.length))
//     }
//     return MaxValue.toString() === 'NaN' ? 28 : MaxValue
//   }

// const handleAddNodeMACInputChange = (event) => {
//   setAddNodeMAC(event.target.value)
// }
// const handleModalOKButtonClick = () => {
//   if (event === 'addNode') {
//     if (isVirtualNode) {
//       addNewVirtualNode({
//         x: addNodePosition.x,
//         y: addNodePosition.y
//       })
//     } else {
//       addNewNode({
//         MACAddress: addNodeMAC,
//         x: addNodePosition.x,
//         y: addNodePosition.y,
//         groupIds: selectGroup
//       })
//     }
//   } else {
//     addNewEdge({
//       fromId: addEdgeNodes.from,
//       toId: addEdgeNodes.to,
//       fromPort: fromPort,
//       toPort: toPort
//     })
//   }
//   handleModalCancel()
// }
//   const handleModalCancel = () => {
//     setOpen(false)
//     setAddNodePosition()
//     setAddNodeMAC(addNodeMAC)
//     addEdgeNodes({ from: '', to: '' })
//     setIsVirtualNode(false)
//     setSelectGroup(selectGroup)
//     setAddNodeMax({
//       from: 1,
//       to: 1
//     })
//     handleDisableEdit()
//   }
//   return (
//     <Modal
//       destroyOnClose
//       title={event === 'addNode' ? 'Add Node' : 'Add Edge'}
//       open={open}
//       onOk={handleModalOKButtonClick}
//       onCancel={handleModalCancelButtonClick}
//       okButtonProps={{ disabled: disableOKButton }}
//     >
//       {event === 'addNode' ? (
//         <div>
//           <Checkbox checked={isVirtualNode} onChange={handleVirtualNodeCheckOnChange}>
//             Virtual Node
//           </Checkbox>
//           <Input
//             disabled={isVirtualNode}
//             value={addNodeMAC.toUpperCase()}
//             placeholder="MAC Address"
//             onChange={handleAddNodeMACInputChange}
//           />
//     {currentGroup === 'all' && (
//       <Select
//         mode="multiple"
//         disabled={isVirtualNode}
//         value={selectGroup}
//         style={{ marginTop: '5px', minWidth: `${groupSelectWidth}px` }}
//         onChange={handleGroupSelectOnChange}
//       >
//         {groupList.map((group) => (
//           <Option key={group.id} value={group.id}>
//             {group.name}
//           </Option>
//         ))}
//       </Select>
//     )}
//   </div>
// ) : (
//         <div>
//           <div>
//             {'From '}
//             <span>{isFromVirtual ? 'Virtual Node' : addEdgeNodes.from}</span>
//             {!isFromVirtual && (
//               <div>
//                 {' Port '}
//                 {
//                   <InputNumber
//                     placeholder="Port"
//                     min={1}
//                     max={addNodeMax.from}
//                     value={fromPort}
//                     onChange={handleFromPortInputChange}
//                   />
//                 }
//               </div>
//             )}
//           </div>
//           <div>
//             {'To '}
//             <span>{isToVirtual ? 'Virtual Node' : addEdgeNodes.to}</span>
//             {!isToVirtual && (
//               <div>
//                 {' Port '}
//                 {
//                   <InputNumber
//                     placeholder="Port"
//                     min={1}
//                     max={addNodeMax.to}
//                     value={toPort}
//                     onChange={handleToPortInputChange}
//                   />
//                 }
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </Modal>
//   )
// }

// export default TopologyAddModal

import { Modal, Checkbox, Input, Select, InputNumber } from 'antd'
import React, { useState } from 'react'
const MACAddressFormat = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
const TopologyAddModal = (props) => {
  const { currentGroup, groupSelectWidth } = props
  const [isVirtualNode, setIsVirtualNode] = useState(false)
  const [addNodeMax, setAddNodeMax] = useState('')
  const [addNodeMAC, setAddNodeMAC] = useState('')
  const [toPort, setToPort] = useState('')
  const [selectGroup, setSelectGroup] = useState([])

  const isAddNodePass =
    (selectGroup.length !== 0 &&
      currentGroup === 'all' &&
      MACAddressFormat.test(addNodeMAC) &&
      !nodesIds.includes(addNodeMAC.toUpperCase())) ||
    (currentGroup !== 'all' &&
      MACAddressFormat.test(addNodeMAC) &&
      !nodesIds.includes(addNodeMAC.toUpperCase())) ||
    isVirtualNode

  const handleAddNodeMACInputChange = (event) => {
    setAddNodeMAC(event.target.value)
  }
  const handleToPortInputChange = (value) => {
    if (value !== undefined) {
      setToPort({ toPort: value })
    }
  }
  const handleGroupSelectOnChange = (value) => {
    setSelectGroup({ selectGroup: value })
  }
  const handleModalCancelButtonClick = () => {
    handleModalCancel()
  }
  const handleVirtualNodeCheckOnChange = (value) => {
    setIsVirtualNode({ isVirtualNode: value.target.checked })
  }
  const handleModalOKButtonClick = () => {
    if (event === 'addNode') {
      if (isVirtualNode) {
        addNewVirtualNode({
          x: addNodePosition.x,
          y: addNodePosition.y
        })
      } else {
        addNewNode({
          MACAddress: addNodeMAC,
          x: addNodePosition.x,
          y: addNodePosition.y,
          groupIds: selectGroup
        })
      }
    } else {
      addNewEdge({
        fromId: addEdgeNodes.from,
        toId: addEdgeNodes.to,
        fromPort: fromPort,
        toPort: toPort
      })
    }
    handleModalCancel()
  }

  return (
    <div>
      <Modal
        open
        title={event === 'addNode' ? 'Add Node' : 'Add Edge'}
        onOk={handleModalOKButtonClick}
        onCancel={handleModalCancelButtonClick}
      >
        <Checkbox onChange={handleVirtualNodeCheckOnChange}>Virtual Node</Checkbox>
        <Input
          disabled={isVirtualNode}
          value={addNodeMAC.toUpperCase()}
          placeholder="MAC Address"
          onChange={handleAddNodeMACInputChange}
        />
        <div>
          <Select
            mode="multiple"
            disabled={isVirtualNode}
            value={selectGroup}
            style={{ marginTop: '5px', minWidth: `${groupSelectWidth}px` }}
            onChange={handleGroupSelectOnChange}
          ></Select>
          <InputNumber
            placeholder="port"
            min={1}
            max={addNodeMax.to}
            value={toPort}
            onChange={handleToPortInputChange}
          />
        </div>
      </Modal>
    </div>
  )
}

export default TopologyAddModal
