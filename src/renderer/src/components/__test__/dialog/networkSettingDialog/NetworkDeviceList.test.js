import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import DeviceList from '../../../dialogs/NetworkSettingsDialog/DeviceList/DeviceList'
import { store } from '../../../../app/store'

describe('testing Device list (NetworkSettingDialog)', () => {
  test('should render device list card', () => {
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
    const card = screen.getByTestId('networkSettingDeviceTable')
    expect(card).toBeInTheDocument()
  })
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
    const networkSettingDeviceTable = screen.getByRole('table')
    fireEvent.click(networkSettingDeviceTable)
    expect(networkSettingDeviceTable).toBeInTheDocument()
  })

  test('should render start address input field', () => {
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

    const startAddressInput = screen.getByTitle('Start Address')
    fireEvent.click(startAddressInput)
    expect(startAddressInput).toBeInTheDocument()
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
    const calculateButton = screen.getByTestId('calculateButton')
    fireEvent.click(calculateButton)
    expect(calculateButton).toBeInTheDocument()
    expect(calculateButton).toBeDisabled()
  })
})
