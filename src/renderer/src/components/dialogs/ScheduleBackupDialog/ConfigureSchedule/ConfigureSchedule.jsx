import { Button, Card, Form, Input, InputNumber, Select, Typography, theme } from 'antd'
import React, { useRef } from 'react'
import { useState } from 'react'
import { datePad } from '../../../../../../main/modules/common/tools'
import { useDispatch, useSelector } from 'react-redux'
import {
  cancelClick,
  getScheduledData,
  requestAddScheduleBackup,
  scheduleBackupSelector,
  setEditMode
} from '../../../../features/scheduleBackupSlice'
import { useEffect } from 'react'

const ConfigureSchedule = () => {
  const {
    isEditMode,
    frequency,
    scheduleName,
    scheduleDate,
    scheduleTime,
    weeekDay,
    customFrequency,
    scheduleId
  } = useSelector(scheduleBackupSelector)
  // console.log(
  //   isEditMode,
  //   frequency,
  //   scheduleName,
  //   scheduleDate,
  //   scheduleTime,
  //   weeekDay,
  //   customFrequency
  // )
  // console.log(scheduleId)
  const dispatch = useDispatch()
  const now = new Date()
  const nowYear = datePad(now.getFullYear().toString())
  const nowMonth = datePad((now.getMonth() + 1).toString())
  const nowDate = datePad(now.getDate().toString())
  const nowHours = datePad(now.getHours().toString())
  const nowMinutes = datePad(now.getMinutes().toString())
  const nowSeconds = datePad(now.getSeconds().toString())

  // console.log(now.getFullYear() + '-' + nowMonth + '-' + nowDate)

  // const [frequency, setFrequency] = useState(2)
  // const [customFrequency, setCustomFrequency] = useState(1)
  // const [scheduleName, setScheduleName] = useState('')
  // const [scheduleTime, setScheduleTime] = useState(nowHours + ':' + nowMinutes)
  // const [scheduleDate, setScheduleDate] = useState(
  //   now.getFullYear() + '-' + nowMonth + '-' + now.getDate()
  // )
  // const [weeekDay, setWeekDay] = useState(0)

  const [state, setState] = useState({
    scheduleName: '',
    frequency: 2,
    customFrequency: 1,
    scheduleTime: nowHours + ':' + nowMinutes,
    scheduleDate: now.getFullYear() + '-' + nowMonth + '-' + nowDate,
    weeekDay: 1
  })
  // console.log(state)
  const [form] = Form.useForm()
  const { useToken } = theme
  const { token } = useToken()

  const handleNameInputChange = (e) => {
    // console.log(e.target.value)
    if (e.target.value.length <= 20) {
      setState({ ...state, scheduleName: e.target.value })
    }
  }

  const handleSelectChange = (value) => {
    // console.log(value)
    // setFrequency(value)
    setState({ ...state, frequency: value })
  }

  const handleDateChange = (e) => {
    // console.log(e.target.value)
    // setScheduleDate(e.target.value)
    setState({ ...state, scheduleDate: e.target.value })
  }

  const handleSelectChangeWeek = (value) => {
    // console.log(value)
    // setWeekDay(value)
    setState({ ...state, weeekDay: value })
  }

  const handleChangeCustom = (e) => {
    if (e.target.value > 0 && e.target.value < 31) {
      // setCustomFrequency(e.target.value)
      setState({ ...state, customFrequency: e.target.value })
    }
  }

  const handleTimeChange = (e) => {
    // setScheduleTime(e.target.value)
    setState({ ...state, scheduleTime: e.target.value })
  }

  const handleScheduleBackupClick = () => {
    form
      .validateFields()
      .then(() => {
        dispatch(
          requestAddScheduleBackup(state)
          // scheduleName,
          // scheduleTime,
          // scheduleDate,
          // frequency,
          // weeekDay,
          // customFrequency
        )
        dispatch(getScheduledData())
        dispatch(cancelClick())
        // setScheduleName('')
        // setFrequency(2)
        // setWeekDay(0)
        // setCustomFrequency(1)
        setState({
          scheduleName: '',
          frequency: 2,
          weeekDay: 0,
          customFrequency: 1,
          scheduleTime: nowHours + ':' + nowMinutes,
          scheduleDate: now.getFullYear() + '-' + nowMonth + '-' + nowDate
        })
        form.resetFields()
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo)
      })
  }

  const handleScheduleBackupCancelClick = () => {
    dispatch(cancelClick())
    // setScheduleName('')
    // setFrequency(2)
    // setWeekDay(0)
    // setCustomFrequency(1)
    setState({
      scheduleName: '',
      frequency: 2,
      weeekDay: 0,
      customFrequency: 1,
      scheduleTime: nowHours + ':' + nowMinutes,
      scheduleDate: now.getFullYear() + '-' + nowMonth + '-' + nowDate
    })
    form.resetFields()
  }

  useEffect(() => {
    if (isEditMode) {
      // console.log(frequency, scheduleName, scheduleDate, scheduleTime, weeekDay, customFrequency)
      const now = new Date(scheduleDate + '' + scheduleTime)
      const nowYear = datePad(now.getFullYear().toString())
      const nowMonth = datePad(now.getMonth() + 1).toString()
      const nowDate = datePad(now.getDate().toString())
      const nowHours = datePad(now.getHours().toString())
      const nowMinutes = datePad(now.getMinutes().toString())
      setState({
        scheduleName,
        frequency: frequency,
        scheduleDate: scheduleDate,
        scheduleTime: scheduleTime,
        weeekDay: weeekDay,
        customFrequency: customFrequency
      })
    }
  }, [scheduleId, frequency, scheduleName, scheduleDate, scheduleTime, weeekDay, customFrequency])

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
          label={
            <label style={{ color: state.scheduleName === '' ? 'red' : '' }}>Schedule Name</label>
          }
          // name="scheduleName"
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
              {state.scheduleName === '' ? 'Schedule Name is Required' : ''}
            </Typography>
          }
          style={{ color: token.colorError }}
        >
          <Input
            style={{ width: '200px' }}
            value={state.scheduleName}
            onChange={handleNameInputChange}
          />
        </Form.Item>
        <Form.Item label="Frequency" colon={false}>
          <Select
            placeholder="Frequency"
            value={state.frequency}
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
                    value={state.scheduleDate}
                    style={{ width: '200px' }}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              ),
              3: (
                <Form.Item label="Week Day" colon={false}>
                  <Select
                    value={state.weeekDay}
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
                    value={state.customFrequency}
                    onChange={handleChangeCustom}
                  />
                </Form.Item>
              )
            }[state.frequency]
          }
        </div>

        <Form.Item label="Schedule Time" hidden={false}>
          <Input
            type="time"
            style={{ width: '200px' }}
            value={state.scheduleTime}
            onChange={handleTimeChange}
          />
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="primary"
          style={{ marginRight: '10px' }}
          onClick={handleScheduleBackupClick}
          disabled={state.scheduleName === ''}
        >
          {isEditMode ? 'Edit Schedule' : 'Create Schedule'}
        </Button>
        <Button type="primary" ghost onClick={handleScheduleBackupCancelClick}>
          Cancel
        </Button>
      </div>
    </Card>
  )
}

export default ConfigureSchedule
