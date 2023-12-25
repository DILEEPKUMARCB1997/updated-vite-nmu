import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import CustomInput from '../dialogs/PreferencesDialog/Telegram/Components/CustomInput'

describe('CustomInput', () => {
  test('should render Input component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const inputButton = jest.fn()
    render(
      <Provider store={store}>
        <CustomInput onChange={inputButton} />
      </Provider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input)
    expect(inputButton).toHaveBeenCalledTimes(0)
  })
})
