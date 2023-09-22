/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Steps, Typography } from 'antd'
import PropTypes from 'prop-types'
//import SwipeableViews from 'react-swipeable-views'
import SwipeableViews from 'react-swipeable-views'
//import FWUTableRow from './FWUTableRow'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

function TableTab({ children, dir }) {
  TableTab.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired
  }
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  )
}

const FWUTableTab = ({ theme, columnData }) => {
  const [current, setCurrent] = useState(0)

  const handleNext = () => {
    setCurrent(current + 1)
  }
  const handleBack = () => {
    setCurrent(current - 1)
  }
  const handleStepChange = (step) => {
    setCurrent({ step })
  }
  // const direction = {}
  // console.log(direction)
  return (
    <div>
      <SwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        axis={'x-reverse'}
        resistance
        index={current}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        <TableTab dir={theme.direction}></TableTab>
      </SwipeableViews>
      <Steps current={current} />
      <div
        style={{
          marginTop: 24
        }}
      >
        {current < columnData && (
          <Button size="small" onClick={handleNext} disabled={current === 1}>
            Finish
            {theme.direction === 'rtl' ? <LeftOutlined /> : <RightOutlined />}
          </Button>
        )}
        {current > 0 && (
          <Button size="small" onClick={handleBack} disabled={current === 0}>
            {theme.direction === 'rtl' ? <RightOutlined /> : <LeftOutlined />}
            Updating
          </Button>
        )}
      </div>
    </div>
  )
}

export default FWUTableTab
