import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { userEvent } from '@testing-library/user-event'
import { store } from '../../../../app/store'
import DeviceList from './DeviceList'
import '@testing-library/jest-dom'

describe('should render Device list card in Backup and Restore Dialog', () => {
  test('should render start button', () => {
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
    const startButton = screen.getByTestId('button')
    userEvent.click(startButton)
    expect(startButton).toBeInTheDocument()
  })
  test('should render select component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const ModeSelectOnChange = jest.fn()
    render(
      <Provider store={store}>
        <DeviceList handleModeSelectOnChange={ModeSelectOnChange} />
      </Provider>
    )
    const select = screen.getByRole('combobox')
    // userEvent.selectOptions(select, ['backup', 'restore'])
    fireEvent.change(select)
    expect(select).toBeInTheDocument()
    expect(ModeSelectOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render table component', () => {
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
    const tableData = screen.getByTestId('table', {
      name: /model, MACAddress, IPAddress, status/i
    })
    expect(tableData).toBeInTheDocument()
  })
  test('should render Alert component', () => {
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
    const alertData = screen.getByRole('alert')
    expect(alertData).toBeInTheDocument()
  })
})
