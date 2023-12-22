import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { store } from '../../../app/store'
import BuzzerDialog from './BuzzerDialog'

describe('Buzzer Dialog test cases', () => {
  test('rendering Buzzer Dialog modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BuzzerDialog />
      </Provider>
    )
    const buzzerDialog = screen.getByRole('dialog')
    fireEvent.click(buzzerDialog)
    expect(buzzerDialog).toBeInTheDocument()
  })

  // test('rendering the two input fields', () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))

  //   render(
  //     <Provider store={store}>
  //       <AddIPRangeDialog />
  //     </Provider>
  //   )
  //   const startIpAddressInput = screen.getByRole('textbox', { name: 'Start IP Address' })
  //   fireEvent.click(startIpAddressInput)
  //   expect(startIpAddressInput).toBeInTheDocument()

  //   const endIpAddressInput = screen.getByRole('textbox', { name: 'End IP Address' })
  //   fireEvent.click(endIpAddressInput)
  //   expect(endIpAddressInput).toBeInTheDocument()
  // })
  // test('rendering the two buttons', () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))

  //   render(
  //     <Provider store={store}>
  //       <AddIPRangeDialog />
  //     </Provider>
  //   )
  //   const okButton = screen.getByRole('button', { name: 'Ok' })
  //   fireEvent.click(okButton)
  //   expect(okButton).toBeInTheDocument()

  //   const cancelButton = screen.getByRole('button', { name: 'Cancel' })
  //   fireEvent.click(cancelButton)
  //   expect(cancelButton).toBeInTheDocument()
  // })
})
