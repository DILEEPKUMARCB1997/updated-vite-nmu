import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import DeviceList from '../../../dialogs/SyslogSettingDialog/DeviceList/DeviceList'
import '@testing-library/jest-dom'

describe('DeviceList', () => {
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
        <DeviceList />
      </Provider>
    )
    const cardEl = screen.getByTestId('custom-element')
    expect(cardEl).toBeInTheDocument()
  })
  test('should render table', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <DeviceList />
      </Provider>
    )
    const tableEl = screen.getByRole('table')
    expect(tableEl).toBeInTheDocument()
  })
})
