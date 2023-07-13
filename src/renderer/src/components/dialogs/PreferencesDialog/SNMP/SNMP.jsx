/* eslint-disable no-unused-vars */
import { Card } from 'antd'
import React, { useEffect } from 'react'
import SNMPScan from './SNMPScan/SNMPScan'
import DefaultCommunity from './DefaultCommunity/DefaultCommunity'
import Other from './Others/Other'
import { useDispatch } from 'react-redux'
import { clearSNMPSettingData } from '../../../../features/Preferences/snmpSlice'

const SNMP = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clearSNMPSettingData())
    }
  }, [])

  return (
    <Card>
      {/* <div> */}
      <SNMPScan />
      <DefaultCommunity />
      <Other />
      {/* </div> */}
    </Card>
  )
}

export default SNMP
