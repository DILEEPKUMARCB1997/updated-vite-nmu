import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { store } from '../../../../app/store'
import { Provider } from 'react-redux'
import IPRangeList from '../../../dialogs/PreferencesDialog/SNMP/SNMPScan/IPRangeList/IPRangeList'
import userEvent from '@testing-library/user-event'

describe('IPRangeList', () => {
  test('should render Panel Component ', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <IPRangeList />
      </Provider>
    )
    const panel = screen.getByTestId('panel')
    userEvent.click(panel)
    expect(panel).toBeTruthy()
  })
})
