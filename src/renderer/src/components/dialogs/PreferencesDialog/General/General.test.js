import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import General from './General'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

describe('General', () => {
  test('should render the divider ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <General />
      </Provider>
    )
    const divider = screen.getByText('Network Interface Card')
    expect(divider).toBeInTheDocument()
  })
  test('should render the select ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SelectOnChange = jest.fn()
    render(
      <Provider store={store}>
        <General handleNICSelectOnChange={SelectOnChange} />
      </Provider>
    )
    const element = screen.getByRole('combobox')
    userEvent.selectOptions(element, ['index'])
    expect(SelectOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render the divider2 ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <General />
      </Provider>
    )
    const divider2 = screen.getByTestId('divider')
    expect(divider2).toBeInTheDocument()
  })
})
