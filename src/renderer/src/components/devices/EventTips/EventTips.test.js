import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import EventTips from './EventTips'
import '@testing-library/jest-dom'

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
      <EventTips />
    </Provider>
  )
  const element = screen.getByTestId('alert')
  expect(element).toBeInTheDocument()
})
