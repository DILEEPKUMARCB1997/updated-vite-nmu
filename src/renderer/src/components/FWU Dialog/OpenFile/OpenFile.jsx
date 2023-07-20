/* eslint-disable no-unused-vars */
import React from 'react'
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
          marginBottom: '0.5rem',
          fontSize: '1.25rem',
          lineHeight: '1.2'
        }}
      >
        New Firmware File
      </h5>
      <Input disabled value={filePath} prefix={<FileAddOutlined />} />
      <Button disabled={status !== 'wait'} onClick={handleBrowseButtonOnClick} color="primary">
        Browse
      </Button>
    </div>
  )
}

export default OpenFile
