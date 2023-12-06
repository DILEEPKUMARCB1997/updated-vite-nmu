import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, jest, describe } from '@jest/globals'
import DashboardPage from './DashboardPage'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom/extend-expect'

describe('DashboardPage', () => {
  test('should render deviceSummary Card', () => {
    global.window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DashboardPage />
      </Provider>
    )
    const deviceSummaryCard = screen.getByTestId('custom-element')
    expect(deviceSummaryCard).toBeInTheDocument()
  })
})
