// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Dialog, DialogContent, Grid } from '@material-ui/core';
// import { Event } from '@material-ui/icons';
// import { withStyles } from '@material-ui/core/styles';
// import EnhanceDialogTitle from '../EnhanceDialogTitle/EnhanceDialogTitle';
// import DeviceListContainer from './DeviceList/DeviceListContainer';
// import SyslogConfigurationContainer from './SyslogConfiguration/SyslogConfigurationContainer';

// import styles from './SyslogSettingDialog.scss';

// const muiStyle = {
//   paper: {
//     width: '85%',
//     minHeight: '690px',
//   },
// };

// class SyslogSettingDialog extends Component {
//   static propTypes = {
//     classes: PropTypes.object.isRequired,
//     onClose: PropTypes.func.isRequired,
//     clearData: PropTypes.func.isRequired,
//     isTaskRunning: PropTypes.bool.isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       didMount: false,
//     };
//   }

//   componentDidMount = () => {
//     setTimeout(() => {
//       this.setState({ didMount: true });
//     }, 200);
//   };

//   componentWillUnmount = () => {
//     this.props.clearData();
//   };

// handleCancelButtonOnClick = () => {
//   this.setState({ didMount: false });
//   setTimeout(() => {
//     this.props.onClose();
//   }, 400);
// };

//   render() {
//     const { classes, isTaskRunning } = this.props;
//     return (
//       <Dialog open maxWidth={false} classes={{ paper: classes.paper }}>
// <EnhanceDialogTitle
// label="Syslog Configuration"
// close={this.handleCancelButtonOnClick}
// hideCloseButton={isTaskRunning}
// >
//           <Event />
//         </EnhanceDialogTitle>
//         <DialogContent className={styles.content}>
// <Grid container className={styles.container} spacing={4}>
//   <Grid item xs={12} md={12}>
//     <SyslogConfigurationContainer didMount={this.state.didMount} />
//   </Grid>
//   <Grid item xs={12} md={12}>
//     <DeviceListContainer didMount={this.state.didMount} />
//   </Grid>
// </Grid>
//         </DialogContent>
//       </Dialog>
//     );
//   }
// }

// export default withStyles(muiStyle)(SyslogSettingDialog);

import React, { useState, useEffect } from 'react'
import { Modal, Divider, Row, Col } from 'antd'
import { syslogSettingSelector, clearData } from '../../../features/SyslogSettingSlice'
import { useSelector, useDispatch } from 'react-redux'
//import { CalendarOutlined } from '@ant-design/icons'
import SyslogConfiguration from './SyslogConfiguration/SyslogConfiguration'
import DeviceList from './DeviceList/DeviceList'

const SyslogSettingDialog = ({ onClose }) => {
  const { isTaskRunning } = useSelector(syslogSettingSelector)
  console.log(isTaskRunning)
  const [didMount, setDidMount] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clearData())
    }
  }, [])

  const handleCancelButtonOnClick = () => {
    setDidMount(didMount)
    setTimeout(() => {
      onClose()
    }, 8000)
  }
  return (
    <Modal open onCancel={onClose} width="85%" bodyStyle={{ height: '80vh' }} onOk={onClose}>
      <Row>
        <Col
          span={23}
          style={{
            background: 'blue',
            color: 'white',
            marginLeft: '30px',
            height: '60px',
            fontSize: '1.8rem'
          }}
        >
          {' '}
          Syslog Setting
        </Col>
      </Row>
      <Row
        justify="space-around"
        gutter={{
          lg: 32
        }}
      >
        <Col span={10} style={{ marginRight: '5px', marginLeft: '10px' }}>
          <SyslogConfiguration didMount={didMount} />
        </Col>
        <Divider orientation="center" type="vertical" />
        <Col span={10} style={{ marginRight: '70px', marginLeft: '10px' }}>
          <DeviceList didMount={didMount} />
        </Col>
      </Row>
    </Modal>
  )
}

export default SyslogSettingDialog
