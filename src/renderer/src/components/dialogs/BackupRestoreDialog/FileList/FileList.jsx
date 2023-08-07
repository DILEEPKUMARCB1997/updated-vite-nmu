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
        title="Files"
        // style={{ width: '100%', height: '100%' }}
        bordered={false}
        // bodyStyle={{ padding: '5px' }}
        style={{
          height: '450px',
          borderRadius: '4px',
          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
        }}
        headStyle={{ backgroundColor: token.colorPrimaryBorder }}
      >
        <div
          style={{
            height: '400px',
            overflow: 'auto'
          }}
        >
          <Table style={{ width: '100%' }}>
            {files.map((file) => (
              // <Row key={file}></Row>
              <Row key={file}>
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
              </Row>
            ))}
          </Table>
        </div>
      </Card>
    </div>
  )
}

export default FileList
