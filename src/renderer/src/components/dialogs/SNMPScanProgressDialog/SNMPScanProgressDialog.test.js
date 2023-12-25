import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import '@testing-library/jest-dom'
import SNMPScanProgressDialog from './SNMPScanProgressDialog'
import { store } from '../../../app/store'

describe('SNMP Scan progress dialog test cases', () => {
  test('should render SNMP Scan Progress dialog', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPScanProgressDialog />
      </Provider>
    )
    const snmpScanModel = screen.getByRole('dialog')
    fireEvent.click(snmpScanModel)
    expect(snmpScanModel).toBeInTheDocument()
  })
  test('should render antd progress', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    render(
      <Provider store={store}>
        <SNMPScanProgressDialog />
      </Provider>
    )
    const snmpScanModal = screen.getByRole('progressbar')
    fireEvent.click(snmpScanModal)
    expect(snmpScanModal).toBeInTheDocument()
  })
})
