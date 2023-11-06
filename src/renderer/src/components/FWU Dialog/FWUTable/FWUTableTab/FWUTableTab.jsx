/*
import React, { useState } from 'react'
import { Tabs, Button } from 'antd'
import FWUTable from '../FWUTable'


const FWUTableTab = () => {
  const [step, setStep] = useState(0)

  // const handleNext = () => {
  //   setStep((prevState) => ({
  //     step: prevState.step + 1
  //   }))
  // }

  // const handleBack = () => {
  //   setStep((prevState) => ({
  //     step: prevState.step - 1
  //   }))
  // }

  const handleStepChange = (step) => {
    setStep(step)
  }

  return (
    <div>
      <div>
        <Tabs
          activeKey={step}
          defaultActiveKey="0"
          onChange={handleStepChange}
          items={[
            {
              key: '0',
              label: 'Updating'
            },
            {
              key: '1',
              label: 'Done'
            }
          ]}
        />
        <FWUTable />
      </div>
    </div>
  )
}

export default FWUTableTab
*/
import React, { useState } from 'react'
import { Table, Tabs, Button } from 'antd'

import FWUTable from '../FWUTable'
import TabPane from 'antd/es/tabs/TabPane'

const FWUTableTab = () => {
  //const [step, setStep] = useState(0)
  const [current, setCurrent] = useState(0)
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  const handleStepChange = (current) => {
    setCurrent(current)
  }

  return (
    <div>
      <Tabs defaultActiveKey="0" onChange={handleStepChange}>
        <TabPane tab="Updating" key="0">
          <FWUTable />
        </TabPane>
        <TabPane tab="Done" key="1"></TabPane>
      </Tabs>
      <div
        style={{
          marginTop: 24
        }}
      >
        {current < 0 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}

        {current > 0 && (
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  )
}

export default FWUTableTab
