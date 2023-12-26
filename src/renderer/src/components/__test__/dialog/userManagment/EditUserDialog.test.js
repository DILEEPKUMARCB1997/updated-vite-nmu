import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import userEvent from '@testing-library/user-event'
import EditUserDialog from '../../../dialogs/userManagementDialogs/EditUserDialog'

describe('Edit User Dialog TestCases', () => {
  test('should render edit user dialog', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    )
    const editUserModal = screen.getByRole('dialog')
    expect(editUserModal).toBeInTheDocument()
  })
  test('should render Edit Button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    )
    const editButton = screen.getByRole('button', { name: 'Edit' })
    userEvent.click(editButton)
    expect(editButton).toBeInTheDocument()
  })

  test('should render Cancel Button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    )

    const cancelButton = screen.getByText(/cancel/i)
    userEvent.click(cancelButton)
    expect(cancelButton).toBeInTheDocument()
  })

  test('should render dropdown input field', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EditUserDialog />
      </Provider>
    )
    const dropdown = screen.getByRole('combobox')
    console.log('dropdown', dropdown)
    userEvent.selectOptions(dropdown, ['Admin', 'Supervisor', 'Operator'])
    expect(dropdown).toBeInTheDocument()
  })

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
        <EditUserDialog />
      </Provider>
    )
    const usernameInput = screen.getByRole('textbox', { name: 'Username' })
    expect(usernameInput).toBeInTheDocument()

    const newPasswordInput = screen.getByLabelText('New Password')
    expect(newPasswordInput).toBeInTheDocument()

    const oldPasswordInput = screen.getByLabelText('Old Password')
    expect(oldPasswordInput).toBeInTheDocument()
  })
})
