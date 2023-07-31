/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Checkbox, Row, Table, Typography, Button, theme } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import {
  backupRestoreSelector,
  setRestoreFileIndex,
  requestDeleteFile
} from '../../../../features/backupRestoreSlice'
import { useDispatch, useSelector } from 'react-redux'
let files = []
let restoreFile = ''
const FileList = () => {
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { mode, isTaskRunning, isRestoreFisish } = useSelector(backupRestoreSelector)
  const handleFileCheckboxOnChange = (file) => () => {
    dispatch(setRestoreFileIndex({ file }))
  }
  const handleDeleteFileButtonOnClick = (file) => () => {
    dispatch(requestDeleteFile({ file }))
  }
  return (
    <div>
      <Card
        size="small"
        style={{ width: '100%', height: '100%' }}
        bordered={false}
        bodyStyle={{ padding: '5px' }}
      >
        <Typography.Title level={4} style={{ color: token.colorPrimary }}>
          Files
        </Typography.Title>
        <div
          style={{
            height: '400px',
            overflow: 'auto'
          }}
        >
          <Table style={{ width: '100%' }}>
            {files.map((file) => (
              // <Row key={file}></Row>
              <Table.Summary.Row key={file}>
                {mode === 'restore' && (
                  <td style={{ borderColor: '1px solid rgba(224, 224, 224, 1)' }}>
                    <Checkbox
                      disabled={isTaskRunning || isRestoreFisish}
                      checked={restoreFile === file}
                      onChange={handleFileCheckboxOnChange(file)}
                    ></Checkbox>
                  </td>
                )}
                <td style={{ borderColor: '1px solid rgba(224, 224, 224, 1)' }}>{file}</td>
                <td style={{ borderColor: '1px solid rgba(224, 224, 224, 1)' }}>
                  {mode === 'backup' && (
                    <Button
                      disabled={isTaskRunning}
                      type="primary"
                      size="small"
                      onClick={handleDeleteFileButtonOnClick(file)}
                      style={{ float: 'right' }}
                    >
                      <CloseOutlined />
                    </Button>
                  )}
                </td>
              </Table.Summary.Row>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  )
}

export default FileList
