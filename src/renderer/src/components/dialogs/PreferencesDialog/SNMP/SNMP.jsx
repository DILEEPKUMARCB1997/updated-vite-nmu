/* eslint-disable no-unused-vars */
import React from 'react'
import { FieldTimeOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
const items = [
  {
    label: 'SNMP ',
    icon: <FieldTimeOutlined />
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
        <span>SNMP</span>
      </Menu>
    </div>
  )
}

export default SNMP
