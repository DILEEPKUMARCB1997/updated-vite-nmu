import React, { useState } from 'react'
import { Tabs } from 'antd'

import FWUTable from '../FWUTable'
import TabPane from 'antd/es/tabs/TabPane'
import FWUDoneTable from '../FWUDoneTable'

const FWUTableTab = () => {
  const [current, setCurrent] = useState(0)
  console.log(current)

  const handleStepChange = (current) => {
    setCurrent(current)
  }

  return (
    <div>
      <Tabs defaultActiveKey="0" onChange={handleStepChange}>
        <TabPane tab="Updating" key="0">
          <FWUTable />
        </TabPane>
        <TabPane tab="Done" key="1">
          <FWUDoneTable />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FWUTableTab
