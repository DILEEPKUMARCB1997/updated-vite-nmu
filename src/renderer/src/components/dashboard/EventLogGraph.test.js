import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { store } from '../../app/store'
import userEvent from '@testing-library/user-event'
import EventLogGraph from './EventLogGraph'
import { ipcRenderer } from 'electron'
import { Provider } from 'react-redux'

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    removeListener: jest.fn(),
    invoke: jest.fn()
  }
}))

describe.skip('EventLogGraph', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should refresh graph', async () => {
    // const data = {
    //   label: ['1', '2', '3'],
    //   InformationData: [1, 2, 3],
    //   WarningData: [1, 2, 3],
    //   CriticalData: [1, 2, 3],
    //   lastUpdated: '10/10/2022'
    // }

    const handleGraphData = jest.fn()

    // ipcRenderer.invoke.mockResolvedValue(data)

    render(
      <Provider store={store}>
        <EventLogGraph />
      </Provider>
    )

    const refreshButton = await screen.findByRole('button', { name: 'Refresh' })

    userEvent.click(refreshButton)

    await waitFor(() => {
      expect(ipcRenderer.invoke).toHaveBeenCalled()
      expect(handleGraphData).toHaveBeenCalled()
    })
  })
})
