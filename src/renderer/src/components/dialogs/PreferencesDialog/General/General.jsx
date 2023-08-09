/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Select, Divider, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  generalSelector,
  clearGeneralData,
  setNICActiveIndex
} from '../../../../features/Preferences/generalSlice'

const { Option } = Select

const General = () => {
  const { NICData } = useSelector(generalSelector)
  const { niList } = NICData
  console.log(niList)
  console.log(NICData)
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearGeneralData())
  }, [])

  let NICSelectWidth = 400
  // niList.forEach((element) => {
  //   console.log(element)
  //   const minWidth = element.name.length * 12
  //   if (minWidth > NICSelectWidth) {
  //     NICSelectWidth = minWidth
  //   }
  // })

  const handleNICSelectOnChange = (value) => {
    console.log(value)
    dispatch(setNICActiveIndex())
  }

  return (
    <div style={{ width: '100%' }}>
      <Divider
        orientation="left"
        style={{
          marginBottom: '15px',
          marginTop: '15px',
          fontSize: '20px',
          color: token.colorPrimary,
          borderCollapse: 'true'
        }}
      >
        Network Interface Card
      </Divider>
      <Select
        labelInValue={false}
        defaultValue={{
          value: 'default-0.0.0.0',
          label: 'default-0.0.0.0'
        }}
        style={{
          width: `${NICSelectWidth}px`,
          minWidth: '400px',
          marginTop: '10px',
          marginBottom: '10px'
        }}
        dropdownStyle={{ zIndex: '1301' }}
        onChange={handleNICSelectOnChange}
      >
        {niList &&
          niList.map((NICInfo, index) => (
            <Option key={NICInfo.name} value={index}>
              {`${NICInfo.name} - ${NICInfo.IPAddress}`}
            </Option>
          ))}
      </Select>
      <Divider />
    </div>
  )
}

export default General
