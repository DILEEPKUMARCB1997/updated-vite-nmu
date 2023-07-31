import { Steps } from 'antd'
import { firmwareSelector } from '../../../features/firmwareUpdate'
import { useSelector } from 'react-redux'

const Step = Steps.Step

const StepView = () => {
  const { activeStep } = useSelector(firmwareSelector)
  console.log(activeStep)
  return (
    <Steps current={1} size="large">
      <Step title="Select a firmware file." />
      <Step title="Firmware updating." />
      <Step title="Finish!" />
    </Steps>
  )
}
export default StepView
