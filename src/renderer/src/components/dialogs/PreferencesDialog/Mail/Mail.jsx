/* eslint-disable no-unused-vars */
import React from 'react'
import { MailOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
const items = [
  {
    label: 'Mail ',
    icon: <MailOutlined />
  }
]
const Mail = () => {
  return (
    <div>
      <Menu
        theme="dark"
        style={{ fontSize: '15px', justifyContent: 'center' }}
        defaultSelectedKeys={['1']}
        items={items}
      >
        <span>Mail</span>
      </Menu>
    </div>
  )
}

export default Mail
