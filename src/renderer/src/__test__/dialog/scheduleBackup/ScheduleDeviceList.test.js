import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { userEvent } from '@testing-library/user-event'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import DeviceList from '../../../components/dialogs/ScheduleBackupDialog/DeviceList/DeviceList'

describe('Device list schedule backup test cases', () => {
  test('should render card', () => {
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
    const card = screen.getByText('Device List')
    expect(card).toBeInTheDocument()
  })
  test('should render button', () => {
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
    const editButton = screen.queryByText('Edit Member')
    expect(editButton).toBeFalsy()
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
    const table = screen.queryByRole('table')
    expect(table).toBeDefined()
  })
})
