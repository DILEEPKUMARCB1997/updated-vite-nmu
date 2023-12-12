import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom'
import Event from './Event'

describe('Event', () => {
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
        <Event />
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
        <Event />
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
        <Event />
      </Provider>
    )
    const table = screen.getByTestId('event-table')
    expect(table).toBeInTheDocument()
  })
})
