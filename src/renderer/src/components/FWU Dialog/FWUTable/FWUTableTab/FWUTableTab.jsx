import React, { useState } from 'react'
import { Tabs, Button } from 'antd'
import FWUTable from '../FWUTable'
import FWUDoneTable from '../FWUDoneTable'

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
