import { fireEvent, render, screen } from '@testing-library/react'
import CustomRangePicker from '../../components/dialogs/Common Code/CustomRangePicker'
import { Provider } from 'react-redux'
import { store } from '../../app/store'

describe.only('CustomRangePicker', () => {
  test(' should render the range Picker', () => {
    render(
      <Provider store={store}>
        <CustomRangePicker />
      </Provider>
    )
    const picker = screen.getByTestId('data')
    fireEvent.mouseDown(picker)
    expect(picker).toBeTruthy()
  })
})
