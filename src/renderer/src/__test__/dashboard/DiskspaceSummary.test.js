import React from 'react'
import { Provider } from 'react-redux'
// import '@testing-library/jest-dom'
import DiskSpaceSummary from '../../components/dashboard/DiskSpaceSummary'
import { store } from '../../app/store'
// import { describe, it, expect } from 'vitest'
// import { mockElectron } from '../../../setupTests'
import { render } from '@testing-library/react'
import { getDiskUsesData } from '../../features/dashboardSlice'
// import { ipcRenderer } from 'electron'

jest.mock('react-apexcharts')

describe('DiskSpaceSummary', () => {
  it('should render DiskSpace', () => {
    const container = render(
      <Provider store={store}>
        <DiskSpaceSummary />
      </Provider>
    )
    expect(container).toBeTruthy()
  })

  it('Should handle getDiskUsesData correctly when successful', async () => {
    await store.dispatch(getDiskUsesData())
    const updatedState = store.getState().dashboard
    expect(updatedState.diskUses).not.to.equal({})
    // expect(updatedState.topologyData).not.to.equal('')
    // expect(updatedState.clientsData).not.to.equal('')
    // expect(updatedState.gData).not.to.equal('')
  })
})
// describe('Diskspace summary test cases', () => {
//   beforeAll(() => {
//     global.window.electron = mockElectron
//   })

//   test('should disk space summary', () => {
//     window.matchMedia = jest.fn().mockImplementation((query) => ({
//       matches: query !== '(min-width: 240px) and (max-width: 767px)',
//       media: '',
//       onchange: null,
//       addListener: jest.fn(),
//       removeListener: jest.fn()
//     }))

//     render(
//       <Provider store={store}>
//         <DiskSpaceSummary />
//       </Provider>
//     )
//     const diskSpaceSummary = screen.getByTestId('diskSpaceSummary')
//     fireEvent.click(diskSpaceSummary)
//     expect(diskSpaceSummary).toBeInTheDocument()
//   })
// })

//........................................................................

// describe.skip('DiskSpaceSummary', () => {
//   beforeEach(() => {
//     window.matchMedia = jest.fn().mockImplementation((query) => ({
//       matches: query !== '(min-width: 240px) and (max-width: 767px)',
//       media: '',
//       onchange: null,
//       addListener: jest.fn(),
//       removeListener: jest.fn()
//     }))

//     render(
//       <Provider store={store}>
//         <DiskSpaceSummary />
//       </Provider>
//     )
//     const diskSpaceSummary = screen.getByTestId('diskSpaceSummary')
//     fireEvent.click(diskSpaceSummary)
//     expect(diskSpaceSummary).toBeInTheDocument()
//     render(
//       <Provider store={store}>
//         <DiskSpaceSummary />
//       </Provider>
//     )
//   })

//   test('renders diskSpace page', async () => {
//     const ipcRendererMock = {
//       on: jest.fn(),
//       send: jest.fn()
//     }

//     ipcRenderer.mockImplementation(() => ipcRendererMock)
//     window.matchMedia = jest.fn().mockImplementation((query) => ({
//       matches: query !== '(min-width: 240px) and (max-width: 767px)',
//       media: '',
//       onchange: null,
//       addListener: jest.fn(),
//       removeListener: jest.fn()
//     }))

//     await waitFor(() => {
//       const diskSpaceSummary = screen.getByTestId('diskSpaceSummary')
//       expect(diskSpaceSummary).toBeInTheDocument()
//     })
//   })
// })
