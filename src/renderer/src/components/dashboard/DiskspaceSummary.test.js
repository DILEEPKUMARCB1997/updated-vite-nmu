import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import DiskSpaceSummary from './DiskSpaceSummary'
import { store } from '../../app/store'
import { mockElectron } from '../../../setupTests'

describe('Diskspace summary test cases', () => {
  beforeAll(() => {
    global.window.electron = mockElectron
  })
  test('should disk space summary', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <DiskSpaceSummary />
      </Provider>
    )
    const diskSpaceSummary = screen.getByTestId('diskSpaceSummary')
    fireEvent.click(diskSpaceSummary)
    expect(diskSpaceSummary).toBeInTheDocument()
  })
})
