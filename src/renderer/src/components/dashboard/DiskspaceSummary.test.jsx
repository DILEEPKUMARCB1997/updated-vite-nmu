import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, jest } from '@jest/globals'
import DeviceSummary from './DeviceSummary'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom/extend-expect'

// test('should render div tag', async () => {
//   render(
//     <Provider store={store}>
//       <DiskSpaceSummary />
//     </Provider>
//   )

//   const divRender = await screen.getByTestId('graph')
//   expect(divRender).toBeInTheDocument()
// })
test('should render div tag', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))

  render(
    <Provider store={store}>
      <DeviceSummary />
    </Provider>
  )
  const element = screen.getByTestId('custom-element')
  expect(element).toBeInTheDocument()
})
