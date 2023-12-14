import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../../app/store'
import BackupRestorePanel from './BackupRestorePanel'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

// jest.mock(
//   'electron',
//   () => {
//     // const melectron = { ipcrenderer: { on: jest.fn(), send: jest.fn() } }
//     const melectron = { ipcRenderer: { once: jest.fn(), send: jest.fn() } }
//     return melectron
//   },
//   { virtual: true }
// )

describe('./BackupRestorePanel', () => {
  test('should render fieldset', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const fieldset = screen.getByRole('field')
    expect(fieldset).toBeTruthy()
  })
  test('should render backup Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const backup = screen.getByLabelText('backupinput')
    expect(backup).toBeTruthy()
  })
  test('should render selectFolder button', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const button = screen.getByText('Select Folder')
    expect(button).toBeTruthy()
  })
  test('should render title', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const title = screen.getByTestId('title')
    expect(title).toBeInTheDocument()
  })
  test('should render File name Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const filename = screen.getByLabelText('fileinput')
    expect(filename).toBeTruthy()
  })
  test('should render Backup Button', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const backupButton = jest.fn()
    render(
      <Provider store={store}>
        <BackupRestorePanel handleBackupButtonOnClick={backupButton} />
      </Provider>
    )
    const backButton = screen.getByTestId('backup', { name: 'Backup' })
    await fireEvent.click(backButton)
    expect(backupButton).toHaveBeenCalledTimes(0)
  })
  test('should render Restore Title', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const restoreTitle = screen.getByTestId('restore')
    expect(restoreTitle).toBeTruthy()
  })
  test('should render restore Path Input', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <BackupRestorePanel />
      </Provider>
    )
    const restoreInput = screen.getByLabelText('restorepath')
    expect(restoreInput).toBeTruthy()
  })
  test('should render Select File Button', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
      ipcRenderer: { once: jest.fn(), send: jest.fn() }
    }))
    const selectFileButton = jest.fn()
    render(
      <Provider store={store}>
        <BackupRestorePanel handleSelectFileButtonOnClick={selectFileButton} />
      </Provider>
    )

    const selectButton = screen.getByRole('button', { name: 'Select File' })

    await userEvent.click(selectButton)
    expect(selectFileButton).toHaveBeenCalledTimes(0)
  })
  test('should render Restore Button', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const mockRestoreButton = jest.fn()
    render(
      <Provider store={store}>
        <BackupRestorePanel handleRestoreButtonOnClick={mockRestoreButton} />
      </Provider>
    )
    const restoreButton = screen.getByRole('button', { name: 'Restore' })
    await fireEvent.click(restoreButton)
    expect(mockRestoreButton).toHaveBeenCalledTimes(0)
  })
})
