/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Select, Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  generalSelector,
  clearGeneralData,
  setNICActiveIndex
} from '../../../../features/Preferences/generalSlice'

const { Option } = Select

const General = (props) => {
  const { NICData, NICSelectWidth } = props
  // const { NICData } = useSelector(generalSelector)

  console.log(NICData)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(clearGeneralData())
    }
    // dispatch(setNICActiveIndex())
  }, [])

  const handleNICSelectOnChange = (value) => {
    dispatch(setNICActiveIndex(value))
  }

  return (
    <div style={{ width: '100%' }}>
      <Divider
        orientation="left"
        style={{
          width: '100%',
          fontSize: '1.5rem',
          color: ' #6fbbd6',
          marginTop: '10px',
          marginBottom: '10px',
          alignItems: 'baseline'
        }}
      >
        Network Interface Card
      </Divider>
      <Select
        style={{
          width: `${NICSelectWidth}px`,
          minWidth: '400px',
          marginTop: '10px',
          marginBottom: '20px'
        }}
        value="default"
        dropdownStyle={{ zIndex: '1301' }}
        onChange={handleNICSelectOnChange}
      >
        {NICData &&
          NICData.map((NICInfo, index) => (
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
