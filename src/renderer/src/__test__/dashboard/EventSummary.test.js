import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import EventSummary from '../../components/dashboard/EventSummary'

describe.skip('EventSummary', () => {
  it('should render the component', () => {
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
    const information = screen.getByText('Information')
    expect(information).toBeTruthy()
    // expect(information).toHaveTextContent('Information')
  })
})
