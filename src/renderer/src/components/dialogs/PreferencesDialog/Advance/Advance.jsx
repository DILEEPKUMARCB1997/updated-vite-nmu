/* eslint-disable no-unused-vars */
import React from 'react'
import { MailOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
const items = [
  {
    label: 'Advance ',
    icon: <MailOutlined />
  }
]
const Advance = () => {
  return (
    <div>
      <Menu
        theme="dark"
        style={{ fontSize: '15px', justifyContent: 'center' }}
        defaultSelectedKeys={['1']}
        items={items}
      >
        <span>Advance</span>
      </Menu>
    </div>
  )
}

export default Advance
