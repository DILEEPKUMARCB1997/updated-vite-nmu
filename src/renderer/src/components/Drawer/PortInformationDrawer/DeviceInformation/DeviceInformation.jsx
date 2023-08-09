/* eslint-disable no-unused-vars */
import { Card, Typography, theme } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { portInformationSelector } from '../../../../features/portInformationSlice'

const DeviceInformation = () => {
  const { useToken } = theme
  const { token } = useToken()

  const state = useSelector(portInformationSelector)
  console.log(state)

  // const modelInfo = {
  //   model: 1,
  //   IPAddress: 12345,
  //   MACAddress: 123,
  //   kernel: 'Dileep',
  //   ap: 123,
  //   power: 'power'
  // }

  const { powerStatusData } = useSelector(portInformationSelector)
  // const { model, IPAddress, MACAddress, kernel, ap } = modelInfo
  const { power } = powerStatusData

  const infoItem = [
    { label: 'Model Name', id: 'model' },
    { label: 'IP Address', id: 'IPAddress' },
    { label: 'MAC Address', id: 'MACAddress' },
    { label: 'Kernel', id: 'kernel' },
    { label: 'AP', id: 'ap' },
    { label: 'Power', id: 'power' }
  ]

  infoItem.map((item) => console.log(state.modelInfo[item.id]))

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
              {Object.entries(state.modelInfo).map(([status]) => (
                <div key={power}>
                  <Typography key={power}>{`${power}`}</Typography>
                  {status === 1 ? 'Flash On' : 'Flash Off'}
                </div>
              ))}
            </div>
          ) : (
            <Typography>{`${state.modelInfo[item.id]}`}</Typography>
          )}
        </div>
      ))}
    </Card>
  )
}

export default DeviceInformation
