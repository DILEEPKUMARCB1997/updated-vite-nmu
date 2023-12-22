import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import Mail from './Mail'

describe('Mail', () => {
  test('should render div component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Mail />
      </Provider>
    )
    const div = screen.getByTestId('divTag')
    expect(div).toBeInTheDocument()
  })
})
