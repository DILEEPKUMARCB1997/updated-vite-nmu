/* eslint-disable no-unused-vars */
import { Alert, Modal } from 'antd'
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
  // const disableOK = useSelector((state) => {
  //   state.discovery.selected.length === 0
  // })

  const { batchOperateEvent, showBatchOperateTips } = useSelector(UIControlSelector)
  // console.log(batchOperateEvent)
  // console.log(showBatchOperateTips)
  console.log(messages[batchOperateEvent])
  const { SNMPSelectOnly, selected } = useSelector(discoverySelector)
  // console.log(SNMPSelectOnly)
  const disableOK = selected.length === 0

  const handleOKOnClick = () => {
    switch (batchOperateEvent) {
      case 'firmwareUpdate':
        dispatch(initFirmwareUpdateData())
        console.log(initFirmwareUpdateData())
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
    className: `${'alert'} ${showBatchOperateTips ? '' : 'hide'}`,
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

  return (
    <Alert {...alertProps} />
    //   <Alert
    //     style={{
    //       position: 'fixed',
    //       // borderTop: 'none',
    //       zIndex: 1000,
    //       left: 'calc(50% - 250px)',
    //       top: '150px',

    //       minHeight: '0px',
    //       width: '500px',
    //       margin: '10px 0px'
    //     }}
    //     action={[
    //       showBatchOperateTips ? undefined : (
    //         <span
    //           style={{
    //             height: '0px',
    //             overflow: 'hidden',
    //             paddingTop: '0px',
    //             paddingBottom: '0px',
    //             borderBottom: 'none'
    //           }}
    //         />
    //       )
    //     ]}
    //     // className={('alert', showBatchOperateTips ? undefined : 'hide')}
    //     // className={classNames('alert', showBatchOperateTips ? undefined : 'hide')}
    //     message={messages[batchOperateEvent]}
    //     type="info"
    //     showIcon
    //     description={
    //       <div>
    //         <div>
    //           Select devices and press{' '}
    //           <a
    //             className={disableOK ? 'disable' : undefined}
    //             role="button"
    //             tabIndex="0"
    //             onClick={handleOKOnClick}
    //             onKeyDown={handleOKOnKeyPress}
    //           >
    //             OK
    //           </a>{' '}
    //           or{' '}
    //           <a
    //             role="button"
    //             tabIndex="0"
    //             onClick={handleCancelOnClick}
    //             onKeyDown={handleCancelOnKeyPress}
    //           >
    //             Cancel
    //           </a>
    //         </div>
    //         {SNMPSelectOnly && <div style={{ color: 'red' }}>{TIPS}</div>}
    //       </div>
    //     }
    //   />
  )
}

export default EventTips
