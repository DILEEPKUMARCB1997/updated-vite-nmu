import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../../app/store'
import '@testing-library/jest-dom'
import AlarmSettings from './AlarmSettings'

describe('AlarmSettings', () => {
  test('should render divider', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <AlarmSettings />
      </Provider>
    )
    expect(screen.getByText('Port', { name: 'Port' })).toBeInTheDocument()
  })

  test('should render list', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <AlarmSettings />
      </Provider>
    )
    const listEl = screen.getByRole('list')
    expect(listEl).toBeInTheDocument()
  })
  // test('should render power', () => {
  // window.matchMedia = jest.fn().mockImplementation((query) => ({
  //   matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //   media: '',
  //   onchange: null,
  //   addListener: jest.fn(),
  //   removeListener: jest.fn()
  // }))
  //   render(
  //     <Provider store={store}>
  //       <AlarmSettings />
  //     </Provider>
  //   )
  // })
  // expect(screen.getByTitle('Power', { name: 'Power' })).toBeInTheDocument()
})
