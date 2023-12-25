import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import SNMP from './SNMP'

describe('SNMP', () => {
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
        <SNMP />
      </Provider>
    )
    const element = screen.getByTestId('div')
    expect(element).toBeInTheDocument()
  })
})
