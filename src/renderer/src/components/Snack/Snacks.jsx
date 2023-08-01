/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSnack, closeSnack, snackSelector } from '../../features/snackSlice'

import ResetToDefaultSnack from './ResetToDefaultSnack/ResetToDefaultSnack'

const Snack = ({ id, onClose, ...rest }) => {
  return (
    <div>
      {
        {
          resetToDefault: <ResetToDefaultSnack onClose={onClose} />
        }[id]
      }
    </div>
  )
}

const Snacks = () => {
  const { snacks } = useSelector(snackSelector)
  const dispatch = useDispatch()
  return snacks.map((id) => <Snack key={id} id={id} onClose={() => dispatch(closeSnack(id))} />)
}

export default Snacks
