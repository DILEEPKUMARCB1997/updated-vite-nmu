import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import EventLogGraph from './EventLogGraph'

describe('EventLogGraph', () => {
  test('should render div tag ', () => {
    render(
      <Provider store={store}>
        <EventLogGraph />
      </Provider>
    )
    const divTag = screen.getByTestId('custom-element')
    expect(divTag).toBeInTheDocument()
  })
})
