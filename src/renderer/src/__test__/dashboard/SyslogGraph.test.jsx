import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import SyslogGraph from '../../components/dashboard/SyslogGraph'

jest.mock('react-apexcharts')

describe('SyslogGraph', () => {
  it('should render the SyslogGraph', () => {
    const container = renderWithProviders(
      <Provider store={store}>
        <SyslogGraph />
      </Provider>
    )
    expect(container).toBeTruthy()
  })
})
