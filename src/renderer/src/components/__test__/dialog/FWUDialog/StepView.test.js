import { render, screen } from '@testing-library/react'
import { store } from '../../../../app/store'
import StepView from '../../../FWU Dialog/StepView/StepView'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

test('should render steps', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))
  render(
    <Provider store={store}>
      <StepView />
    </Provider>
  )
  //  const steps = screen.getByRole('status')
  const steps = screen.getByRole('listitem')
  expect(steps).toBeInTheDocument()
})
