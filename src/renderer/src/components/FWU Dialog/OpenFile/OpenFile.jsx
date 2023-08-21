/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { requestOpenFile, firmwareSelector } from '../../../features/firmwareUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { FileAddOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'

const OpenFile = () => {
  const { filePath, status } = useSelector(firmwareSelector)
  const dispatch = useDispatch()

  const handleBrowseButtonOnClick = () => {
    dispatch(requestOpenFile())
  }

  return (
    <div style={{ display: 'inline-flex', width: '100%' }}>
      <h5
        style={{
          marginTop: '7px',
          marginRight: '7px',
          marginBottom: '0.8rem',
          fontSize: '1rem',
          lineHeight: '9px',
          width: '18%',
          textSizeAdjust: 'initial'
        }}
      >
        New Firmware File
      </h5>
      <Input disabled value={filePath} prefix={<FileAddOutlined />} />
      <Button
        disabled={status !== 'wait'}
        onClick={handleBrowseButtonOnClick}
        type="primary"
        style={{ marginLeft: '5px', position: 'relative' }}
      >
        Browse
      </Button>
    </div>
  )
}

export default OpenFile
