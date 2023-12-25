import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import DeviceAdvanceDrawer from '../Drawer/DeviceAdvancedDrawer/DeviceAdvanceDrawer'
import '@testing-library/jest-dom'

describe('DeviceAdvanceDrawer', () => {
  test('should render div tag', async () => {
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
    const drawer = screen.getByTestId('divider')
    expect(drawer).toBeInTheDocument()
  })
  test.skip('should render tab', () => {
    render(
      <Provider store={store}>
        <DeviceAdvanceDrawer />
      </Provider>
    )
    const tabEl = screen.getByRole('tab')
    expect(tabEl).toBeDefined()
  })
})
