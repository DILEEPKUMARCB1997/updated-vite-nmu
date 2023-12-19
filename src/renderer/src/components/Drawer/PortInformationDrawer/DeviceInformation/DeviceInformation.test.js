import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import DeviceInformation from './DeviceInformation'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import '@testing-library/jest-dom'

describe('DeviceInformation', () => {
  it('renders device information correctly', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const { getByText } = render(
      <Provider store={store}>
        <DeviceInformation />
      </Provider>
    )

    expect(getByText('Model Name')).toBeInTheDocument()
    expect(getByText('IP Address')).toBeInTheDocument()
    expect(getByText('MAC Address')).toBeInTheDocument()
    expect(getByText('Kernel')).toBeInTheDocument()
    expect(getByText('AP')).toBeInTheDocument()
    expect(getByText('Power')).toBeInTheDocument()
  })

  it('renders card correctly', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <DeviceInformation />
      </Provider>
    )
    const cardEl = screen.getByText('Device Information')
    expect(cardEl).toBeInTheDocument()
  })
  test('should render div tag', () => {
    render(
      <Provider store={store}>
        <DeviceInformation />
      </Provider>
    )
    const divTag = screen.findByTestId('custom-element')
    expect(divTag).toBeTruthy()
  })
})
