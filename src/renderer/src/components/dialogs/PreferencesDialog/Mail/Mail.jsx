/* eslint-disable no-unused-vars */
import React from 'react'
import MailService from './MailService/MailService'
import MailSetting from './MailSetting/MailSetting'
import { Divider } from 'antd'

const Mail = () => {
  return (
    <div>
      <MailService />
      <MailSetting />
      <Divider />
    </div>
  )
}

export default Mail
