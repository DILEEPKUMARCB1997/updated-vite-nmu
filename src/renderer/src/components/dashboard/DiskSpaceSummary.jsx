
import {
  REQUEST_MP_GET_DISK_USES,
  RESPONSE_RP_GET_DISK_USES
} from '../../../../main/utils/IPCEvents'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardSelector, initDiskUses } from '../../features/dashboardSlice'

const DiskSpaceSummary = () => {
  const dispatch = useDispatch()
  const { diskUses } = useSelector(dashboardSelector)
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

    </div>
  )
}

export default DiskSpaceSummary
