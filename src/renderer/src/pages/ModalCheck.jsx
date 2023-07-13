/* eslint-disable no-unused-vars */
// import React from 'react'

// import { Button, Modal, App } from 'antd'
// const { confirm } = Modal

// const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'

// const Modalcheck = () => {
//   const { notification } = App.useApp()
//   const showConfirm = () => {
//     confirm({
//       zIndex: 1500,
//       title: CONFIRM_CONTENT_TXTT,

//       onOk() {
//         notification.success({ message: 'successfully saved' })
//       },
//       onCancel() {
//         console.log('Cancel')
//       }
//     })
//   }

//   return (
//     <div>
//       <Button onClick={showConfirm}>Confirm</Button>
//     </div>
//   )
// }

// export default Modalcheck

import React from 'react'
import { App, Button } from 'antd'
const CONFIRM_CONTENT_TXTT = 'Do you want to save settings of this page?'
const Modalcheck = () => {
  const { modal, notification } = App.useApp()
  const showConfirm = () => {
    modal.confirm({
      zIndex: 1500,
      title: CONFIRM_CONTENT_TXTT,
      okText: 'Save',
      onOk: () => {
        notification.success({ message: 'successfully saved' })
      }
    })
  }
  return (
    <div>
      <Button onClick={showConfirm}> confirm</Button>
    </div>
  )
}

export default Modalcheck
