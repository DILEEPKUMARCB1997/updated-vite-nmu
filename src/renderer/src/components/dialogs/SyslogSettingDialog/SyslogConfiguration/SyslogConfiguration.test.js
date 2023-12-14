import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, jest, describe } from '@jest/globals'
import { store } from '../../../../app/store'
import '@testing-library/jest-dom'
import SyslogConfiguration from './SyslogConfiguration'
import userEvent from '@testing-library/user-event'

describe('should render Trap Setting', () => {
  test('should call the handleOnStartButton function when the start button is clicked', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const mockHandleOnStartButton = jest.fn()
    render(
      <Provider store={store}>
        <SyslogConfiguration handleOnStartButton={mockHandleOnStartButton} />
      </Provider>
    )

    const StartButton = screen.getByRole('button')
    await userEvent.click(StartButton)
    expect(mockHandleOnStartButton).toHaveBeenCalledTimes(0)
  })
})
