/* eslint-disable no-unused-vars */
import React from 'react'
import { Modal } from 'antd'
const {confirm} = Modal
const EnhanceSubContent = () => {
  return (
const handleMenuItemClick = ({ key }) => {
    console.log(key)
    const fetchIndex = items.findIndex((e) => e.key === key)
    console.log(fetchIndex)
    if (fetchIndex === selectedIndex) return
    if (configChangeFlag && configValidFlag) {
      const Popup = new Promise((resolve, reject) => {
        console.log(Popup)
        showConfirm(resolve, reject)
      })
        .then(() => {
          handleRequireSetData()
          handleChangePage(fetchIndex)
          return null
        })
        .catch(() => {
          handleChangePage(fetchIndex)
        })
    } else {
      handleChangePage(fetchIndex)
    }
  }
  )
}

export default EnhanceSubContent
