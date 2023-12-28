import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, jest, describe } from '@jest/globals'
import { store } from '../../../app/store'
import DeviceList from '../../../components/dialogs/TrapSettingDialog/DeviceList/DeviceList'
import '@testing-library/jest-dom'

describe('should render Trap Setting', () => {
  test('should render card', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DeviceList />
      </Provider>
    )
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
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
        <DeviceList />
      </Provider>
    )
    const element = screen.getByRole('table')
    expect(element).toBeInTheDocument()
  })
})
