import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../app/store'
import SyslogGraph from './SyslogGraph'
import '@testing-library/jest-dom'

describe('SyslogGraph', () => {
  test('should render a refresh button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <SyslogGraph />
      </Provider>
    )
    const element = screen.getByRole('button')
    expect(element).toBeInTheDocument()
  })
})
