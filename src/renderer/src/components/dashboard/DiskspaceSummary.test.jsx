import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, jest, describe } from '@jest/globals'
import DiskSpaceSummary from './DiskSpaceSummary'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import '@testing-library/jest-dom/extend-expect'

describe('DeviceSummary', () => {
  test('should render the disk Space', () => {
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
    const diskSpace = screen.getByTestId('graph')
    expect(diskSpace).toBeInTheDocument()
  })
})
