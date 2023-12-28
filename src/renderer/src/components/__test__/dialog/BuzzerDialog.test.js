import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { store } from '../../../app/store'
import BuzzerDialog from '../../dialogs/BuzzerDialog/BuzzerDialog'

describe.skip('Buzzer Dialog test cases', () => {
  test('rendering Buzzer Dialog', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    window.AudioContext = jest.fn().mockImplementation(() => {
      return {}
    })

    render(
      <Provider store={store}>
        <BuzzerDialog />
      </Provider>
    )
    const buzzerDialog = screen.getByRole('dialog')
    fireEvent.click(buzzerDialog)
    expect(buzzerDialog).toBeInTheDocument()
  })
})
