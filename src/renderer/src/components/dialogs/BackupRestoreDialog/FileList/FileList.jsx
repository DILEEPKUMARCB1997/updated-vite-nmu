/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Checkbox, Row, Table, Typography, Button, theme, List, ConfigProvider } from 'antd'

import { CloseOutlined, StarOutlined } from '@ant-design/icons'
import {
  backupRestoreSelector,
  setRestoreFileIndex,
  requestDeleteFile
} from '../../../../features/backupRestoreSlice'
import { useDispatch, useSelector } from 'react-redux'

const FileList = () => {
  const ListItem = List.Item
  const ListItemMeta = List.Item.Meta
  let files = []
  let restoreFile = ''
  const { useToken } = theme
  const { token } = useToken()
  const dispatch = useDispatch()
  const { mode, isTaskRunning, isRestoreFisish, deviceStatus, selectDevice } =
    useSelector(backupRestoreSelector)

  const status = deviceStatus[selectDevice]
  // console.log('status', status)
  if (selectDevice !== '') {
    files = [...status.files]
    ;({ restoreFile } = status)
  }
  // console.log(files, 'files')

  const handleFileCheckboxOnChange = (file) => () => {
    dispatch(setRestoreFileIndex({ file }))
  }
  const handleDeleteFileButtonOnClick = (file) => () => {
    dispatch(requestDeleteFile({ file }))
  }

  return (
    <Card
      title="Files"
      size="small"
      bordered={false}
      style={{
        height: '450px',
        overflow: 'auto',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      <List
        size="small"
        split={false}
        itemLayout="horizontal"
        dataSource={files}
        renderItem={(item) => (
          // console.log('item', item),
          <ListItem
            actions={[
              mode === 'backup' && (
                <Button
                  size="small"
                  disabled={isTaskRunning}
                  style={{ color: 'red' }}
                  icon={<CloseOutlined></CloseOutlined>}
                  onClick={handleDeleteFileButtonOnClick(item)}
                />
              )
            ]}
          >
            <ListItemMeta
              title={item}
              style={{ marginBottom: '0px' }}
              avatar={
                mode === 'restore' && (
                  <Checkbox
                    disabled={isTaskRunning || isRestoreFisish}
                    checked={restoreFile === item}
                    onChange={handleFileCheckboxOnChange(item)}
                  />
                )
              }
            />
          </ListItem>
        )}
        pagination={{
          type: 'bottom',
          align: 'center',
          showQuickJumper: false,
          size: 'small',
          total: files.length,
          defaultPageSize: 8,
          pageSizeOptions: [5, 10, 15, 20],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
      />
    </Card>
  )
}

export default FileList
