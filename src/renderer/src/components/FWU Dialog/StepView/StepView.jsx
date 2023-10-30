import { Steps } from 'antd'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'

//const Step = Steps.Step

const StepView = () => {
  const { activeStep } = useSelector(firmwareSelector)
  console.log(activeStep)
  return (
    <Steps
      activestep={activeStep}
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
export default StepView
