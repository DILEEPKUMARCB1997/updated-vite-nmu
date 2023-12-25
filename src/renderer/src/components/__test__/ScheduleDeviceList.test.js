import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { userEvent } from '@testing-library/user-event'
import { store } from '../../app/store'
import '@testing-library/jest-dom'
import DeviceList from '../dialogs/ScheduleBackupDialog/DeviceList/DeviceList'

describe('Device list schedule backup test cases', () => {
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
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
  })
})
