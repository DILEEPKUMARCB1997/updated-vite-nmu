import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import SyslogGraphTableDialog from './SyslogGraphTableDialog'
import '@testing-library/jest-dom'

describe('SyslogGraphTableDialog', () => {
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
        <SyslogGraphTableDialog />
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
        <SyslogGraphTableDialog />
      </Provider>
    )
  })
  const table = screen.findByRole('table', { hidden: true })
  expect(table).toBeTruthy()
})
