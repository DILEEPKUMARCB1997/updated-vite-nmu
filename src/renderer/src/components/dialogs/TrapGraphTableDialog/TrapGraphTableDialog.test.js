import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import TrapGraphTableDialog from './TrapGraphTableDialog'

describe('TrapGraphTableDialog', () => {
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
        <TrapGraphTableDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
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
        <TrapGraphTableDialog />
      </Provider>
    )
  })
  const table = screen.findByRole('table', { hidden: true })
  expect(table).toBeTruthy()
})
