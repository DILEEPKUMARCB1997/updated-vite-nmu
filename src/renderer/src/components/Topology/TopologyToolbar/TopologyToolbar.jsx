/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Checkbox, Tooltip, Modal, Button, Divider, Progress, Typography, Card } from 'antd'
import {
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  DeleteOutlined,
  CloseOutlined,
  CameraOutlined,
  DotChartOutlined,
  LineChartOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import {
  topologySelector,
  switchEditMode,
  setTopologyViewSettings,
  removeNetworkSelectElement,
  requestSwitchPolling
} from '../../../features/topologySlice'

// import PropTypes from 'prop-types'

const { confirm } = Modal

const CLEAR_CONFIRM_CONTENT_TEXT = 'Are you sure you want to clear layout?'
const PHYSICS_TIPS_TEXT =
  'Handles the physics simulation, moving the nodes and edges to show them clearly.'
const EDITMODE_CANCEL_TIPS_TEXT = 'If without save, It will auto restore pre-layout in next scan.'
const ADD_NODE_TIPS = 'Click in an empty space to place a new node.'
const ADD_EDGE_TIPS = 'Click on a node and drag to another node to connect them.'

const TopologyToolbar = (props) => {
  // TopologyToolbar.propTypes = {
  //   handleAddNode: PropTypes.func.isRequired,
  //   handleDisableEdit: PropTypes.func.isRequired,
  //   handleFitViewPoin: PropTypes.func.isRequired,
  //   handleSearchNode: PropTypes.func.isRequired,
  //   handleAddEdge: PropTypes.func.isRequired,
  //   handleSaveLayout: PropTypes.func.isRequired,
  //   handleExportImage: PropTypes.func.isRequired,

  //   showDeleteSelectButton: PropTypes.bool.isRequired,

  //   role: PropTypes.string.isRequired
  // }
  const {
    role,
    handleAddNode,
    handleAddEdge,
    handleDisableEdit,
    handleExportImage,
    handleFitViewPoin,
    handleSaveLayout
  } = props
  const { editMode, isImageExporting, event } = useSelector(topologySelector)
  const dispatch = useDispatch()

  const handleCheckBoxGroupOnChange = (name) => () => {
    dispatch(setTopologyViewSettings(name))
  }
  const handleEditModeButtonOnClick = () => {
    requestSwitchPolling(false)
    dispatch(switchEditMode(true))
  }
  const handleAddNodeButtonOnClick = () => {
    handleAddNode()
  }
  const handleAddEdgeButtonOnClick = () => {
    handleAddEdge()
  }
  const handleSaveLayoutButtonOnClick = () => {
    handleSaveLayout()
    //(true)
    dispatch(switchEditMode(false))
  }
  const handleCancelButtonOnClick = () => {
    handleDisableEdit()
  }
  const handleRemoveSelectButtonOnClick = () => {
    dispatch(removeNetworkSelectElement())
  }
  const handleEditCancelButtonOnClick = () => {
    //(true)
    dispatch(switchEditMode(false))
  }
  const handleExportImageButtonOnClick = () => {
    handleExportImage()
  }
  const handleFitViewPointButtonOnClick = () => {
    handleFitViewPoin()
  }

  const renderEditModeToolbar = () => {
    const { showDeleteSelectButton } = props
    const tipsWord = event === 'addNode' ? ADD_NODE_TIPS : ADD_EDGE_TIPS

    return event === '' ? (
      <div style={{ float: 'left' }}>
        <Button
          type="primary"
          ghost
          style={{ marginRight: '10px' }}
          onClick={handleAddNodeButtonOnClick}
        >
          <DotChartOutlined style={{ marginRight: '2px' }} />
          Add Node
        </Button>
        <Button
          type="primary"
          ghost
          style={{ marginRight: '8px' }}
          onClick={handleAddEdgeButtonOnClick}
        >
          <LineChartOutlined style={{ marginRight: '2px' }} />
          Add Link
        </Button>
        {showDeleteSelectButton && (
          <Button
            type="primary"
            ghost
            style={{ marginRight: '8px' }}
            onClick={handleRemoveSelectButtonOnClick}
          >
            <DeleteOutlined style={{ marginRight: '2px' }} />
            Delete
          </Button>
        )}
        {/* <Button
          type="danger"
          className={styles.editButtonMargin}
          icon="delete"
          onClick={this.handleClearButtonOnClick}
        >
          Clear
        </Button> */}
        <Button
          type="primary"
          ghost
          style={{ marginRight: '8px' }}
          onClick={handleSaveLayoutButtonOnClick}
        >
          <SaveOutlined style={{ marginRight: '2px' }} />
          Save
        </Button>
        <Tooltip title={EDITMODE_CANCEL_TIPS_TEXT} mouseEnterDelay={0.3}>
          <Button
            type="primary"
            ghost
            danger
            style={{ marginRight: '8px' }}
            onClick={handleEditCancelButtonOnClick}
          >
            <CloseOutlined style={{ marginRight: '2px' }} />
            Cancel
          </Button>
        </Tooltip>
      </div>
    ) : (
      <div>
        <Button
          type="primary"
          ghost
          danger
          style={{ marginRight: '8px' }}
          onClick={handleCancelButtonOnClick}
        >
          <CloseOutlined style={{ marginRight: '2px' }} />
          Cancel
        </Button>
        <Divider type="vertical" />
        <Typography.Text style={{ verticalAlign: 'middle', display: '-webkit-inline-flex' }}>
          {tipsWord}
        </Typography.Text>
      </div>
    )
  }
  return (
    <div>
      <div
        style={{
          display: 'flex',

          position: 'absolute',
          top: '5px',
          left: '10px',
          padding: '20px',
          marginTop: '35px'
        }}
      >
        {/* <div> */}
        <Form.Item>
          <Checkbox
            style={{
              fontSize: '16px',
              marginRight: '5px'
            }}
            onChange={handleCheckBoxGroupOnChange('showIP')}
          >
            Show IP
          </Checkbox>

          <Checkbox
            style={{ fontSize: '16px', marginRight: '5px' }}
            onChange={handleCheckBoxGroupOnChange('showModel')}
          >
            Show Model
          </Checkbox>

          <Checkbox
            style={{ fontSize: '16px', marginRight: '5px' }}
            onChange={handleCheckBoxGroupOnChange('showHostname')}
          >
            Show Hostname
          </Checkbox>

          <Checkbox
            style={{ fontSize: '16px', marginRight: '5px' }}
            onChange={handleCheckBoxGroupOnChange('showLinkText')}
          >
            Show Link Text
          </Checkbox>
          <Tooltip title={PHYSICS_TIPS_TEXT} mouseEnterDelay={0.3}>
            <Checkbox
              style={{ fontSize: '16px', marginRight: '5px' }}
              onChange={handleCheckBoxGroupOnChange('physics')}
            >
              Physics
            </Checkbox>
          </Tooltip>
        </Form.Item>

        <div
          style={{
            float: 'right',
            lineHeight: '10px',
            position: 'relative',
            // top: '-50px',
            left: '50px',

            marginLeft: '5px',
            paddingLeft: '20px'
          }}
        >
          <Button
            type="primary"
            ghost
            onClick={handleExportImageButtonOnClick}
            style={{ margin: '5px' }}
          >
            {isImageExporting ? (
              <Progress type="circle" size={24} style={{ marginRight: '2px' }} />
            ) : (
              <CameraOutlined style={{ marginRight: '2px' }} />
            )}
            Export Image
          </Button>
          {/* <Divider type="vertical" /> */}
          <Button type="primary" ghost onClick={handleFitViewPointButtonOnClick}>
            <SearchOutlined style={{ marginRight: '2px' }} />
            Fit View Point
          </Button>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '48px',
          padding: '20px',
          left: '10px',
          position: 'absolute',
          top: '50px',
          marginTop: '25px'
        }}
      >
        {editMode
          ? renderEditModeToolbar()
          : role !== 'Operator' && (
              <Button type="primary" ghost onClick={handleEditModeButtonOnClick}>
                <EditOutlined style={{ marginRight: '2px' }} />
                Edit Layout
              </Button>
            )}
      </div>
    </div>
  )
}

