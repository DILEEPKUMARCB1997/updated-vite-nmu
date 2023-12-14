import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'
import NetworkSettingDialog from './NetworkSettingDialog'

test('should render network setting dialog', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))

  render(
    <Provider store={store}>
      <NetworkSettingDialog />
    </Provider>
  )
  const networkSettingModal = screen.getByRole('dialog')
  fireEvent.click(networkSettingModal)
  expect(networkSettingModal).toBeInTheDocument()
})

test('should render start button', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))

  render(
    <Provider store={store}>
      <NetworkSettingDialog />
    </Provider>
  )
  const startButton = screen.getByRole('button', { name: 'start' })
  fireEvent.click(startButton)
  expect(startButton).toBeInTheDocument()
  expect(startButton).toBeDisabled()
})

test('should call handleStartButtonClick on clicking start button', () => {
  const onOk = jest.fn()

  render(
    <Provider store={store}>
      <NetworkSettingDialog onOk={onOk} />
    </Provider>
  )

  const startButtonClick = screen.getByRole('button', { name: 'start' })
  fireEvent.click(startButtonClick)
  expect(startButtonClick).toHaveBeenCalled()
})
