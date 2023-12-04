import React from 'react'
import FWUTable from '../FWUTable'
import FWUDoneTable from '../FWUDoneTable'
import { Tabs } from 'antd'
const onChange = (key) => {
  console.log(key)
}
const items = [
  {
    key: '1',
    label: 'Updating',
    children: <FWUTable />
  },
  {
    key: '2',
    label: 'Done',
    children: <FWUDoneTable />
  }
]
const FWUTableTab = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
export default FWUTableTab
