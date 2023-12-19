import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import Authentication from './Authentication'
import '@testing-library/jest-dom'

describe('Authentication', () => {
  const onChange = jest.fn()
  test('should render divider', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const divEl = screen.getByText('General')
    expect(divEl).toBeInTheDocument()
  })
  test('should render form', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const User = screen.getByRole('form')
    expect(User).toBeInTheDocument()
  })

  test('should render userName', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const usernameNode = screen.getByPlaceholderText('username')
    fireEvent.change(usernameNode)
    expect(onChange).toHaveBeenCalledTimes(0)
  })
  test('should render password', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const passwordNode = screen.getByLabelText('Password')
    fireEvent.change(passwordNode)
    expect(onChange).toHaveBeenCalledTimes(0)
  })
  test('should render snmp', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const snmpEl = screen.getByText('SNMP')
    expect(snmpEl).toBeInTheDocument()
  })

  test('should render the SNMP Version select', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const snmpVersionSelect = screen.getByLabelText('SNMP Version')
    fireEvent.change(snmpVersionSelect)
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('should render the Read Community input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const readCommunityInput = screen.getByLabelText('Read Community')
    fireEvent.change(readCommunityInput)
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('should render the Write Community input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Authentication />
      </Provider>
    )
    const writeCommunityInput = screen.getByLabelText('Write Community')
    fireEvent.change(writeCommunityInput)
    expect(onChange).toHaveBeenCalledTimes(0)
  })
})
