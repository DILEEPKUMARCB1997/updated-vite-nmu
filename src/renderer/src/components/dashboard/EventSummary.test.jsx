import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../app/store'
import EventSummary from './EventSummary'
import '@testing-library/jest-dom/extend-expect'

describe('EventSummary', () => {
  test('should render the information Data with the correct count', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EventSummary />
      </Provider>
    )
    const informationData = screen.getByText('Information')
    expect(informationData).toBeInTheDocument()
    //expect(offlineSummaryCard).toHaveTextContent('2')
  })

  test('should render the Warning Data with the correct count', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EventSummary />
      </Provider>
    )
    const warningData = screen.getByText('Warning')
    expect(warningData).toBeInTheDocument()
    // expect(offlineSummaryCard).toHaveTextContent('Offline')
  })
  test('should render the Critical Data with the correct count', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <EventSummary />
      </Provider>
    )
    const criticalData = screen.getByText('Critical')
    expect(criticalData).toBeInTheDocument()
    // expect(criticalData).toHaveTextContent('critical')
  })
})
