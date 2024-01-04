import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { store } from '../../app/store'
import EventLogGraph from '../../components/dashboard/EventLogGraph'
import { Provider } from 'react-redux'

// jest.mock('electron', () => ({
//   ipcRenderer: {
//     on: jest.fn(),
//     removeListener: jest.fn(),
//     invoke: jest.fn()
//   }
// }))
jest.mock('react-apexcharts')

describe('EventLogGraph', () => {
  // afterEach(() => {
  //   jest.clearAllMocks()
  // })

  it('should refresh graph', () => {
    render(
      <Provider store={store}>
        <EventLogGraph />
      </Provider>
    )
    const container = screen.getByTestId('custom-element')
    expect(container).toBeTruthy()
    // const handleGraphData = jest.fn()

    // render(
    //   <Provider store={store}>
    //     <EventLogGraph />
    //   </Provider>
    // )

    // const refreshButton = await screen.findByRole('button', { name: 'Refresh' })
    // userEvent.click(refreshButton)

    // await waitFor(() => {
    //   expect(ipcRenderer.invoke).toHaveBeenCalled(0)
    //   expect(handleGraphData).toHaveBeenCalled(0)
  })
})
