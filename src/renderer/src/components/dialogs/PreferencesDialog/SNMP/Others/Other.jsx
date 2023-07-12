import { Divider, Switch, Typography, theme } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrecheckSNMP, snmpSelector } from '../../../../../features/Preferences/snmpSlice'

const Other = () => {
  const { isPrecheck } = useSelector(snmpSelector)
  console.log(isPrecheck)
  const dispatch = useDispatch()
  const { useToken } = theme
  const { token } = useToken()

  const handlePrecheckSwitchOnChange = (checked) => {
    console.log(checked)
    dispatch(setPrecheckSNMP(checked))
  }

  return (
    <div>
      <Divider
        orientation="left"
        style={{
          marginBottom: '15px',
          marginTop: '15px',
          fontSize: '20px',
          color: token.colorPrimary
        }}
      >
        Others
      </Divider>
      <div style={{ display: 'flex', marginLeft: '60px', alignItems: 'center' }}>
        <Switch
          checked={isPrecheck}
          style={{ marginRight: '10px' }}
          onChange={handlePrecheckSwitchOnChange}
        />
        <Typography.Title style={{ marginBottom: '0px' }} level={5}>
          Precheck device SNMP feature before specific operate.
        </Typography.Title>
      </div>
    </div>
  )
}

export default Other
