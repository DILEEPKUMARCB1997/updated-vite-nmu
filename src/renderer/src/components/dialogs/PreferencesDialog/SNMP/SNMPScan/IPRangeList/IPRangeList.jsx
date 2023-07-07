import { Button, Checkbox, Collapse, Divider, List } from 'antd'
import { CloseOutlined, PlusSquareOutlined } from '@ant-design/icons'
import './IPRangeList.css'
import React from 'react'

const { Panel } = Collapse
const ListItem = List.Item
const ListItemMeta = List.Item.Meta

const HEADER = 'IP Range List'

const IPRangeList = () => {
  return (
    <Collapse className="collapse">
      <Panel header={HEADER}>
        <List
          className="list"
          split={false}
          itemLayout="horizontal"
          // dataSource={Object.entries(IPRangeData)}
          renderItem={(item) => (
            <ListItem
              className="item"
              actions={[
                <Button
                  key=""
                  shape="circle"
                  icon={<CloseOutlined></CloseOutlined>}
                  // onClick={handleIPRangeDataRemoveButtonClick(item[0])}
                />
              ]}
            >
              <ListItemMeta
                avatar={
                  <Checkbox
                    checked={item[1].isActive}
                    // onChange={handleIPRangeDataCheckBoxChange(item[0])}
                  />
                }
                title={`${item[1].startIP} - ${item[1].endIP}`}
              />
            </ListItem>
          )}
        />
        <Divider />
        <div className="container" style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            type="primary"
            icon={<PlusSquareOutlined></PlusSquareOutlined>}
            // onClick={handeAddIPRangeButtonClick}
          >
            ADD
          </Button>
        </div>
      </Panel>
    </Collapse>
  )
}

export default IPRangeList
