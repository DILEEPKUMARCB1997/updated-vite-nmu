import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import SingleBackupConfigDialog from './SingleBackupConfigDialog'
import '@testing-library/jest-dom'

describe('./SingleBackupConfigDialog ', () => {
  test('should render Modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <SingleBackupConfigDialog />
      </Provider>
    )
    const element = screen.getByRole('dialog')
    fireEvent.click(element)
    expect(element).toBeInTheDocument()
  })
  test('should render Alert', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <SingleBackupConfigDialog />
      </Provider>
    )
    const alertComponent = screen.getByRole('alert')
    expect(alertComponent).toBeInTheDocument()
  })
})
