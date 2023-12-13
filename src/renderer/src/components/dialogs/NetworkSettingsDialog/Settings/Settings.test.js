import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import Settings from './Settings'

test('should render the form', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))

  render(
    <Provider store={store}>
      <Settings />
    </Provider>
  )
  const form = screen.getByTestId('networkSettingDeviceTable')
  fireEvent.click(form)
  expect(form).toBeInTheDocument()
})
