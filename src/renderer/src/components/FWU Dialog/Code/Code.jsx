/*
import React from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { firmwareSelector } from '../../../features/firmwareUpdate'
const codes = {
  none: { type: 'normal', label: 'Waiting' },
  a: { type: 'normal', label: 'Upload Image' },
  c: { type: 'normal', label: 'User Cancel' },
  S001: { type: 'normal', label: 'Erasing' },
  S002: { type: 'success', label: 'Update Successful' },
  E001: { type: 'error', label: 'Upload Fail(E001)' },
  E007: { type: 'error', label: 'Upload Fail(E007)' },
  TO: { type: 'error', label: 'Connect Timeout' }
}

const Code = () => {
  const { deviceRealTimeData } = useSelector(firmwareSelector)
  const { code } = deviceRealTimeData
  const code1 =
    codes.S002.type[code] === 'success'
      ? 'green'
      : codes.E001.type[code] === 'error'
      ? 'red'
      : codes.none.label[code] === 'normal'
      ? 'null'
      : 'blue'

  return (
    <div>
      <span>
        <span style={{ color: code1 }}>{codes.none.label}</span>
      </span>
    </div>
  )
}

export default Code
*/
import React from 'react'
// import classNames from 'classnames'
// import PropTypes from 'prop-types'
import { Table } from 'antd'
// import styles from './Code.scss'
import { useSelector } from 'react-redux'
import { firmwareSelector } from '../../../features/firmwareUpdate'

const codes = {
  none: { type: 'normal', label: 'Waiting' },
  a: { type: 'normal', label: 'Upload Image' },
  c: { type: 'normal', label: 'User Cancel' },
  S001: { type: 'normal', label: 'Erasing' },
  S002: { type: 'success', label: 'Update Successful' },
  E001: { type: 'error', label: 'Upload Fail(E001)' },
  E007: { type: 'error', label: 'Upload Fail(E007)' },
  TO: { type: 'error', label: 'Connect Timeout' }
}

const Code = () => {
  const { deviceRealTimeData } = useSelector(firmwareSelector)
  const { code } = deviceRealTimeData
  const code1 = codes[code]
  return (
    <span color={codes.type === 'success' ? 'green' : codes.type === 'error' ? 'red' : 'blue'}>
      {codes.label}
    </span>
  )
  // const codeObj = codes[code]
  // const className = classNames(styles.codeText, styles[codeObj.type])
  // return <h6 className={className}>{codeObj.label}</h6>
}
const codeStatus = Object.entries(codes).map((type, label) => <div key={type}>{label}</div>)
const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <Code code={text} />
  }
]

const App = () => {
  return <Table columns={columns} dataSource={codeStatus} />
}

export default App
