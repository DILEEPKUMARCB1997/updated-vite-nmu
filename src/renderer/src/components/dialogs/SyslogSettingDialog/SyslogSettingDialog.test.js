import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import SyslogSettingDialog from './SyslogSettingDialog'
import { store } from '../../../app/store'
import '@testing-library/jest-dom'

describe('SyslogSettingDialog', () => {
  test('should render modal', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SyslogSettingDialog />
      </Provider>
    )
    const modal = screen.getByRole('dialog')
    expect(modal).toBeTruthy()
  })
  // test('should render row', () => {
  //   window.matchMedia = jest.fn().mockImplementation((query) => ({
  //     matches: query !== '(min-width: 240px) and (max-width: 767px)',
  //     media: '',
  //     onchange: null,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn()
  //   }))
  //   render(
  //     <Provider store={store}>
  //       <SyslogSettingDialog />
  //     </Provider>
  //   )
  //   const rowEl = screen.getByRole('row')
  //   expect(rowEl).toBeInTheDocument()
  // })
})
