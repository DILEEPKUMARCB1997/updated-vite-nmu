import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddIPRangeDialog from '../../dialogs/AddIPRangeDialog/AddIPRangeDialog'
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
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
  it('should render Start IPAddress Input ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const StartAddressInput = jest.fn()
    render(
      <Provider store={store}>
        <AddIPRangeDialog handleStartAddressInputOnChange={StartAddressInput} />
      </Provider>
    )
    fireEvent.change(screen.getByPlaceholderText('Enter the Start IP Address'), {
      target: { value: '' }
    })
    expect(StartAddressInput).toHaveBeenCalledTimes(0)
  })
  it('should render End IPAddress Input ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const EndAddressInput = jest.fn()
    render(
      <Provider store={store}>
        <AddIPRangeDialog handleEndAddressInputOnChange={EndAddressInput} />
      </Provider>
    )
    fireEvent.change(screen.getByPlaceholderText('Enter the End IP Address'), {
      target: { value: '' }
    })
    expect(EndAddressInput).toHaveBeenCalledTimes(0)
  })
  it('should render Alert ', () => {
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
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
