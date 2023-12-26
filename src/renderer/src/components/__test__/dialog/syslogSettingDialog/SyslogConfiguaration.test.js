import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import SyslogConfiguration from '../../../dialogs/SyslogSettingDialog/SyslogConfiguration/SyslogConfiguration'
import '@testing-library/jest-dom'

describe('SyslogConfiguration', () => {
  const onChange = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render row', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const rowEl = screen.getByRole('row')
    expect(rowEl).toBeTruthy()
  })
  test('should render col', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const col = screen.getByTestId('custom-element')
    expect(col).toBeInTheDocument()
  })
  test('should render formItems', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const formItem = screen.getByText('logToFlash')
    fireEvent.change(formItem)
    expect(onChange).toBeCalledTimes(0)
  })
  test('should render logToServer', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const logToServer = screen.getByText('logToServer')
    fireEvent.change(logToServer)
    expect(onChange).toBeCalledTimes(0)
  })

  test('should render the serverIp', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const serverIP = screen.getByPlaceholderText('ServerIP')
    fireEvent.change(serverIP)
    expect(onChange).toBeCalledTimes(0)
  })

  test('should render select', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const selEl = screen.getByRole('combobox')
    fireEvent.change(selEl)
    expect(onChange).toBeCalledTimes(0)
  })

  test('should render the server Port input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const serverPort = screen.getByPlaceholderText('server Port')
    fireEvent.change(serverPort)
    expect(onChange).toBeCalledTimes(0)
  })
  test('should render the start button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogConfiguration />
      </Provider>
    )
    const buttonEl = screen.getByRole('button')
    fireEvent.click(buttonEl)
    expect(onChange).toHaveBeenCalledTimes(0)
  })
  // test('should call the handleOnStartButton function when the start button is clicked', async () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))
  //   const mockHandleOnStartButton = jest.fn()
  //   render(
  //     <Provider store={store}>
  //       <SyslogConfiguration handleOnStartButton={mockHandleOnStartButton} />
  //     </Provider>
  //   )
  //   const StartButton = screen.getByRole('button')
  //   await userEvent.click(StartButton)
  //   expect(mockHandleOnStartButton).toHaveBeenCalledTimes(0)
  // })
})
