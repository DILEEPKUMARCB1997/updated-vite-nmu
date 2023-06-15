import React, { useEffect } from 'react'
import {
  REQUEST_MP_GET_DISK_USES,
  RESPONSE_RP_GET_DISK_USES
} from '../../../../main/utils/IPCEvents'
import { useDispatch, useSelector } from 'react-redux'
import { dasboardSelector, initDiskUses } from '../../features/dashboardSlice'

const DiskSpceSummary = () => {
  const dispatch = useDispatch()
  const { diskUses } = useSelector(dasboardSelector)
  useEffect(() => {
    window.electron.ipcRenderer.once(RESPONSE_RP_GET_DISK_USES, (event, arg) => {
      if (arg.success) {
        console.log(arg)
        const diskUse = arg.data
        dispatch(initDiskUses(diskUse))
      } else {
        console.log('Error get disk uses data')
      }
    })
    window.electron.ipcRenderer.send(REQUEST_MP_GET_DISK_USES, {})
  }, [])

  console.log(diskUses)

  return (
    <div>
      <pre>
        <code>{JSON.stringify(diskUses, '', '\t')}</code>
      </pre>
    </div>
  )
}

export default DiskSpceSummary
