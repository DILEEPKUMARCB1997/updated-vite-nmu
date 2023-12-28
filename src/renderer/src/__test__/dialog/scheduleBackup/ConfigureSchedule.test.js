import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { store } from '../../../app/store'
import ConfigureSchedule from '../../../components/dialogs/ScheduleBackupDialog/ConfigureSchedule/ConfigureSchedule'

describe('Configure Schedule Test cases', () => {
  test('should render Create Backup Schedule card', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigureSchedule />
      </Provider>
    )
    const editUserModal = screen.getByTestId('configureSchedule')
    expect(editUserModal).toBeInTheDocument()
  })
  test('should render cancel button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigureSchedule />
      </Provider>
    )
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    userEvent.click(cancelButton)
    expect(cancelButton).toBeInTheDocument()
  })
  test('should render Create Schedule button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigureSchedule />
      </Provider>
    )
    const createScheduleButton = screen.getByRole('button', { name: 'Create Schedule' })
    userEvent.click(createScheduleButton)
    expect(createScheduleButton).toBeInTheDocument()
  })

  // test('should render Cancel Button', () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))

  //   render(
  //     <Provider store={store}>
  //       <EditUserDialog />
  //     </Provider>
  //   )

  //   const cancelButton = screen.getByText(/cancel/i)
  //   userEvent.click(cancelButton)
  //   expect(cancelButton).toBeInTheDocument()
  // })

  // test('should render dropdown input field', () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))

  //   render(
  //     <Provider store={store}>
  //       <EditUserDialog />
  //     </Provider>
  //   )
  //   const dropdown = screen.getByRole('combobox')
  //   console.log('dropdown', dropdown)
  //   userEvent.selectOptions(dropdown, ['Admin', 'Supervisor', 'Operator'])
  //   expect(dropdown).toBeInTheDocument()
  // })

  test('should render all input fields', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigureSchedule />
      </Provider>
    )
    const scheduleNameInput = screen.getByText('Schedule Name')
    expect(scheduleNameInput).toBeInTheDocument()

    const frequencyInput = screen.getByText('Frequency')
    expect(frequencyInput).toBeInTheDocument()

    const frequencyDropdown = screen.getByRole('combobox')
    expect(frequencyDropdown).toBeInTheDocument()
  })
})
