import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import BackupRestoreDialog from '../../../components/dialogs/BackupRestoreDialog/BackupRestoreDialog'
import '@testing-library/jest-dom'

test('should render Backup Restore', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query !== '(min-width: 240px) and (max-width: 767px)',
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  }))
  render(
    <Provider store={store}>
      <BackupRestoreDialog />
    </Provider>
  )
  const bcModel = screen.getByTestId('modalData')
  fireEvent.click(bcModel)
  expect(bcModel).toBeInTheDocument()
})
