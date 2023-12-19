import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MailService from './MailService'
import { store } from '../../../../../app/store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('MailService', () => {
  test('should render divider ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <MailService />
      </Provider>
    )
    const divider = screen.getByTestId('divider')
    expect(divider).toBeInTheDocument()
  })
  test('should render Switch component ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SwitchOnchange = jest.fn()
    render(
      <Provider store={store}>
        <MailService handleMailOpenSwitchOnChange={SwitchOnchange} />
      </Provider>
    )
    const switchData = screen.getByRole('switch')
    fireEvent.click(switchData)
    expect(switchData).toBeChecked() // to check that an element is enabled
    expect(SwitchOnchange).toHaveBeenCalledTimes(0)
  })
  test('should render span ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <MailService />
      </Provider>
    )
    const span = screen.getByLabelText('switchLabel')
    expect(span).toBeInTheDocument()
  })
  test('should render radio button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const RadioOnChange = jest.fn()
    render(
      <Provider store={store}>
        <MailService handleServiceListRadioOnChange={RadioOnChange} />
      </Provider>
    )
    const radioButton = screen.getByTestId('serviceList')
    fireEvent.click(radioButton)
    expect(radioButton).toBeChecked()
    expect(RadioOnChange).toHaveBeenCalledTimes(0)
  })

  test('should render selectOption', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const ServiceSelectOnChange = jest.fn()
    render(
      <Provider store={store}>
        <MailService handleServiceSelectOnChange={ServiceSelectOnChange} />
      </Provider>
    )
    const serviceSelect = screen.getByRole('combobox')
    userEvent.selectOptions(serviceSelect, ['serviceItem'])
    expect(ServiceSelectOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render userDefinitionRadioButton', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const userDefinitionRadioOnChange = jest.fn()
    render(
      <Provider store={store}>
        <MailService handleUserDefinitionRadioOnChange={userDefinitionRadioOnChange} />
      </Provider>
    )
    const userDefinitionButton = screen.getByTestId('userDefinition')
    fireEvent.click(userDefinitionButton)
    expect(userDefinitionButton).toBeChecked()
    expect(userDefinitionRadioOnChange).toHaveBeenCalledTimes(0)
  })
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
        <MailService />
      </Provider>
    )
    const formData = screen.findByRole('form')
    expect(formData).toBeTruthy()
  })
  test('should render Host Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const hostInputOnchange = jest.fn()
    render(
      <Provider store={store}>
        <MailService handleHostInputOnChange={hostInputOnchange} />
      </Provider>
    )
    const host = screen.getByTestId('hostInput')
    userEvent.type(host)
    expect(hostInputOnchange).toHaveBeenCalledTimes(0)
  })
  test('should render Port Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const portInputOnchange = jest.fn()
    render(
      <Provider store={store}>
        <MailService handlePortInputOnChange={portInputOnchange} />
      </Provider>
    )
    const port = screen.getByTestId('portInput')
    userEvent.type(port)
    expect(portInputOnchange).toHaveBeenCalledTimes(0)
  })
})
