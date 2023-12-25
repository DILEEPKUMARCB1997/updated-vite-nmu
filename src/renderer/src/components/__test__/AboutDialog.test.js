import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../app/store'
import AboutDialog from '../dialogs/AboutDialog/AboutDialog'
import '@testing-library/jest-dom'
describe('should render the AboutDialog', () => {
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
        <AboutDialog />
      </Provider>
    )
    const element = screen.getByRole('dialog')
    fireEvent.click(element)
    expect(element).toBeInTheDocument()
  })
  test('should render image', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <AboutDialog />
      </Provider>
    )
    const image = screen.getByAltText('icon')
    expect(image).toBeInTheDocument()
  })
  test('should render Title', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <AboutDialog />
      </Provider>
    )
    const element = screen.getByTestId('title')
    expect(element).toBeInTheDocument()
  })
})
