import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import DeviceList from './DeviceList'

test('should render table in device list card of network setting dialog', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))

  render(
    <Provider store={store}>
      <DeviceList />
    </Provider>
  )
  const networkSettingDeviceTable = screen.getByTestId('networkSettingDeviceTable')
  fireEvent.click(networkSettingDeviceTable)
  expect(networkSettingDeviceTable).toBeInTheDocument()
})

test('should render calculate button', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))

  render(
    <Provider store={store}>
      <DeviceList />
    </Provider>
  )
  const calculateButton = screen.getByRole('button')
  fireEvent.click(calculateButton)
  expect(calculateButton).toBeInTheDocument()
})
