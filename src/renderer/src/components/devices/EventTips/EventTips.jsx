/* eslint-disable no-unused-vars */
import { Alert, Modal, message } from 'antd'
import React from 'react'
import { UIControlSelector, removeBatchOperateEvent } from '../../../features/UIControllSlice'
import { initResetToDefaultData } from '../../../features/resetToDefaultSlice'
import { discoverySelector } from '../../../features/discoverySlice'
import { useDispatch, useSelector } from 'react-redux'
import { initBackupRestoreData } from '../../../features/backupRestoreSlice'
import { initFirmwareUpdateData } from '../../../features/firmwareUpdate'
import { initSyslogSettingData } from '../../../features/SyslogSettingSlice'
import { initNetworkSettingData } from '../../../features/networkSettingSlice'
import { initTrapSettingData } from '../../../features/trapSettingSlice'
import './EventTips.css'

const messages = {
  firmwareUpdate: 'Firmware Update',
  resetToDefault: 'Reset To Default',
  backupRestore: 'Backup and Restore',
  syslogSetting: 'Syslog Server Setting',
  networkSetting: 'Network Setting',
  trapSetting: 'Trap Server Setting'
}

const TIPS = '(This feature only for device with SNMP support.)'

const EventTips = () => {
  const dispatch = useDispatch()

  const { batchOperateEvent, showBatchOperateTips } = useSelector(UIControlSelector)
  // console.log(showBatchOperateTips)
  // console.log(batchOperateEvent)
  const { SNMPSelectOnly, selected } = useSelector(discoverySelector)

  const disableOK = selected.length === 0
  // console.log(disableOK)
  // console.log(selected)

  const handleOKOnClick = () => {
    // console.log(batchOperateEvent)
    switch (batchOperateEvent) {
      case 'firmwareUpdate':
        dispatch(initFirmwareUpdateData())
        break
      case 'resetToDefault':
        dispatch(initResetToDefaultData())
        break
      case 'backupRestore':
        dispatch(initBackupRestoreData())
        break
      case 'syslogSetting':
        dispatch(initSyslogSettingData())
        break
      case 'networkSetting':
        dispatch(initNetworkSettingData())
        break
      case 'trapSetting':
        dispatch(initTrapSettingData())
        break
      default:
        break
    }
    dispatch(removeBatchOperateEvent())
  }

  const handleCancelOnClick = () => {
    dispatch(removeBatchOperateEvent())
  }

  const handleOKOnKeyPress = (event) => {
    if (event.key === 13 || event.key === 13) {
      handleOKOnClick()
    }
  }

  const handleCancelOnKeyPress = (event) => {
    if (event.key === 13 || event.key === 13) {
      handleCancelOnClick()
    }
  }

  const alertProps = {
    className: `${'alert'} ${showBatchOperateTips ? undefined : 'hide'}`,
    message: messages[batchOperateEvent],
    type: 'info',
    showIcon: true,
    description: (
      <div>
        <div>
          {' '}
          Select devices and press{' '}
          <a
            className={disableOK ? 'disable' : undefined}
            role="button"
            tabIndex="0"
            onClick={handleOKOnClick}
            onKeyDown={handleOKOnKeyPress}
          >
            {' '}
            OK
          </a>{' '}
          or{' '}
          <a
            role="button"
            tabIndex="0"
            onClick={handleCancelOnClick}
            onKeyDown={handleCancelOnKeyPress}
          >
            Cancel
          </a>
        </div>
        {SNMPSelectOnly && <div className="tips">{TIPS}</div>}{' '}
      </div>
    )
  }

  return <Alert {...alertProps} />
}

export default EventTips
