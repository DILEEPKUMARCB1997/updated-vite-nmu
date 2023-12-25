/* eslint-disable no-unused-vars */
import React from 'react'
import MailSetting from './MailSetting/MailSetting'
import { clearMailData } from '../../../../features/Preferences/mailSlice'
import { Divider } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MailService from './MailService/MailService'

const Mail = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clearMailData())
    }
  }, [])
  return (
    <div style={{ display: 'inline-grid', width: '100%' }} data-testid="divTag">
      <MailService />
      <MailSetting />
      <Divider />
    </div>
  )
}

export default Mail
