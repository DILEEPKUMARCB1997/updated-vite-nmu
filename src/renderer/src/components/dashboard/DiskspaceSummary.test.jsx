import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import DiskSpaceSummary from './DiskSpaceSummary'
import { store } from '../../app/store'

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
      <DiskSpaceSummary />
    </Provider>
  )
  const element = screen.getByTestId('custom-element')
  expect(element).toBeInTheDocument()
})
