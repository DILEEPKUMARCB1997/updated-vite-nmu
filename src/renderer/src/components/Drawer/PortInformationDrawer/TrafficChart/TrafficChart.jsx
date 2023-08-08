import { Card, Select, theme } from 'antd'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { portInformationSelector } from '../../../../features/portInformationSlice'

const TrafficChart = () => {
  const [selectPort, setSelectPort] = useState('Port1')
  const { useToken } = theme
  const { token } = useToken()
  const { Option } = Select

  const { trafficBuffer, labels, portStatusData } = useSelector(portInformationSelector)

  const selectItem = Object.keys(portStatusData)

  let showLabels = ['', '', '', '', '', '', '', '', '', '', '', '', '']
  const chartData = trafficBuffer[selectPort]
  if (chartData !== undefined) {
    showLabels = labels.map((element) => {
      if (element === '') {
        return ''
      }
      return Math.round(element / 100)
    })
    const currentIndex = labels.indexOf(0)
    if (currentIndex !== -1) {
      showLabels[currentIndex] = 'current'
      if (currentIndex !== 0) {
        showLabels[0] = `${showLabels[0]} sec age`
      }
    }
  }

  const options = {
    series: [
      {
        name: 'In',
        color: token.colorSuccess,
        // data: chartData === undefined ? [] : chartData.inBuffer
        data: [1000, 4100, 3500, 5100, 4900, 6200, 6900, 9100]
      },
      {
        name: 'Out',
        color: token.colorError,
        size: '5px',
        // data: chartData === undefined ? [] : chartData.outBuffer
        data: [9100, 14800, 1000, 1000, 4100, 3500, 5100, 4900]
      }
    ],

    chart: { type: 'line', toolbar: { show: false } },
    stroke: {
      width: 3
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top'
    },
    xaxis: {
      type: 'category',
      // categories: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'],
      categories: showLabels,
      labels: {
        rotate: -45,
        rotateAlways: true
      }
    }
  }

  const handlePortSelectChange = (value) => {
    setSelectPort(value)
  }

  return (
    <Card
      title="Real-Time Traffic"
      size="small"
      bordered={false}
      style={{
        height: '450px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      <Select value={selectPort} onChange={handlePortSelectChange} style={{ width: '100px' }}>
        {selectItem.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <ReactApexChart options={options} series={options.series} height={350} />
    </Card>
  )
}

export default TrafficChart
