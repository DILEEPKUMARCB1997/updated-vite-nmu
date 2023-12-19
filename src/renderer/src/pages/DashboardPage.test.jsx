import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, jest, describe } from '@jest/globals'
import DashboardPage from './DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import '@testing-library/jest-dom'

describe.skip('DashboardPage', () => {
  test('should render dashboard', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }
    })

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    )
    const dashboard = screen.getByTestId('dashboardPage')
    expect(dashboard).toBeInTheDocument()
  })
})
