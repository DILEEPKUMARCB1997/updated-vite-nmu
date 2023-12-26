import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import FWUTable from '../../../FWU Dialog/FWUTable/FWUTable'
import '@testing-library/jest-dom'

describe('FWUTable', () => {
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
        <FWUTable />
      </Provider>
    )
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
  })
  test('should render div tag', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <FWUTable />
      </Provider>
    )
    const divTag = screen.getByTestId('custom-element')
    expect(divTag).toBeInTheDocument()
  })
})
