/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Card } from 'antd'

const SummaryCard = (props) => {
  const { title, hbcolor, bbcolor, bodylabel } = props
  return (
    <div>
      <Card
        size="small"
        title={title}
        bordered={false}
        style={{ height: 60 }}
        headStyle={{
          minHeight: '31px',
          backgroundColor: hbcolor,
          color: '#fff',
          textAlign: 'center',
          padding: '0 10px',
          fontSize: '15px'
        }}
        bodyStyle={{
          backgroundColor: bbcolor,
          textAlign: 'center',
          color: 'black',
          padding: '5px',
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
