import { render, screen, fireEvent } from '@testing-library/react'
import OpenFile from '../../../FWU Dialog/OpenFile/OpenFile'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import '@testing-library/jest-dom'

describe('OpenFile', () => {
  test('should render div tag', () => {
    render(
      <Provider store={store}>
        <OpenFile />
      </Provider>
    )
    const divTag = screen.getByTestId('custom-element')
    expect(divTag).toBeInTheDocument()
  })
  test('should render h tag', () => {
    render(
      <Provider store={store}>
        <OpenFile />
      </Provider>
    )
    const hTag = screen.getByText('New Firmware File')
    expect(hTag).toBeInTheDocument()
  })
  test('should render input element', () => {
    render(
      <Provider store={store}>
        <OpenFile />
      </Provider>
    )
    const inputEl = screen.getByRole('textbox')
    expect(inputEl).toBeInTheDocument()
  })

  test('should render button component', () => {
    render(
      <Provider store={store}>
        <OpenFile />
      </Provider>
    )
    const button = screen.getByText('Browse')
    expect(button).toBeInTheDocument()
  })
})
