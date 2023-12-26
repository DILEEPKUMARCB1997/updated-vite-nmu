import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddIPRangeDialog from './AddIPRangeDialog'
import { store } from '../../../app/store'
import { Provider } from 'react-redux'

describe('AddIPRangeDialog', () => {
  it('should render Modal ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <AddIPRangeDialog />
      </Provider>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
  it('should render Form', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <AddIPRangeDialog />
      </Provider>
    )
    expect(screen.getByRole('form')).toBeInTheDocument()
  })
  it('should render Start IPAddress Input ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <AddIPRangeDialog />
      </Provider>
    )
    expect(screen.getByPlaceholderText('Enter the Start IP Address')).toBeInTheDocument()
  })
})
