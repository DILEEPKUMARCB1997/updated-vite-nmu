import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import TelegramForm from '../../../dialogs/PreferencesDialog/Telegram/Components/TelegramForm'

describe('TelegramForm', () => {
  test('should render Form', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <TelegramForm />
      </Provider>
    )
    const formElement = screen.getByTestId('form')
    expect(formElement).toBeInTheDocument()
  })
  test('should render TelegramID input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const setTelegramData = jest.fn()
    render(
      <Provider store={store}>
        <TelegramForm setData={setTelegramData} />
      </Provider>
    )
    const inputNumber = screen.getByLabelText('Telegram Id')
    fireEvent.change(inputNumber, { target: { value: '' } })
    // expect(inputNumber).toHaveAttribute('name', 'telegramId')
    expect(setTelegramData).toHaveBeenCalledTimes(0)
  })
  test('should render Telegram Name input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const setTelegramName = jest.fn()
    render(
      <Provider store={store}>
        <TelegramForm setData={setTelegramName} />
      </Provider>
    )
    const nameInput = screen.getByLabelText('Telegram Name')
    fireEvent.change(nameInput, { target: { value: '' } })
    expect(setTelegramName).toHaveBeenCalledTimes(0)
  })
  test('should render Telegram Type select', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <TelegramForm />
      </Provider>
    )
    const telegramType = screen.getByRole('combobox')
    expect(telegramType).toBeInTheDocument()
  })
})
