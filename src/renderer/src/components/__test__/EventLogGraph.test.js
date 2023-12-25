import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { store } from '../../app/store'
import userEvent from '@testing-library/user-event'
import EventLogGraph from '../dashboard/EventLogGraph'
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
    const handleGraphData = jest.fn()

    render(
      <Provider store={store}>
        <EventLogGraph />
      </Provider>
    )

    const refreshButton = await screen.findByRole('button', { name: 'Refresh' })
    userEvent.click(refreshButton)

    await waitFor(() => {
      expect(ipcRenderer.invoke).toHaveBeenCalled(0)
      expect(handleGraphData).toHaveBeenCalled(0)
    })
  })
})