export default TopologyToolbar

// import React from 'react'
// import { Form, Checkbox, Tooltip, Modal, Button, Divider, Progress, Typography } from 'antd'
// import {
//   SearchOutlined,
//   EditOutlined,
//   SaveOutlined,
//   DeleteOutlined,
//   CloseOutlined,
//   CameraOutlined,
//   DotChartOutlined,
//   LineChartOutlined
// } from '@ant-design/icons'
// import { useDispatch, useSelector } from 'react-redux'

// import {
//   topologySelector,
//   requestSwitchPolling,
//   switchEditMode,
//   setTopologyViewSettings,
//   removeNetworkSelectElement
// } from '../../features/topologySlice'

// // import PropTypes from 'prop-types'

// const { confirm } = Modal

// const CLEAR_CONFIRM_CONTENT_TEXT = 'Are you sure you want to clear layout?'
// const PHYSICS_TIPS_TEXT =
//   'Handles the physics simulation, moving the nodes and edges to show them clearly.'
// const EDITMODE_CANCEL_TIPS_TEXT = 'If without save, It will auto restore pre-layout in next scan.'
// const ADD_NODE_TIPS = 'Click in an empty space to place a new node.'
// const ADD_EDGE_TIPS = 'Click on a node and drag to another node to connect them.'

