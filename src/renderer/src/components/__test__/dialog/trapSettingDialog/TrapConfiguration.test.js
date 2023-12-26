import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, jest, describe } from '@jest/globals'
import { store } from '../../../../app/store'
import TrapConfiguration from '../../../dialogs/TrapSettingDialog/TrapConfiguration/TrapConfiguration'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

describe('should render Trap Configuration', () => {
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
        <TrapConfiguration />
      </Provider>
    )
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
  })
  test('should render trapServerIP input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <TrapConfiguration />
      </Provider>
    )
    const ServerIP = screen.getByPlaceholderText('Trap Server IP')
    expect(ServerIP).toBeInTheDocument()
  })
  test('should render trapServerPort input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <TrapConfiguration />
      </Provider>
    )
    const ServerPort = screen.getByPlaceholderText('Trap Server Port')
    expect(ServerPort).toBeInTheDocument()
  })
  test('should render trapCommString ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <TrapConfiguration />
      </Provider>
    )
    const CommString = screen.getByPlaceholderText('Trap Comm String')
    expect(CommString).toBeInTheDocument()
  })
  test('should render start button ', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    const handleStartButton = jest.fn()
    render(
      <Provider store={store}>
        <TrapConfiguration handleOnStartButton={handleStartButton} />
      </Provider>
    )
    const startButton = screen.getByRole('button', { name: 'Start' })
    await userEvent.click(startButton)
    expect(handleStartButton).toHaveBeenCalledTimes(0)
  })
})
