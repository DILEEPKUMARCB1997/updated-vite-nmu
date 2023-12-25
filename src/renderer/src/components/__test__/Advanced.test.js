import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Advanced from '../dialogs/PreferencesDialog/Advanced/Advanced'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

describe('Advanced', () => {
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
        <Advanced />
      </Provider>
    )
    const div = screen.getByTestId('advanced')
    expect(div).toBeInTheDocument()
  })
})
