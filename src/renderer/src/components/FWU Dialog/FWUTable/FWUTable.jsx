import { Table, Divider, Tag } from 'antd'

const { Column } = Table

const data = [
  {
    key: '1',
    name: 'virat',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'yasu',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'jhon',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
function FWUTable() {
  return (
    <Table dataSource={data}>
      <Column title="Model" dataIndex="name" key="name" />
      <Column title="IP Address" dataIndex="age" key="age" />
      <Column title="MAC Address" dataIndex="address" key="address" />
      <Column
        title="Progress"
        dataIndex="tags"
        key="tags"
        render={(tags) => (
          <span>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        )}
      />
      <Column
        title="Status"
        key="action"
        render={(text, record) => (
          <span>
            <a>Invite {record.lastName}</a>
            <Divider type="vertical" />
            <a>Delete</a>
          </span>
        )}
      />
    </Table>
  )
}
export default FWUTable
