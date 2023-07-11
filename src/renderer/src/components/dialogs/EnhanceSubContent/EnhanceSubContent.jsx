import React from 'react'
import { Divider } from 'antd'
import PropTypes from 'prop-types'

const EnhanceSubContent = (props) => {
  const { title, children } = props
  return (
    <div>
      <Divider orientation="left" style={{ fontSize: '1.5rem', color: '#6fbbd6' }}>
        {title}
      </Divider>
      {React.Children.toArray(children).map((child) => (
        <div
          key={child.key}
          style={{ marginLeft: '5%', marginTop: '5px', padding: '0px 15px 0px 15px' }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

EnhanceSubContent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default EnhanceSubContent
