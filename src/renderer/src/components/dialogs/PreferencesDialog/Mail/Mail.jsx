/* eslint-disable no-unused-vars */
import React from 'react'
import MailService from './MailService/MailService'
import MailSetting from './MailSetting/MailSetting'
import { clearMailData } from '../../../../features/Preferences/mailSlice'
import { Divider } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Mail = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearMailData())
  }, [])
  return (
    <div style={{ display: 'inline-grid', width: '100%' }}>
      <MailService />
      <MailSetting />
      <Divider />
    </div>
  )
}

export default Mail
