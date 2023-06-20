/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Card } from 'antd'

const SummaryCard = (props) => {
  const { title, hbcolor, bbcolor, bodylabel } = props
  return (
    <div className="summary">
      <Card
        title={title}
        bordered={false}
        headStyle={{
          minHeight: '31px',
          backgroundColor: hbcolor,
          color: '#E8F5E9',
          textAlign: 'center',
          padding: '0 10px'
        }}
        bodyStyle={{
          backgroundColor: bbcolor,
          textAlign: 'center',
          color: 'black',
          padding: '0px',
          fontSize: '1.4rem',
          fontWeight: 'bold'
        }}
      >
        {bodylabel}
      </Card>
    </div>
  )
}

export default SummaryCard