import { ipcMain } from 'electron'
import os from 'os'
import { REQUEST_MP_GET_DISK_USES, RESPONSE_RP_GET_DISK_USES } from '../../utils/IPCEvents'
const checkDiskSpace = require('check-disk-space').default

// Promise
async function getFreeSpace(path) {
  try {
    const result = await checkDiskSpace(path)
    return result
  } catch (err) {
    console.error(err)
    return 0
  }
}

ipcMain.on(REQUEST_MP_GET_DISK_USES, async (event, arg) => {
  const eventName = RESPONSE_RP_GET_DISK_USES
  try {
    let path = os.platform() === 'win32' ? 'C:' : '/'
    const result = await getFreeSpace(path)
    if (result == null) {
      event.sender.send(eventName, {
        success: false,
        msg: 'Invalid Details',
        data: result
      })
    } else {
      event.sender.send(eventName, {
        success: true,
        msg: 'successfully get disk uses',
        data: result
      })
    }
  } catch (error) {
    console.error(error)
    event.sender.send(eventName, {
      success: false,
      msg: 'Error in - get disk uses'
    })
  }
})
