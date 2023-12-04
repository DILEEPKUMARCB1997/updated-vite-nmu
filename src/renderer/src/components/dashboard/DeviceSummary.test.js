import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import DeviceSummary from './DeviceSummary'

describe('DeviceSummary', () => {
  it('should render the online summary card with the correct count', () => {
    const groupDeviceArrayData = {
      unGrouped: [
        { id: 1, online: true },
        { id: 2, online: false }
      ],
      group1: [
        { id: 3, online: true },
        { id: 4, online: false }
      ]
    }
    const store = mockStore({ groupDeviceArrayData })
    render(
      <Provider store={store}>
        <DeviceSummary />
      </Provider>
    )
    const onlineSummaryCard = screen.getByText('Online')
    expect(onlineSummaryCard).toBeInTheDocument()
    expect(onlineSummaryCard).toHaveTextContent('2')
  })

  it('should render the offline summary card with the correct count', () => {
    const groupDeviceArrayData = {
      unGrouped: [
        { id: 1, online: true },
        { id: 2, online: false }
      ],
      group1: [
        { id: 3, online: true },
        { id: 4, online: false }
      ]
    }
    const store = mockStore({ groupDeviceArrayData })
    render(
      <Provider store={store}>
        <DeviceSummary />
      </Provider>
    )
    const offlineSummaryCard = screen.getByText('Offline')
    expect(offlineSummaryCard).toBeInTheDocument()
    expect(offlineSummaryCard).toHaveTextContent('2')
  })
})
