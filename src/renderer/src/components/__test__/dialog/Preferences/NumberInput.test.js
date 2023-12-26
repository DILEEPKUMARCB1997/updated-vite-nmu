import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import NumberInput from '../../../dialogs/PreferencesDialog/Telegram/Components/NumberInput'

describe('NumberInput', () => {
  test('should render inputNumber component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const inputNumberButton = jest.fn()
    render(
      <Provider store={store}>
        <NumberInput onChange={inputNumberButton} />
      </Provider>
    )
    const inputNumber = screen.getByTestId('number')
    fireEvent.change(inputNumber)
    expect(inputNumberButton).toHaveBeenCalledTimes(0)
  })
})
