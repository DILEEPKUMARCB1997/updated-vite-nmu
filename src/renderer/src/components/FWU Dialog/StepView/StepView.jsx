import { Steps } from 'antd'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'
import React from 'react'

const StepView = () => {
  const { activeStep } = useSelector(firmwareSelector)
  return (
    <Steps
      current={activeStep}
      size="large"
      items={[
        {
          title: 'Select a firmware file.'
        },
        {
          title: 'Firmware updating.'
        },
        {
          title: 'Finish!'
        }
      ]}
    ></Steps>
  )
}
export default React.memo(StepView)
