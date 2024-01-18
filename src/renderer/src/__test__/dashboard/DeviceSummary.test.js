import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
// import { test, describe, expect } from 'vitest'
import { store } from '../../app/store'
import DeviceSummary from '../../components/dashboard/DeviceSummary'
import '@testing-library/jest-dom'

describe('DeviceSummary', () => {
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
        <DeviceSummary />
      </Provider>
    )
    const element = screen.getByTestId('custom-element')

    expect(element).toBeInTheDocument()
  })
  test('should render the online summary card with the correct count', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DeviceSummary />
      </Provider>
    )
    const onlineSummaryCard = screen.getByText('Online')
    expect(onlineSummaryCard).toBeInTheDocument()
    expect(onlineSummaryCard).toHaveTextContent('Online')
  })

  test('should render the offline summary card with the correct count', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DeviceSummary />
      </Provider>
    )
    const offlineSummaryCard = screen.getByText('Offline')
    expect(offlineSummaryCard).toBeInTheDocument()
    expect(offlineSummaryCard).toHaveTextContent('Offline')
  })
})
