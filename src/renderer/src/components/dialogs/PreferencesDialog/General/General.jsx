/* eslint-disable no-unused-vars */
import React from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
const items = [
  {
    label: 'General ',
    icon: <SettingOutlined />
  }
]

const General = () => {
  return (
    <div>
      <Menu
        theme="dark"
        style={{ fontSize: '15px', justifyContent: 'center' }}
        defaultSelectedKeys={['1']}
        items={items}
      >
        <span>General</span>
      </Menu>
    </div>
  )
}

export default General
