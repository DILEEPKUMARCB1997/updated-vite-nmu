import { fireEvent, render, screen } from '@testing-library/react'
import { store } from '../../app/store'
import { Provider } from 'react-redux'
import ControlButton from '../dialogs/PreferencesDialog/Telegram/Components/ControlButton'

describe('ControlButton', () => {
  test('should render button component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const onClickButton = jest.fn()
    render(
      <Provider store={store}>
        <ControlButton onClick={onClickButton} />
      </Provider>
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClickButton).toHaveBeenCalledTimes(1)
  })
})
