import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import SplashScreen from '../../splash/SplashScreen'

describe.only('SplashScreen', () => {
  test('should render div', () => {
    render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>
    )
    const divEl = screen.getByTestId('custom-element')
    expect(divEl).toBeTruthy()
  })
  test('should render image tag', () => {
    render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>
    )
    const imgEl = screen.getByAltText('icon')
    expect(imgEl).toBeDefined()
  })
  test('should render title', () => {
    render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>
    )
    const title = screen.getByText('Network Management Utility')
    expect(title).toBeDefined()
  })
  test('should render version', () => {
    render(
      <Provider store={store}>
        <SplashScreen />
      </Provider>
    )
    const version = screen.getByRole('heading', { level: 3 })
    expect(version).toBeTruthy()
  })
})
