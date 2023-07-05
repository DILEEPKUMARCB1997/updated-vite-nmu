/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Select, Divider, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { clearGeneralData } from '../../../../features/generalSlice'
//import styles from './General.scss'
//import EnhanceSubContent from '../EnhanceSubContent/EnhanceSubContent'

const { Option } = Select
const TITLE = 'Network Interface Card'

function General(props) {
  const { setNICActiveIndex, activeNIC, NICData, NICSelectWidth } = props
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearGeneralData())
  }, [])

  const handleNICSelectOnChange = (value) => {
    setNICActiveIndex(value)
    dispatch(clearGeneralData())
  }

  return (
    <div style={{ fontSize: '1.5rem', color: ' #6fbbd6', width: '100%' }}>
      <Card
        title={TITLE}
        bordered={false}
        bodyStyle={{
          width: '100%',
          fontSize: '1.5rem',
          color: ' #6fbbd6',
          marginTop: '0px',
          marginBottom: '0px'
        }}
      >
        <Select
          style={{ width: `${NICSelectWidth}px`, minWidth: '400px' }}
          value={activeNIC}
          dropdownStyle={{ zIndex: '1301' }}
          onChange={handleNICSelectOnChange}
        ></Select>
      </Card>
      <Divider />
    </div>
  )
}

General.propTypes = {
  setNICActiveIndex: PropTypes.func.isRequired,
  activeNIC: PropTypes.number.isRequired,
  NICData: PropTypes.array.isRequired,
  // clearGeneralData: PropTypes.func.isRequired,
  NICSelectWidth: PropTypes.number.isRequired
}

export default General

// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react'
// //import PropTypes from 'prop-types'
// import { Select, Divider, Card } from 'antd'
// import {
//   GeneralSelector,
//   clearGeneralData,
//   setNICActiveIndex
// } from '../../../../features/generalSlice'
// import { useDispatch, useSelector } from 'react-redux'
// //import styles from './General.scss'
// //import EnhanceSubContent from '../EnhanceSubContent/EnhanceSubContent'

// const { Option } = Select
// const TITLE = 'Network Interface Card'

// const General = (props) => {
//   const { activeNIC, NICData } = props
//   const dispatch = useDispatch()

//   //const [NICData, setNICData] = useState([])
//   //const [activeNIC, setActiveNIC] = useState(0)
//   const [NICSelectWidth, setNICSelectWidth] = useState(400)
//   useEffect(() => {
//     // // get the NIC data from props or state
//     const niList = props.NICData || props.NICData.niList
//     // set the NIC data state setNICData(niList); // get the active NIC index from props or state
//     // const activeIndex = props.activeNIC || state.general.NICData.activeIndex // set the active NIC state setActiveNIC(activeIndex); // calculate the minimum width for the select element based on the name length
//     let minWidth = 400
//     niList.forEach((element) => {
//       const width = element.name.length * 12
//       if (width > minWidth) {
//         minWidth = width
//       }
//     }) // set the select width state
//     setNICSelectWidth(minWidth)
//   }, [props.NICData, props.activeNIC])

//   useEffect(() => {
//     dispatch(clearGeneralData())
//   }, [])
//   const handleNICSelectOnChange = (value) => {
//     dispatch(setNICActiveIndex(value))
//   }

//   return (
//     <div style={{ width: '100%' }}>
//       <Card title={TITLE}>
//         <Select
//           style={{ width: `${NICSelectWidth}px`, minWidth: '400px' }}
//           value={activeNIC}
//           dropdownStyle={{ zIndex: '1301' }}
//           onChange={handleNICSelectOnChange}
//         >
//           {NICData &&
//             NICData.map((NICInfo, index) => (
//               <Option key={NICInfo.name} value={index}>
//                 {`${NICInfo.name} - ${NICInfo.IPAddress}`}
//               </Option>
//             ))}
//         </Select>
//       </Card>
//       <Divider />
//     </div>
//   )
// }

// export default General

// function NICSelect(props) {
//   const [NICData, setNICData] = useState([]);
//   const [activeNIC, setActiveNIC] = useState(0);
//  const [NICSelectWidth, setNICSelectWidth] = useState(400);
//  useEffect(() => { // get the NIC data from props or state
//   const niList = props.NICData || state.general.NICData.niList; // set the NIC data state setNICData(niList); // get the active NIC index from props or state
//   const activeIndex = props.activeNIC || state.general.NICData.activeIndex; // set the active NIC state setActiveNIC(activeIndex); // calculate the minimum width for the select element based on the name length
//    let minWidth = 400;
//     niList.forEach((element) => {
//     const width = element.name.length * 12;
//     if (width > minWidth) {
//        minWidth = width;
//       }
//      }); // set the select width state
//        setNICSelectWidth(minWidth); },
//         [props.NICData, props.activeNIC]);
//         return (
//            <div className="nic-select">
//            <select style={{ width: `${NICSelectWidth}px` }}
//             value={activeNIC}
//             onChange={(e) => setActiveNIC(e.target.value)} >
//              {NICData.map((item, index) => (
//                <option key={index} value={index}>
//                 {item.name} </option>
//                  ))}
//                   </select>
//                    </div> )
//                   }
//                   export default NICSelect;
