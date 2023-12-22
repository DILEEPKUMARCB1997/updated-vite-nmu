import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import UserManagement from './UserManagementPage'
import { store } from '../app/store'
import { mockElectron } from '../../setupTests'

describe('UserManagementPage TestCases', () => {
  beforeAll(() => {
    global.window.electron = mockElectron
  })
  test('should render user list card', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    )
    const userCard = screen.getByTestId('user-card')
    expect(userCard).toBeInTheDocument()
  })

  test('should render user list table', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    )
    const userTable = screen.getByRole('table')
    expect(userTable).toBeInTheDocument()
  })
  test('rendering buttons', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <UserManagement />
      </Provider>
    )
    const addButton = screen.getByRole('button')
    expect(addButton).toBeInTheDocument()
  })
})
