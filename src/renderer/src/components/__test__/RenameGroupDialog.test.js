import { Provider } from 'react-redux'
import { store } from '../../app/store'
import RenameGroupDialog from '../dialogs/renameGroupDialog/RenameGroupDialog'

import { render, fireEvent } from '@testing-library/react'

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn()
  }
}))

describe.skip('RenameGroupDialog', () => {
  const handleClose = jest.fn()

  // it('updates state on Input change', () => {
  //   const { getByPlaceholderText } = render(
  //     <RenameGroupDialog open={true} onClose={handleClose} groupId="1" />
  //   )
  //   const input = getByPlaceholderText('enter group name')
  //   fireEvent.change(input, { target: { value: 'New Group Name' } })
  //   expect(input.value).toBe('New Group Name')
  // })

  test('handles the OK button click', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 240px) and (max-width: 767px)',
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
    const { getByText } = render(
      <Provider store={store}>
        <RenameGroupDialog open={true} onClose={handleClose} groupId="1" />
      </Provider>
    )
    const button = getByText('Apply')
    fireEvent.click(button)
    // expect(ipcRenderer.send).toHaveBeenCalledWith(REQUEST_MP_SET_THE_GROUP_DATA, {
    //   cmd: 'renameGroup',
    //   groupId: '1',
    //   groupName: ''
    // })
    expect(handleClose).toHaveBeenCalledWith({ cmd: 'renameGroup', groupId: '1', groupName: '' })
  })
})
