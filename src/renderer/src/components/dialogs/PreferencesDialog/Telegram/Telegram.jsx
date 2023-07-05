/* eslint-disable no-unused-vars */
import React from 'react'
import { InstagramOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
const items = [
  {
    label: 'Telegram ',
    icon: <InstagramOutlined />
  }
]
const SNMP = () => {
  return (
    <div>
      <Menu
        theme="dark"
        style={{ fontSize: '15px', justifyContent: 'center' }}
        defaultSelectedKeys={['1']}
        items={items}
      >
        <span>Telegram</span>
      </Menu>
    </div>
  )
}

export default SNMP
