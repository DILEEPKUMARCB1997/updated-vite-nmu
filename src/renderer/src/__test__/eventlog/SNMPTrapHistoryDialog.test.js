import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom'
import TrapHistoryDialog from '../../components/dialogs/TrapHistoryDialog/TrapHistoryDialog'

describe('TrapHistoryDialog', () => {
  test('should render modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <TrapHistoryDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog', { name: 'Trap History' })
    expect(modal).toBeInTheDocument()
  })
  test('should render input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <TrapHistoryDialog />
      </Provider>
    )
    const input = screen.getByPlaceholderText('Source IP')
    expect(input).toBeInTheDocument()
  })

  test.skip('should render button', () => {
    const refreshButton = jest.fn()
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <TrapHistoryDialog handleRefreshButtonClick={refreshButton} />
      </Provider>
    )
    const button = screen.getByRole('button', { name: 'Refresh' })
    fireEvent.click(button)
    expect(refreshButton).toHaveBeenCalledTimes(0)
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
        <TrapHistoryDialog />
      </Provider>
    )
    const table = screen.findByRole('table')
    expect(table).toBeTruthy()
  })
})
