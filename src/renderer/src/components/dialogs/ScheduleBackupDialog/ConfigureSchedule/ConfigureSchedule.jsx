import { Button, Card, Form, Input, InputNumber, Select, Typography, theme } from 'antd'
import React from 'react'
import { useState } from 'react'
import { datePad } from '../../../../../../main/modules/common/tools'
import { useDispatch, useSelector } from 'react-redux'
import {
  cancelClick,
  getScheduledData,
  requestAddScheduleBackup,
  scheduleBackupSelector
} from '../../../../features/scheduleBackupSlice'
import { useEffect } from 'react'

const ConfigureSchedule = () => {
  const { isEditMode } = useSelector(scheduleBackupSelector)
  console.log(isEditMode)
  const dispatch = useDispatch()
  const now = new Date()
  const nowYear = datePad(now.getFullYear().toString())
  const nowMonth = datePad((now.getMonth() + 1).toString())
  const nowDate = datePad(now.getDate().toString())
  const nowHours = datePad(now.getHours().toString())
  const nowMinutes = datePad(now.getMinutes().toString())
  const nowSeconds = datePad(now.getSeconds().toString())

  const [frequency, setFrequency] = useState(2)
  const [customFrequency, setCustomFrequency] = useState(1)
  const [scheduleName, setScheduleName] = useState('')
  const [scheduleTime, setScheduleTime] = useState(nowHours + ':' + nowMinutes)
  const [scheduleDate, setScheduleDate] = useState(
    now.getFullYear() + '-' + nowMonth + '-' + now.getDate()
  )
  const [weeekDay, setWeekDay] = useState(0)

  // const [state, setState] = useState({
  //   frequency: 2,
  //   customFrequency: 1,
  //   scheduleName: '',
  //   scheduleTime: nowHours + ':' + nowMinutes,
  //   scheduleDate: now.getFullYear() + '-' + nowMonth + '-' + now.getDate(),
  //   weeekDay: 0
  // })
  const [form] = Form.useForm()
  const { useToken } = theme
  const { token } = useToken()

  const handleNameInputChange = (e) => {
    console.log(e.target.value)
    if (e.target.value.length <= 20) {
      setScheduleName(e.target.value)
      // setState({ scheduleName: e.target.value })
    }
  }

  const handleSelectChange = (value) => {
    console.log(value)
    setFrequency(value)
    // setState({})
  }

  const handleDateChange = (e) => {
    console.log(e.target.value)
    setScheduleDate(e.target.value)
  }

  const handleSelectChangeWeek = (value) => {
    console.log(value)
    setWeekDay(value)
  }

  const handleChangeCustom = (e) => {
    if (e.target.value > 0 && e.target.value < 31) {
      setCustomFrequency(e.target.value)
    }
  }

  const handleTimeChange = (e) => {
    setScheduleTime(e.target.value)
  }

  const handleScheduleBackupClick = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(
          requestAddScheduleBackup({
            scheduleName,
            scheduleTime,
            scheduleDate,
            frequency,
            weeekDay,
            customFrequency
          })
        )
        dispatch(getScheduledData())
        dispatch(cancelClick())
        setScheduleName('')
        setFrequency(2)
        setWeekDay(0)
        setCustomFrequency(1)
        form.resetFields()
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo)
      })
  }

  const handleScheduleBackupCancelClick = () => {
    dispatch(cancelClick())
    setScheduleName('')
    setFrequency(2)
    setWeekDay(0)
    setCustomFrequency(1)
    form.resetFields()
  }

  useEffect(() => {
    if (isEditMode) {
      setScheduleName(scheduleName)
      setFrequency(frequency)
      setScheduleDate(now.getFullYear() + '-' + nowMonth + '-' + now.getDate())
      setScheduleTime(nowHours + ':' + nowMinutes)
      setWeekDay(weeekDay)
      setCustomFrequency(customFrequency)
    }
  }, [isEditMode])

  return (
    <Card
      title="Create Backup Schedule"
      size="small"
      bordered={false}
      style={{
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      <Form
        layout="vertical"
        style={{ display: 'flex', justifyContent: 'space-around' }}
        form={form}
      >
        <Form.Item
          label={<label style={{ color: scheduleName === '' ? 'red' : '' }}>Schedule Name</label>}
          s
          name="scheduleName"
          // help="Schedule Name is Required"
          colon={false}
          rules={[
            {
              required: true,
              message: 'Schedule Name is Required'
            }
          ]}
          help={
            <Typography style={{ color: 'red' }}>
              {scheduleName === '' ? 'Schedule Name is Required' : ''}
            </Typography>
          }
          style={{ color: token.colorError }}
        >
          <Input style={{ width: '200px' }} value={scheduleName} onChange={handleNameInputChange} />
        </Form.Item>
        <Form.Item label="Frequency" colon={false}>
          <Select
            placeholder="Frequency"
            value={frequency}
            onChange={handleSelectChange}
            style={{ width: '200px' }}
            options={[
              { label: 'None', value: 1 },
              { label: 'Daily', value: 2 },
              { label: 'Weekly', value: 3 }
            ]}
          />
        </Form.Item>

        <div>
          {
            {
              1: (
                <Form.Item label="Schedule Date" colon={false}>
                  <Input
                    type="date"
                    value={scheduleDate}
                    style={{ width: '200px' }}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              ),
              3: (
                <Form.Item label="Week Day" colon={false}>
                  <Select
                    value={weeekDay}
                    onChange={handleSelectChangeWeek}
                    style={{ width: '200px' }}
                    options={[
                      { label: 'Sunday', value: 0 },
                      { label: 'Monday', value: 1 },
                      { label: 'Tuesday', value: 2 },
                      { label: 'Wednesday', value: 3 },
                      { label: 'Thursday', value: 4 },
                      { label: 'Friday', value: 5 },
                      { label: 'Saturday', value: 6 }
                    ]}
                  />
                </Form.Item>
              ),
              4: (
                <Form.Item label="Frequency (In days)" hidden={false}>
                  <InputNumber
                    style={{ width: '200px' }}
                    value={customFrequency}
                    onChange={handleChangeCustom}
                  />
                </Form.Item>
              )
            }[frequency]
          }
        </div>

        <Form.Item label="Schedule Time" hidden={false}>
          <Input
            type="time"
            style={{ width: '200px' }}
            value={scheduleTime}
            onChange={handleTimeChange}
          />
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={handleScheduleBackupClick}
          disabled={scheduleName === ''}
        >
          {isEditMode ? 'Edit Schedule' : 'Create Schedule'}
        </Button>
        <Button type="primary" onClick={handleScheduleBackupCancelClick}>
          Cancel
        </Button>
      </div>
    </Card>
  )
}

export default ConfigureSchedule
