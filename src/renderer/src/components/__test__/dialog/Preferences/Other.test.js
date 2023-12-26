import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import Other from '../../../dialogs/PreferencesDialog/SNMP/Others/Other'

describe('Other', () => {
  test('should render divider', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Other />
      </Provider>
    )
    const divider = screen.getByText('Others')
    expect(divider).toBeInTheDocument()
  })
  test('should render switch component', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const SwitchOnChange = jest.fn()
    render(
      <Provider store={store}>
        <Other handlePrecheckSwitchOnChange={SwitchOnChange} />
      </Provider>
    )
    const SwitchElement = screen.getByRole('switch')
    // expect(SwitchElement).not.toBeChecked() //switch to be unChecked initially
    fireEvent.click(SwitchElement)
    expect(SwitchElement).toBeChecked() //switch to be checked
    expect(SwitchOnChange).toHaveBeenCalledTimes(0)
  })
  test('should render Typography', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <Other />
      </Provider>
    )
    const title = screen.getByRole('heading', { level: 5 })
    expect(title).toBeTruthy()
  })
})
