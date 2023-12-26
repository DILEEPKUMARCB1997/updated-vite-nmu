import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import TrafficChart from '../../../Drawer/PortInformationDrawer/TrafficChart/TrafficChart'

describe.skip('TrafficChart', () => {
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
