import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom'
import EventGraphTableDialog from '../dialogs/EventGraphTableDialog/EventGraphTableDialog'

describe('EventGraphTableDialog', () => {
  test('should render modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    })

    render(
      <Provider store={store}>
        <EventGraphTableDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })
  test('should render table', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    })

    render(
      <Provider store={store}>
        <EventGraphTableDialog />
      </Provider>
    )
  })
  const table = screen.findByRole('table', { hidden: true })
  expect(table).toBeTruthy()
})
