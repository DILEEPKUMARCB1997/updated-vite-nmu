import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MailSetting from '../dialogs/PreferencesDialog/Mail/MailSetting/MailSetting'
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('MailSetting', () => {
  test('should render divider component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <MailSetting />
      </Provider>
    )
    const divider = screen.getByText('Mail Settings')
    expect(divider).toBeInTheDocument()
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
        <MailSetting />
      </Provider>
    )
    const form = screen.findByRole('form')
    expect(form).toBeTruthy()
  })
  test('should render username input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const UsernameInputOnChange = jest.fn()
    render(
      <Provider store={store}>
        <MailSetting handleUsernameInputOnChange={UsernameInputOnChange} />
      </Provider>
    )
    const input = screen.getByTestId('userInput')
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'new username' } })
    expect(UsernameInputOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render password input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const PasswordInputOnChange = jest.fn()
    const ShowPasswordOnClick = jest.fn()
    render(
      <Provider store={store}>
        <MailSetting
          handlePasswordInputOnChange={PasswordInputOnChange}
          handleShowPasswordOnClick={ShowPasswordOnClick}
        />
      </Provider>
    )
    const inputPassword = screen.getByTestId('inputPassword')
    fireEvent.change(inputPassword)
    expect(inputPassword).toHaveAttribute('type', 'password')

    const InvisibleIcon = screen.getByTestId('eyeInvisible')
    fireEvent.click(InvisibleIcon)
    expect(InvisibleIcon).toBeTruthy()

    const visibleIcon = screen.getByTestId('eyeVisible')
    fireEvent.click(visibleIcon)
    expect(visibleIcon).toBeTruthy()
    expect(ShowPasswordOnClick).toHaveBeenCalledTimes(0)

    expect(PasswordInputOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render RemoveTagButton ', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const RemoveTagButton = jest.fn()
    render(
      <Provider store={store}>
        <MailSetting handleRemoveTagButtonOnClick={RemoveTagButton} />
      </Provider>
    )
    const tag = screen.findByTestId('removeTag')
    await expect(tag).toBeTruthy()
    expect(RemoveTagButton).toHaveBeenCalledTimes(0)
  })
})
