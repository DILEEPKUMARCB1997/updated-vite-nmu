/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Checkbox, Row, Table, Typography, Button, theme, List } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import {
  backupRestoreSelector,
  setRestoreFileIndex,
  requestDeleteFile
} from '../../../../features/backupRestoreSlice'
import { useDispatch, useSelector } from 'react-redux'

const FileList = () => {
  const ListItem = List.Item

  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { mode, isTaskRunning, isRestoreFisish, selectDevice, deviceStatus } =
    useSelector(backupRestoreSelector)
  // console.log(selectDevice)

  const handleFileCheckboxOnChange = (file) => () => {
    dispatch(setRestoreFileIndex({ file }))
  }
  const handleDeleteFileButtonOnClick = (file) => () => {
    dispatch(requestDeleteFile({ file }))
  }
  let files = []
  let restoreFile = ''
  const status = deviceStatus[selectDevice]
  if (selectDevice !== '') {
    files = [...status.files]
    ;({ restoreFile } = status)
  }
  console.log(files)

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
          <List
            size="small"
            split={false}
            itemLayout="horizontal"
            dataSource={files}
            renderItem={(file) => (
              <ListItem>
                {mode === 'restore' && (
                  <Checkbox
                    disabled={isTaskRunning || isRestoreFisish}
                    checked={restoreFile === file}
                    onChange={handleFileCheckboxOnChange(file)}
                  ></Checkbox>
                )}
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
              </ListItem>
            )}
            pagination={{
              type: 'bottom',
              align: 'center',
              showQuickJumper: true,
              size: 'small',
              total: files.length,
              defaultPageSize: 5,
              pageSizeOptions: [5, 10, 15, 20],
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }}
          />
        </div>
      </Card>
    </div>
  )
}

export default FileList
