import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import DeviceAdvanceDrawer from './DeviceAdvanceDrawer'
import '@testing-library/jest-dom'

describe('DeviceAdvanceDrawer', () => {
  test('should render drawer', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <DeviceAdvanceDrawer />
      </Provider>
    )
    const drawer = screen.findByText('Advance Setting')
    expect(drawer).toBeTruthy()
  })
  test('should render tab', () => {
    render(
      <Provider store={store}>
        <DeviceAdvanceDrawer />
      </Provider>
    )
    const tabEl = screen.findByRole('tab')
    expect(tabEl).toBeDefined()
  })
})
