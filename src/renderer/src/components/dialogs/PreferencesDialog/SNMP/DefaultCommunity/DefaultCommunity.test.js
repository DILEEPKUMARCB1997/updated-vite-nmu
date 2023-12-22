import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '../../../../../app/store'
import DefaultCommunity from './DefaultCommunity'

describe('DefaultCommunity', () => {
  test(' should render divider component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <DefaultCommunity />
      </Provider>
    )
    const divider = screen.getByText('Default Community')
    expect(divider).toBeInTheDocument()
  })
  test(' should render select', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SNMPVersionSelectOnChange = jest.fn()
    render(
      <Provider store={store}>
        <DefaultCommunity handleSNMPVersionSelectOnChange={SNMPVersionSelectOnChange} />
      </Provider>
    )
    const selectVersion = screen.getByRole('combobox')
    fireEvent.change(selectVersion, { target: { value: 'v2c' } })
    expect(selectVersion).toBeInTheDocument()
    expect(SNMPVersionSelectOnChange).toHaveBeenCalledTimes(0)
  })
  test(' should render read community Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const ReadCommunityInputOnChange = jest.fn()
    render(
      <Provider store={store}>
        <DefaultCommunity handleReadCommuityInputOnChange={ReadCommunityInputOnChange} />
      </Provider>
    )
    const readInput = screen.getByLabelText('readCommunityInput')
    fireEvent.change(readInput)
    expect(ReadCommunityInputOnChange).toHaveBeenCalledTimes(0)
  })
  test(' should render write community Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const WriteCommunityInputOnChange = jest.fn()
    render(
      <Provider store={store}>
        <DefaultCommunity handleWriteCommuityInputOnChange={WriteCommunityInputOnChange} />
      </Provider>
    )
    const writeInput = screen.getByLabelText('writeCommunityInput')
    fireEvent.change(writeInput)
    expect(WriteCommunityInputOnChange).toHaveBeenCalledTimes(0)
  })
})
