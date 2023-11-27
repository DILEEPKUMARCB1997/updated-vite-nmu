import { Card, Divider, List, Table, theme } from 'antd'
import { StarOutlined } from '@ant-design/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { scheduleBackupSelector } from '../../../../features/scheduleBackupSlice'

const FileList = () => {
  const ListItem = List.Item
  const ListItemMeta = List.Item.Meta
  const { files } = useSelector(scheduleBackupSelector)
  // console.log(files)
  const { useToken } = theme
  const { token } = useToken()

  return (
    <Card
      title="Files"
      size="small"
      bordered={false}
      style={{
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
          // console.log(item.toString())
          <ListItem>
            <ListItemMeta title={item} avatar={<StarOutlined />} style={{ marginBottom: '0px' }} />
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
    </Card>
  )
}

export default FileList
