import React from 'react'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const CustomRangePicker = (props) => {
  const { onChange } = props

  const disabledDate = (current) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <RangePicker
      popupStyle={{ zIndex: '1301' }}
      disabledDate={disabledDate}
      // disabledTime={disabledRangeTime}
      style={{ marginRight: '10px' }}
      onChange={onChange}
      showTime={{ format: 'YYYY-MM-DD HH:mm:ss', hideDisabledOptions: false }}
    />
  )
}

export default CustomRangePicker
