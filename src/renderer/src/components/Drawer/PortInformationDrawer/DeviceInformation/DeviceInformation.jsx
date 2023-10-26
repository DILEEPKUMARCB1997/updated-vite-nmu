/* eslint-disable no-unused-vars */
import { Card, Typography, theme } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { portInformationSelector } from '../../../../features/portInformationSlice'
import { BulbFilled, BulbOutlined } from '@ant-design/icons'
import { validateLegacyAuthorizationArgs } from '@electron/notarize/lib/validate-args'

const DeviceInformation = () => {
  const { useToken } = theme
  const { token } = useToken()

  const state = useSelector(portInformationSelector)
  console.log('state', state)

  const { powerStatusData } = useSelector(portInformationSelector)
  console.log('power status data', powerStatusData)

  const infoItem = [
    { label: 'Model Name', id: 'model' },
    { label: 'IP Address', id: 'IPAddress' },
    { label: 'MAC Address', id: 'MACAddress' },
    { label: 'Kernel', id: 'kernel' },
    { label: 'AP', id: 'ap' },
    { label: 'Power', id: 'power' }
  ]

  return (
    <Card
      title="Device Information"
      size="small"
      bordered={false}
      style={{
        height: '450px',
        borderRadius: '4px',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.14), 0px 7px 10px -5px rgba(0, 0, 0, 0.4)'
      }}
      headStyle={{ backgroundColor: token.colorPrimaryBorder }}
    >
      {infoItem.map((item) => (
        <div key={item.id} style={{ textAlign: 'center' }}>
          <Typography.Title
            level={5}
            style={{
              backgroundColor: token.colorTextTertiary,
              color: 'white',
              marginBottom: '0px'
            }}
          >{`${item.label}`}</Typography.Title>
          {item.id === 'power' ? (
            <div>
              {Object.entries(state.powerStatusData).map(([power, status]) => (
                <div key={power}>
                  <Typography.Text style={{ fontSize: '15px' }} strong key={power}>
                    {`${power}`}
                    {'   '} {status === 1 ? <BulbOutlined /> : <BulbFilled />}
                    {' -  '}{' '}
                    {status === 1 ? (
                      <span style={{ color: 'green' }}>On</span>
                    ) : (
                      <span style={{ color: 'red' }}>Off</span>
                    )}
                  </Typography.Text>
                </div>
              ))}
            </div>
          ) : (
            <Typography.Text style={{ fontSize: '15px' }} strong>{`${
              state.modelInfo[item.id]
            }`}</Typography.Text>
          )}
        </div>
      ))}
    </Card>
  )
}

export default DeviceInformation
