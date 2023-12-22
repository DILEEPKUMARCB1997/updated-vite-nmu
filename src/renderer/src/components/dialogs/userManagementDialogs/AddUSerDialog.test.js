import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import AddUserDialog from './AddUserDialog'
import { store } from '../../../app/store'
import userEvent from '@testing-library/user-event'

describe('Add User Dialog TestCases', () => {
  test('should render add user dialog', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <AddUserDialog />
      </Provider>
    )
    const addUserModal = screen.getByRole('dialog')
    expect(addUserModal).toBeInTheDocument()
  })
  test('should render OK Button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <AddUserDialog />
      </Provider>
    )
    const okButton = screen.getByText(/ok/i)
    userEvent.click(okButton)
    expect(okButton).toBeInTheDocument()
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
        <AddUserDialog />
      </Provider>
    )

    const cancelButton = screen.getByText(/cancel/i)
    userEvent.click(cancelButton)
    expect(cancelButton).toBeInTheDocument()
  })

  test('should render dropdown input field', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <AddUserDialog />
      </Provider>
    )
    const dropdown = await screen.getByRole('combobox')
    console.log('dropdown', dropdown)
    userEvent.selectOptions(dropdown, ['Admin', 'Supervisor', 'Operator'])
    expect(dropdown).toBeInTheDocument()
  })

  test('should render username input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <AddUserDialog />
      </Provider>
    )
    const usernameInput = screen.getByPlaceholderText('Enter Username')
    expect(usernameInput).toBeInTheDocument()
  })
})
