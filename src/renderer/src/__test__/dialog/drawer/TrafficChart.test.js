import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../app/store'
import TrafficChart from '../../../components/Drawer/PortInformationDrawer/TrafficChart/TrafficChart'
import { jest } from '@jest/globals'

jest.mock('react-apexcharts')
describe('TrafficChart', () => {
  test('should render card', () => {
    render(
      <Provider store={store}>
        <TrafficChart />
      </Provider>
    )
    const card = screen.getByText('Real-Time Traffic')
    expect(card).toBeTruthy()
  })
})
