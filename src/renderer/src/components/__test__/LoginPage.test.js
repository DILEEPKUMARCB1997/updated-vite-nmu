import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../app/store'
import LoginPage from '../../pages/LoginPage'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { userEvent } from '@testing-library/user-event'

describe('test the login page', () => {
  test('should render username in the login page', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    const username = screen.getByPlaceholderText('Username')
    userEvent.type(username, 'admin@123')
    expect(username.value).not.toMatch('admin')
  })

  test('should render password in the login page', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    const password = screen.getByPlaceholderText('Password')
    expect(password).toHaveAttribute('type', 'password')
  })
  test('should render signin button in the login page', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    )
    const button = screen.getByTestId('signin')
    const username = screen.getByPlaceholderText('Username')
    const password = screen.getByPlaceholderText('Password')
    userEvent.type(username, 'admin')
    userEvent.type(password, 'admin123')
    userEvent.click(button)

    expect(button).toBeInTheDocument()
  })
})
