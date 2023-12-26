import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import ConfigComparission from '../../../pages/ConfigComparission'
import '@testing-library/jest-dom'
describe('should render the configComparission', () => {
  test('should render Header ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigComparission />
      </Provider>
    )
    const header = screen.getByRole('heading')
    expect(header).toBeInTheDocument()
  })
  test('should render input file1', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigComparission />
      </Provider>
    )
    const inputFile1 = screen.getByTestId('file1')
    fireEvent.change(inputFile1)
    expect(inputFile1).toBeInTheDocument()
  })
  test('should render input file2', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <ConfigComparission />
      </Provider>
    )
    const inputFile2 = screen.getByTestId('file2')
    fireEvent.change(inputFile2)
    expect(inputFile2).toBeInTheDocument()
  })
})
