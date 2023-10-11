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
        <Tabs activeKey={step.toString()} onChange={handleStepChange}>
          <Tabs.TabPane tab="Updating" key="0">
            <FWUTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Done" key="1"></Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default FWUTableTab
