/* eslint-disable no-unused-vars */
import React from 'react'
import MailService from './MailService/MailService'
import MailSetting from './MailSetting/MailSetting'

export const Mail = () => {
  return (
    <div>
      <MailService />
      <MailSetting />
    </div>
  )
}
