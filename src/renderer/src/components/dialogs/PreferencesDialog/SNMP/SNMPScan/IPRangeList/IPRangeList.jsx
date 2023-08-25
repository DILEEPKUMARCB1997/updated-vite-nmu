/* eslint-disable no-unused-vars */
import { Button, Checkbox, Collapse, Divider, List } from 'antd'
import { CloseOutlined, PlusSquareOutlined } from '@ant-design/icons'
import './IPRangeList.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from '../../../../../../features/dialogSlice'
import {
  removeIPRangeData,
  snmpSelector,
  updateIPRangeActive
} from '../../../../../../features/Preferences/snmpSlice'

const { Panel } = Collapse
const ListItem = List.Item
const ListItemMeta = List.Item.Meta

const HEADER = 'IP Range List'

const IPRangeList = () => {
  const dispatch = useDispatch()

  const { IPRangeData } = useSelector(snmpSelector)
  console.log(Object.entries(IPRangeData))

  const handleAddIPRangeButtonClick = () => {
    dispatch(openDialog('addIPRange'))
  }

  const handleIPRangeDataCheckBoxChange = (id) => (e) => {
    console.log(e.target)
    dispatch(updateIPRangeActive({ isActive: e.target.checked, id }))
  }

  const handleIPRangeDataRemoveButtonClick = (id) => () => {
    dispatch(removeIPRangeData(id))
  }

  return (
    <Collapse className="collapse">
      <Panel header={HEADER}>
        <List
          className="list"
          split={false}
          itemLayout="horizontal"
          dataSource={Object.entries(IPRangeData)}
          renderItem={(item) => (
            <ListItem
              className="item"
              actions={[
                <Button
                  size="small"
                  key=""
                  icon={<CloseOutlined></CloseOutlined>}
                  onClick={handleIPRangeDataRemoveButtonClick(item[0])}
                />
              ]}
            >
              <ListItemMeta
                avatar={
                  <Checkbox
                    checked={item[1].isActive}
                    onChange={handleIPRangeDataCheckBoxChange(item[0])}
                  />
                }
                title={`${item[1].startIP} - ${item[1].endIP}`}
              />
            </ListItem>
          )}
        />
        <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
        <div style={{ display: 'flex', justifyContent: 'end', margin: '0px' }}>
          <Button
            type="primary"
            icon={<PlusSquareOutlined></PlusSquareOutlined>}
            onClick={handleAddIPRangeButtonClick}
          >
            ADD
          </Button>
        </div>
      </Panel>
    </Collapse>
  )
}

export default IPRangeList
