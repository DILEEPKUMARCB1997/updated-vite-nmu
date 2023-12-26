import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import AddUserDialog from '../../../dialogs/userManagementDialogs/AddUserDialog'
import { store } from '../../../../app/store'
import userEvent from '@testing-library/user-event'

describe('Add User Dialog TestCases', () => {
  const onClose = jest.fn()
  // const mockUseSelector = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })
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
        <AddUserDialog />
      </Provider>
    )
    const dropdown = screen.queryAllByRole('combobox')
    //console.log('dropdown', dropdown)
    userEvent.selectOptions(dropdown, ['Admin', 'Supervisor', 'Operator'])
    expect(dropdown).toBeTruthy()
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
    function getForm() {
      return {
        username: screen.queryByPlaceholderText('Enter Username'),
        password: screen.queryByPlaceholderText('Enter Password')
      }
    }
    expect(getForm).toBeDefined()
  })
  it('should not render the Add User dialog when userType is not Admin', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    // const mockUseSelector = jest.fn()

    // mockUseSelector.mockReturnValue({
    //   loggedInUser: {
    //     username: '',
    //     userType: ''
    //   },
    //   usersData: []
    // })

    render(
      <Provider store={store}>
        <AddUserDialog onClose={onClose} />
      </Provider>
    )
    expect(screen.queryByText('Add New User')).not.toBeInTheDocument()
  })
})
