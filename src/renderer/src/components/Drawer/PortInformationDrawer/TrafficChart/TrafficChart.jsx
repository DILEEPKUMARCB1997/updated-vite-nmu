import { Card, theme } from 'antd'
import React from 'react'

const TrafficChart = () => {
  const { useToken } = theme
  const { token } = useToken()
  return (
    <Card
      title="Real-Time Traffic"
      size="small"
      bordered={false}
      style={{
        height: '350px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      Traffic Chart
    </Card>
  )
}

export default TrafficChart