// const TopologyToolbar = (props) => {
//   // TopologyToolbar.propTypes = {
//   //   handleAddNode: PropTypes.func.isRequired,
//   //   handleDisableEdit: PropTypes.func.isRequired,
//   //   handleFitViewPoin: PropTypes.func.isRequired,
//   //   handleSearchNode: PropTypes.func.isRequired,
//   //   handleAddEdge: PropTypes.func.isRequired,
//   //   handleSaveLayout: PropTypes.func.isRequired,
//   //   handleExportImage: PropTypes.func.isRequired,

//   //   showDeleteSelectButton: PropTypes.bool.isRequired,

//   //   role: PropTypes.string.isRequired
//   // }
//   const {
//     role,
//     handleAddNode,
//     handleAddEdge,
//     handleDisableEdit,
//     handleExportImage,
//     handleFitViewPoin,
//     handleSaveLayout
//   } = props
//   const { editMode, isImageExporting, event } = useSelector(topologySelector)
//   const dispatch = useDispatch()

//   const handleCheckBoxGroupOnChange = (name) => () => {
//     dispatch(setTopologyViewSettings(name))
//   }
//   const handleEditModeButtonOnClick = () => {
//     requestSwitchPolling(false)
//     dispatch(switchEditMode(true))
//   }
//   const handleAddNodeButtonOnClick = () => {
//     handleAddNode()
//   }
//   const handleAddEdgeButtonOnClick = () => {
//     handleAddEdge()
//   }
//   const handleSaveLayoutButtonOnClick = () => {
//     handleSaveLayout()
//     requestSwitchPolling(true)
//     dispatch(switchEditMode(false))
//   }
//   const handleCancelButtonOnClick = () => {
//     handleDisableEdit()
//   }
//   const handleRemoveSelectButtonOnClick = () => {
//     dispatch(removeNetworkSelectElement())
//   }
//   const handleEditCancelButtonOnClick = () => {
//     requestSwitchPolling(true)
//     dispatch(switchEditMode(false))
//   }
//   const handleExportImageButtonOnClick = () => {
//     handleExportImage()
//   }
//   const handleFitViewPointButtonOnClick = () => {
//     handleFitViewPoin()
//   }

//   const renderEditModeToolbar = () => {
//     const { showDeleteSelectButton } = props
//     const tipsWord = event === 'addNode' ? ADD_NODE_TIPS : ADD_EDGE_TIPS

