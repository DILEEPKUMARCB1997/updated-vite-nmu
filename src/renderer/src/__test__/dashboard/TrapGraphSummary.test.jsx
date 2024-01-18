import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import TrapGraphSummary from '../../components/dashboard/TrapGraphSummary'

jest.mock('react-apexcharts')

describe('TrapGraphSummary', () => {
  it('should render the TrapGraph', () => {
    const container = renderWithProviders(
      <Provider store={store}>
        <TrapGraphSummary />
      </Provider>
    )
    expect(container).toBeTruthy()
  })
})
