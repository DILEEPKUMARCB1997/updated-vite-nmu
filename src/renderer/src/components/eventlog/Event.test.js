import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

describe('Event', () => {
  test('should render ConfigProvider ', () => {
    render(
      <Provider store={store}>
        <Event />
      </Provider>
    )
    const component = screen.getByTestId('custom-element')
    expect(component).toBeInTheDocument()
  })
})
