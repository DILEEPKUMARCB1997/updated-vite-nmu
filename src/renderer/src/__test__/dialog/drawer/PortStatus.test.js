import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import PortStatus from '../../../components/Drawer/PortInformationDrawer/PortStatus/PortStatus'
import '@testing-library/jest-dom'

describe('PortStatus', () => {
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
        <PortStatus />
      </Provider>
    )
    const cardEl = screen.getByRole('card')
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
        <PortStatus />
      </Provider>
    )
    const tableEl = screen.findByRole('table')
    expect(tableEl).toBeTruthy()
  })
})
