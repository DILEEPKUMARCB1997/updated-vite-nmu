/* eslint-disable no-unused-vars */
import { Alert } from 'antd'
import React from 'react'
import { UIControlSelector, removeBatchOperateEvent } from '../../../features/UIControllSlice'
import { initResetToDefaultData } from '../../../features/resetToDefaultSlice'
import { discoverySelector } from '../../../features/discoverySlice'
import { useDispatch, useSelector } from 'react-redux'
import './EventTips.css'

const messages = {
  resetToDefault: 'Reset To Default'
}
const TIPS = '(This feature only for device with SNMP support.)'

const EventTips = () => {
  const dispatch = useDispatch()
  const disableOK = useSelector((state) => {
    state.discovery.selected.length === 0
  })
  const { batchOperateEvent, showBatchOperateTips } = useSelector(UIControlSelector)
  const { SNMPSelectOnly } = useSelector(discoverySelector)

  const handleOKOnClick = () => {
    switch (batchOperateEvent) {
      case 'resetToDefault':
        dispatch(initResetToDefaultData())
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
    if (event.which === 13 || event.keyCode === 13) {
      handleOKOnClick()
    }
  }

  const handleCancelOnKeyPress = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      handleCancelOnClick()
    }
  }

  return (
    <div>
      <Alert
        // {showBatchOperateTips ? undefined : 'hide'}
        // className={('alert', showBatchOperateTips ? undefined : 'hide')}
        // className={classNames('alert', showBatchOperateTips ? undefined : 'hide')}
        message={messages[batchOperateEvent]}
        type="info"
        showIcon
        description={
          <div>
            <div>
              Select devices and press{' '}
              <a
                className={disableOK ? 'disable' : undefined}
                role="button"
                tabIndex="0"
                onClick={handleOKOnClick}
                onChange={handleOKOnKeyPress}
              >
                OK
              </a>{' '}
              or{' '}
              <a
                role="button"
                tabIndex="0"
                onClick={handleCancelOnClick}
                onChange={handleCancelOnKeyPress}
              >
                Cancel
              </a>
            </div>
            {SNMPSelectOnly && <div style={{ color: 'red' }}>{TIPS}</div>}
          </div>
        }
      />
    </div>
  )
}

export default EventTips
