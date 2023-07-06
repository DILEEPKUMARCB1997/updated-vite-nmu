/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Select, Divider, Card } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  generalSelector,
  clearGeneralData,
  setNICActiveIndex
} from '../../../../features/generalSlice'

const { Option } = Select

const General = (props) => {
  const { activeNIC, NICSelectWidth } = props
  const { NICData } = useSelector(generalSelector)
  console.log(NICData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearGeneralData())
    dispatch(setNICActiveIndex())
  }, [])

  const handleNICSelectOnChange = (value) => {
    setNICActiveIndex(value)
  }

  return (
    <div style={{ width: '100%' }}>
      <Card
        bordered={false}
        title={
          <span
            style={{
              width: '100%',
              fontSize: '1.5rem',
              color: ' #6fbbd6',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            {' '}
            Network Interface Card
          </span>
        }
      >
        <Select
          style={{ width: `${NICSelectWidth}px`, minWidth: '400px' }}
          value={activeNIC}
          dropdownStyle={{ zIndex: '1301' }}
          onChange={handleNICSelectOnChange}
        >
          {Array.isArray(NICData)
            ? NICData.map((NICInfo, index) => {
                return (
                  <Option key={NICInfo.name} value={index}>
                    {`${NICInfo.name} - ${NICInfo.IPAddress}`}
                  </Option>
                )
              })
            : null}
        </Select>
      </Card>
      <Divider />
    </div>
  )
}

export default General
