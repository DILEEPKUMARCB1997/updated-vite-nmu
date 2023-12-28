import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../app/store'
import ResetToDefaultDialog from '../../components/dialogs/ResetToDefaultDialog/ResetToDefaultDialog'
import '@testing-library/jest-dom'
describe('should render the ResetToDefaultDialog', () => {
  test('should render Modal ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ResetToDefaultDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })
  test('should render Table ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ResetToDefaultDialog />
      </Provider>
    )
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
  })
  // test('should render Progress', () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))

  //   render(
  //     <Provider store={store}>
  //       <ResetToDefaultDialog />
  //     </Provider>
  //   )
  //   const progress = screen.getByTestId('progress')
  //   expect(progress).toBeInTheDocument()
  // })
  test('should render button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ResetToDefaultDialog />
      </Provider>
    )
    const startbutton = screen.getByTestId('startButton')
    expect(startbutton).toBeInTheDocument()
  })
})
