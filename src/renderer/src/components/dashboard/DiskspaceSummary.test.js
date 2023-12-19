import React from 'react'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'
import DiskSpaceSummary from './DiskSpaceSummary'
import { store } from '../../app/store'
import { render, screen, waitFor } from '@testing-library/react'
import { ipcRenderer } from 'electron'

describe.skip('DiskSpaceSummary', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <DiskSpaceSummary />
      </Provider>
    )
  })

  test('renders diskSpace page', async () => {
    const ipcRendererMock = {
      on: jest.fn(),
      send: jest.fn()
    }

    ipcRenderer.mockImplementation(() => ipcRendererMock)
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    await waitFor(() => {
      const diskSpaceSummary = screen.getByTestId('diskSpaceSummary')
      expect(diskSpaceSummary).toBeInTheDocument()
    })
  })
})

// test('should disk space summary', () => {
//   window.matchMedia = jest.fn().mockImplementation((query) => ({
//     matches: query !== '(min-width: 240px) and (max-width: 767px)',
//     media: '',
//     onchange: null,
//     addListener: jest.fn(),
//     removeListener: jest.fn()
//   }))

//   render(
//     <Provider store={store}>
//       <DiskSpaceSummary />
//     </Provider>
//   )
//   const diskSpaceSummary = screen.getByTestId('diskSpaceSummary')
//   fireEvent.click(diskSpaceSummary)
//   expect(diskSpaceSummary).toBeInTheDocument()
// })
