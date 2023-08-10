/* eslint-disable react/prop-types */
import { App, Button, Card, Collapse, Divider, Table, Typography, notification, theme } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getScheduledData,
  scheduleBackupSelector,
  setEditMode
} from '../../../../features/scheduleBackupSlice'
import { openDialog } from '../../../../features/dialogSlice'
import {
  deleteSchedule,
  initScheduleMemberData,
  scheduleBackupMemberSelector
} from '../../../../features/scheduleBackupMemberSlice'
import {
  REQUEST_MP_DELETE_SCHEDULE,
  RESPONSE_RP_DELETE_SCHEDULE
} from '../../../../../../main/utils/IPCEvents'

const DeviceList = (props) => {
  const { modal } = App.useApp()
  const {
    isRestoreFinish,
    deviceStatus,
    selectDevice,
    isTaskRunning,
    mode,
    scheduledBackup,
    scheduledDeviceArrayData
  } = useSelector(scheduleBackupSelector)

  console.log(scheduledDeviceArrayData)

  const scheduledBackupListId = Object.keys(scheduledBackup)
  console.log(scheduledBackupListId)
  const dispatch = useDispatch()

  const data = useSelector((state) => state.scheduleBackup.scheduledBackup)
  console.log(data)

  const { Panel } = Collapse
  const { useToken } = theme
  const { token } = useToken()

  const SUCCESS = 1
  const ERROR = 2

  const results = ['waiting', 'SUCCESS', 'ERROR']

  const weekDayResult = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
  ]

  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model'
    },
    {
      title: 'MAC Address',
      dataIndex: 'MACAddress',
      key: 'MACAddress'
    },
    {
      title: 'IP Address',
      dataIndex: 'IPAddress',
      key: 'IPAddress'
    },
    {
      title: 'Status',
      dataIndex: 'scheduleStatus',
      key: 'scheduleStatus'
    }
  ]

  const handleEditMember = (scheduleId, scheduleName) => {
    dispatch(openDialog('transferScheduleMember'))
    dispatch(initScheduleMemberData({ scheduleId, scheduleName }))
  }

  const handleEditSchedule = (scheduleId) => {
    console.log(scheduleId)
    notification.info({
      message: 'Schedule Backup configuration is in EDIT mode'
    })
    dispatch(setEditMode({ isEditMode: true, scheduleId: scheduleId }))
  }

  const handleDeleteSchedule = (scheduleId) => {
    console.log(scheduleId)
    modal.confirm({
      title: 'Delete Confirmation',
      content: 'Are you sure you want to delete this Scheduled Backup ?',
      okText: 'Delete',
      onOk: () => {
        dispatch(deleteSchedule({ scheduleId: scheduleId }))
      }
    })
  }

  return (
    <Card
      title="Device List"
      size="small"
      bordered={false}
      style={{
        overflow: 'auto',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      {scheduledBackupListId.map((scheduleId) => (
        <Collapse
          key={scheduleId}
          accordion
          expandIconPosition="right"
          className="custom-colapse"
          style={{
            marginBottom: '10px',
            background: 'transparent',
            borderRadius: '4px',
            boxShadow:
              '10px 4px 20px 10px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Panel
            header={
              <Typography>
                <b>Schedule Name : </b> {data[scheduleId].scheduleName}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                <b>Scheduled Backup : </b>
                {data[scheduleId].frequency === 1
                  ? data[scheduleId].scheduleDate
                  : data[scheduleId].frequency === 2
                  ? 'Daily'
                  : 'Every ' + weekDayResult[data[scheduleId].weeekDay]}{' '}
                {data[scheduleId].scheduleTime}
              </Typography>
            }
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0px' }}>
              <Button
                type="text"
                onClick={() => {
                  handleEditMember(scheduleId, data[scheduleId].scheduleName)
                }}
              >
                Edit Member
              </Button>
              <Button
                style={{
                  color: token.colorPrimary
                }}
                type="text"
                onClick={() => {
                  handleEditSchedule(scheduleId)
                }}
              >
                Edit
              </Button>
              <Button
                style={{ color: token.colorError }}
                type="text"
                danger
                onClick={() => {
                  handleDeleteSchedule(scheduleId)
                }}
              >
                Delete
              </Button>
            </div>
            <div style={{ padding: '10px' }}>
              <Table columns={columns} dataSource={scheduledDeviceArrayData[scheduleId]} />
            </div>
          </Panel>
        </Collapse>
      ))}
    </Card>
  )
}

export default DeviceList
