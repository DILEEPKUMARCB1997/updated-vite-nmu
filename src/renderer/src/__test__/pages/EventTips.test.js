import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, jest } from '@jest/globals'
import { store } from '../../app/store'
import EventTips from '../../components/devices/EventTips/EventTips'
import '@testing-library/jest-dom'
describe('EventTips', () => {
  test('should render alert', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EventTips />
      </Provider>
    )
    const element = screen.getByTestId('alert')
    expect(element).toBeInTheDocument()
  })
  test('should render anchor ok button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EventTips />
      </Provider>
    )
    const okButton = screen.getByTestId('okbutton', { current: 'page' })
    expect(okButton).toBeInTheDocument()
  })
  test('should render anchor cancel button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EventTips />
      </Provider>
    )
    const cancelButton = screen.getByTestId('cancelbutton', { current: false })
    expect(cancelButton).toBeInTheDocument()
  })
})
