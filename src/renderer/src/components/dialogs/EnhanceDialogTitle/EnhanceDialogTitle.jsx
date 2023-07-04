import React, { Component } from 'react'
import { DialogTitle, IconButton } from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'
import PropTypes from 'prop-types'
import styles from './EnhanceDialogTitle.scss'
import { Card } from 'antd'

class EnhanceDialogTitle extends Component {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    disabledCancel: PropTypes.bool,
    hideCloseButton: PropTypes.bool
  }

  static defaultProps = {
    children: undefined,
    disabledCancel: false,
    hideCloseButton: false
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        className: styles.icon
      })
    )
    const { hideCloseButton, label, disabledCancel, close } = this.props
    return (
      <Card
        style={{
          padding: '15px',
          height: '80px',
          backgroundColor: '#2e96f3',
          marginBottom: '3px',
          background: ' linear-gradient(60deg, #6fbbd6, #2e96f3)',
          boxShadow: ' 0px 2px 4px -1px rgba(0, 0, 0, 0.2)'
        }}
      >
        {childrenWithProps}
        <span style={{ float: 'left', marginLeft: '10px', marginTop: '5px' }}>{label}</span>
        {!hideCloseButton && (
          <IconButton disabled={disabledCancel} className={styles.cancelButton} onClick={close}>
            <Clear />
          </IconButton>
        )}
      </Card>
    )
  }
}

export default EnhanceDialogTitle
