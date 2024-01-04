import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import EventList from '../../components/dashboard/EventList'

describe('EventList', () => {
  it('check the component', () => {
    render(
      <Provider store={store}>
        <EventList />
      </Provider>
    )
    const eventData = screen.getByTestId('eventList')
    expect(eventData).toBeTruthy()
  })
})
