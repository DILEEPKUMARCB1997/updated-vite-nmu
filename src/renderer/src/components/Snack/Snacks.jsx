/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSnack, closeSnack, snackSelector } from '../../features/snackSlice'
import BackupRestoreSnack from './BackupRestoreSnack/BackupRestoreSnack'
import ResetToDefaultSnack from './ResetToDefaultSnack/ResetToDefaultSnack'

const Snack = ({ id, onClose, ...rest }) => {
  return (
    <div>
      {
        {
          resetToDefault: <ResetToDefaultSnack onClose={onClose} />,
          backupRestore: <BackupRestoreSnack onClose={onClose} />
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

// import { Alert } from "antd";
// const AlertComponent = ({
//   showBatchOperateTips,
//   messages,
//   batchOperateEvent,
//   disableOK,
//   handleOKOnClick,
//   handleOKOnKeyPress,
//   handleCancelOnClick,
//   handleCancelOnKeyPress,
//   SNMPSelectOnly,
//   TIPS,
// }) => {
//   const alertProps = {
//     className: `${styles.alert} ${
//       showBatchOperateTips ? "" : styles.hide
//     }`,
//     message: messages[batchOperateEvent],
//     type: "info",
//     showIcon: true,
//     description: (
//       <div>
//         <div>
//           Select devices and press{" "}
//           <a
//             className={disableOK ? styles.disable : undefined}
//             role="button"
//             tabIndex="0"
//             onClick={handleOKOnClick}
//             onKeyPress={handleOKOnKeyPress}
//           >
//             OK
//           </a>{" "}
//           or{" "}
//           <a
//             role="button"
//             tabIndex="0"
//             onClick={handleCancelOnClick}
//             onKeyPress={handleCancelOnKeyPress}
//           >
//             Cancel
//           </a>
//           .
//         </div>
//         {SNMPSelectOnly && <div className={styles.tips}>{TIPS}</div>}
//       </div>
//     ),
//   };
//   return <Alert {...alertProps} />;
// };
// export default AlertComponent;
