import { Alert, Form, Input, Modal } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewIPRangeData } from '../../../features/Preferences/snmpSlice'

const AddIPRangeDialog = ({ onClose }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const dispatch = useDispatch()

  const [startIP, setStartIP] = useState('')
  const [endIP, setEndIP] = useState('')

  const [form] = Form.useForm()
  const IPFormat =
    /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/

  const isValidFormat = (StartIP, EndIP) => {
    const startIPArray = StartIP.split('.')
    console.log(startIPArray)
    const endIPArray = EndIP.split('.')
    console.log(endIPArray)
    if (
      startIPArray[0] === endIPArray[0] &&
      startIPArray[1] === endIPArray[1] &&
      startIPArray[2] === endIPArray[2] &&
      Number(startIPArray[3]) <= Number(endIPArray[3])
    ) {
      return true
    }
    return false
  }

  const handleStartAddressInputOnChange = (e) => {
    console.log(e)
    setStartIP(e.target.value)
  }

  const handleEndAddressInputOnChange = (e) => {
    setEndIP(e.target.value)
  }

  const handleOkButtonClick = () => {
    // form
    //   .validateFields()
    //   .then(() => {
    //     dispatch(addNewIPRangeData({ startIP, endIP }))
    //     form.resetFields()
    //     onClose()
    //   })
    //   .catch((errorInfo) => {
    //     console.log('Validation Failed:', errorInfo)
    //   })

    dispatch(
      addNewIPRangeData({
        startIP,
        endIP
      })
    )
    onClose()
  }

  // const validStartIP = IPFormat.test(startIP)
  // const validEndIP = IPFormat.test(endIP)

  // const enableOKButton = isValidFormat(startIP, endIP)

  return (
    <Modal
      bodyStyle={{ textAlign: 'center' }}
      title="Add New IP Range"
      open
      onOk={handleOkButtonClick}
      onCancel={onClose}
      okText="Ok"
      okButtonProps={{ disabled: !isValidFormat(startIP, endIP) }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="startIp"
          label="Start IP Address"
          rules={[
            {
              required: true,
              message: 'Please input Start IP Address'
            },
            {
              pattern: IPFormat,
              message: 'Invalid IP address pattern'
            }
          ]}
        >
          <Input
            placeholder="Enter the Start IP Address"
            onChange={handleStartAddressInputOnChange}
          />
        </Form.Item>
        <Form.Item
          name="endIp"
          label="End IP Address"
          rules={[
            {
              required: true,
              message: 'Please input End IP Address'
            },
            {
              pattern: IPFormat,
              message: 'Invalid IP address pattern'
            }
          ]}
        >
          <Input placeholder="Enter the End IP Address" onChange={handleEndAddressInputOnChange} />
        </Form.Item>
        <Form.Item>
          <Alert
            showIcon
            // icon
            type="info"
            // message="Note"
            description="Start address must be less then end address and in the same network segment."
            style={{
              textAlign: 'center',
              padding: '10px',
              marginTop: '25px'
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddIPRangeDialog
