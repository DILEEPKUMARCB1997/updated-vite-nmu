import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { expect, test, describe, jest } from '@jest/globals'
import { store } from '../../../app/store'
import FileList from '../../../components/dialogs/ScheduleBackupDialog/FileList/FileList'
import '@testing-library/jest-dom'
describe('should render the File List', () => {
  test('should render  List in Backup Restore', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(
      <Provider store={store}>
        <FileList />
      </Provider>
    )
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
})