//     return event === '' ? (
//       <div style={{ float: 'left' }}>
//         <Button
//           type="primary"
//           ghost
//           style={{ marginRight: '10px' }}
//           onClick={handleAddNodeButtonOnClick}
//         >
//           <DotChartOutlined style={{ marginRight: '2px' }} />
//           Add Node
//         </Button>
//         <Button
//           type="primary"
//           ghost
//           style={{ marginRight: '8px' }}
//           onClick={handleAddEdgeButtonOnClick}
//         >
//           <LineChartOutlined style={{ marginRight: '2px' }} />
//           Add Link
//         </Button>
//         {showDeleteSelectButton && (
//           <Button
//             type="primary"
//             ghost
//             style={{ marginRight: '8px' }}
//             onClick={handleRemoveSelectButtonOnClick}
//           >
//             <DeleteOutlined style={{ marginRight: '2px' }} />
//             Delete
//           </Button>
//         )}
//         {/* <Button
//           type="danger"
//           className={styles.editButtonMargin}
//           icon="delete"
//           onClick={this.handleClearButtonOnClick}
//         >
//           Clear
//         </Button> */}
//         <Button
//           type="primary"
//           ghost
//           style={{ marginRight: '8px' }}
//           onClick={handleSaveLayoutButtonOnClick}
//         >
//           <SaveOutlined style={{ marginRight: '2px' }} />
//           Save
//         </Button>
//         <Tooltip title={EDITMODE_CANCEL_TIPS_TEXT} mouseEnterDelay={0.3}>
//           <Button
//             type="primary"
//             ghost
//             style={{ marginRight: '8px' }}
//             onClick={handleEditCancelButtonOnClick}
//           >
//             <CloseOutlined style={{ marginRight: '2px' }} />
//             Cancel
//           </Button>
//         </Tooltip>
//       </div>
//     ) : (
//       <div>
//         <Button
//           type="primary"
//           ghost
//           style={{ marginRight: '8px' }}
//           onClick={handleCancelButtonOnClick}
//         >
//           <CloseOutlined style={{ marginRight: '2px' }} />
//           Cancel
//         </Button>
//         <Divider type="vertical" />
//         <Typography variant="subtitle1">{tipsWord}</Typography>
//       </div>
//     )
//   }
//   return (
//     <div>
//       <div style={{ position: 'absolute', top: '-10px', left: '-1px' }}>
//         <Form.Item>
//           <Checkbox
//             style={{
//               fontSize: '16px',
//               marginRight: '5px'
//             }}
//             onChange={handleCheckBoxGroupOnChange('showIP')}
//           >
//             Show IP
//           </Checkbox>

//           <Checkbox
//             style={{ fontSize: '16px', marginRight: '5px' }}
//             onChange={handleCheckBoxGroupOnChange('showModel')}
//           >
//             Show Model
//           </Checkbox>

//           <Checkbox
//             style={{ fontSize: '16px', marginRight: '5px' }}
//             onChange={handleCheckBoxGroupOnChange('showHostname')}
//           >
//             show Hostname
//           </Checkbox>

//           <Checkbox
//             style={{ fontSize: '16px', marginRight: '5px' }}
//             onChange={handleCheckBoxGroupOnChange('showLinkText')}
//           >
//             show Link Text
//           </Checkbox>
//           <Tooltip title={PHYSICS_TIPS_TEXT} mouseEnterDelay={0.3}>
//             <Checkbox
//               style={{ fontSize: '16px', marginRight: '5px' }}
//               onChange={handleCheckBoxGroupOnChange('physics')}
//             >
//               Physics
//             </Checkbox>
//           </Tooltip>
//         </Form.Item>

//         <div
//           style={{
//             float: 'right',
//             lineHeight: '10px',
//             position: 'relative',
//             top: '-50px',
//             left: '400px',
//             marginRight: '5px',
//             paddingRight: '20px'
//           }}
//         >
//           <Button type="primary" ghost onClick={handleExportImageButtonOnClick}>
//             {isImageExporting ? (
//               <Progress type="circle" size={24} style={{ marginRight: '2px' }} />
//             ) : (
//               <CameraOutlined style={{ marginRight: '2px' }} />
//             )}
//             Export Image
//           </Button>
//           <Divider type="vertical" />
//           <Button type="primary" ghost onClick={handleFitViewPointButtonOnClick}>
//             <SearchOutlined style={{ marginRight: '2px' }} />
//             Fit View Point
//           </Button>
//         </div>
//       </div>

//       <div
//         style={{
//           width: '100%',
//           height: '48px',
//           padding: '20px',
//           left: '-20px',
//           position: 'absolute'
//         }}
//       >
//         {editMode
//           ? renderEditModeToolbar()
//           : role !== 'Operator' && (
//               <Button type="primary" ghost onClick={handleEditModeButtonOnClick}>
//                 <EditOutlined style={{ marginRight: '2px' }} />
//                 Edit Layout
//               </Button>
//             )}
//       </div>
//     </div>
//   )
// }

// export default TopologyToolbar
