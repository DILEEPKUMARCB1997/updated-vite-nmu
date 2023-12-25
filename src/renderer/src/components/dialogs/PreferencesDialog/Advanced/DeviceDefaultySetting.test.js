import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DeviceDefaultSetting from './DeviceDefaultSetting'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import userEvent from '@testing-library/user-event'

describe('DeviceDefaultSetting', () => {
  test('should render Divider component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <DeviceDefaultSetting />
      </Provider>
    )
    const divider = screen.getByText('Device Default Setting')
    expect(divider).toBeInTheDocument()
  })
  test('should render Default Username', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const DefaultUsernameValid = jest.fn()
    render(
      <Provider store={store}>
        <DeviceDefaultSetting handleDefaultUsernameInputOnChange={DefaultUsernameValid} />
      </Provider>
    )

    const username = screen.getByPlaceholderText('Default Username')
    fireEvent.change(username)
    expect(DefaultUsernameValid).toHaveBeenCalledTimes(0)
  })
  test('should render Default Password', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const DefaultPasswordValid = jest.fn()
    render(
      <Provider store={store}>
        <DeviceDefaultSetting handleDefaultPasswordInputOnChange={DefaultPasswordValid} />
      </Provider>
    )

    const defaultPassword = screen.getByPlaceholderText('Default Password')
    fireEvent.change(defaultPassword)
    expect(DefaultPasswordValid).toHaveBeenCalledTimes(0)
  })
})
