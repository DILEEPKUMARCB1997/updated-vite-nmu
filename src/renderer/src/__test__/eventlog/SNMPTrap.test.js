import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom'
import SNMPTrap from '../../components/eventlog/SNMPTrap'

describe('SNMPTrap', () => {
  test('renders the history button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPTrap />
      </Provider>
    )
    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })
  test('should render alert ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPTrap />
      </Provider>
    )
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
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
        <SNMPTrap />
      </Provider>
    )
    const table = screen.getByTestId('SNMPTrap-table')
    expect(table).toBeInTheDocument()
  })
})
