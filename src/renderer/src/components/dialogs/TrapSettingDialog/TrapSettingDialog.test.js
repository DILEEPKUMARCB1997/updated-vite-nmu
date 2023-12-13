import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, jest, describe } from '@jest/globals'
import { store } from '../../../app/store'
import TrapSettingDialog from './TrapSettingDialog'
import '@testing-library/jest-dom'

describe('should render TrapSettingDialog', () => {
  test('should render modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <TrapSettingDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()
  })
})
