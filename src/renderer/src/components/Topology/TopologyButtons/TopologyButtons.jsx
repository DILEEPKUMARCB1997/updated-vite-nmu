/* eslint-disable no-unused-vars */
import React from 'react'
import { Popover, Select, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  topologySelector,
  changeTopologyEvent,
  switchEditMode,
  setTopologyCurrentGroup
} from '../../../features/topologySlice'
import { discoverySelector } from '../../../features/discoverySlice'

const { Option } = Select

const TopologyButtons = ({ show }) => {
  const { editMode, currentGroup } = useSelector(topologySelector)
  const { groupDeviceData } = useSelector(discoverySelector)
  const dispatch = useDispatch()

  const handleGroupSelectChange = (value) => {
    dispatch(setTopologyCurrentGroup(value))
    dispatch(switchEditMode(false))
    dispatch(changeTopologyEvent(''))
  }

  let groupList = [{ name: 'All Device', id: 'all' }]
  Object.entries(groupDeviceData).forEach(([key, value]) => {
    if (key !== 'unGrouped') {
      groupList = [...groupList, { name: value.groupName, id: key }]
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
    <div>
      <Popover in={show} placement="topLeft" trigger="click">
        <div style={{ display: '-webkit-inline-flex' }}>
          <Typography style={{ verticalAlign: 'middle', display: '-webkit-inline-flex' }}>
            Group:
          </Typography>
          <Select
            disabled={editMode}
            style={{
              minWidth: `${groupSelectWidth}px`,
              verticalAlign: 'middle',
              marginLeft: '10px'
            }}
            defaultValue="all"
            value={currentGroup}
            onChange={handleGroupSelectChange}
          >
            {groupList.map((element) => (
              <Option key={element.id} value={element.id}>
                {element.name}
              </Option>
            ))}
          </Select>
        </div>
      </Popover>
    </div>
  )
}

export default TopologyButtons
