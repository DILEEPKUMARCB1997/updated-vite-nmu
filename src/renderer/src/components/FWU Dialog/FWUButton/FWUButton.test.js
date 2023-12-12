import React from 'react'
import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import FWUButton from './FWUButton'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'

describe('FWUButton', () => {
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
        <FWUButton />
      </Provider>
    )
    const finishButton = screen.getByTestId('custom-element')
    expect(finishButton).toBeInTheDocument()
  })
  test('should render the "wait" status', () => {
    const { getByText } = render(
      <Provider store={store}>
        <FWUButton />
      </Provider>
    )
    expect(getByText('Cancel')).toBeInTheDocument()
    expect(getByText('Start')).toBeInTheDocument()
  })
  test('should call handleCancelButtonClick when Cancel button is clicked', () => {
    const handleDialogOnClose = jest.fn()
    const { getByText } = render(
      <Provider store={store}>
        <FWUButton handleDialogOnClose={handleDialogOnClose} />
      </Provider>
    )
    fireEvent.click(getByText('Cancel'))
    expect(handleDialogOnClose).toHaveBeenCalled()
  })

  // test('should call handleStartButtonClick when Start button is clicked', () => {
  //   const dispatch = jest.fn()
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <FWUButton dispatch={dispatch} />
  //     </Provider>
  //   )
  //   fireEvent.click(getByText('Start'))
  //   expect(dispatch).toHaveBeenCalledWith(1)
  // })

  test('should  render title', () => {
    render(
      <Provider store={store}>
        <FWUButton />
      </Provider>
    )
    const items = screen.getByTitle('wait')
    expect(items).toBeInTheDocument()
  })
})
