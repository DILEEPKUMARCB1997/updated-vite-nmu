import React, { Component, useEffect } from 'react';
import { ipcRenderer } from 'electron';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { Zoom, AppBar, Toolbar, IconButton } from '@material-ui/core';
// import { ChevronLeft, ChevronRight } from '@material-ui/icons';
// import { withStyles } from '@material-ui/core/styles';
import { Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import NavbarContainer from './Navbar/NavbarContainer';
// import GlobalSettingbarContainer from './GlobalSettingbar/GlobalSettingbarContainer';
// import HomeRouterContainer from './HomeRouter/HomeRouterContainer';
// import DialogsContainer from './Dialog/DialogsContainer';
// import styles from './Home.scss';
import {
  SEND_RP_ALL_DEVICES_LIST,
  SEND_RP_OPEN_NATIVE_MENU,
  SEND_RP_SNMP_SCAN_STATUS,
  SEND_RP_EVENT_LOG_UPDATE,
} from '../../utils/IPCEvents';

const drawerWidth = 150;

const muiStyle = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    backgroundColor: '#333333',
  },
  appBarUnMount: {
    backgroundColor: '#FFFFFF',
    height: '0px',
  },
  appBar: {
    height: '64px',
    zIndex: theme.zIndex.drawer + 1,
    transition: 'width .2s, height .5s',
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  drawerPaper: {
    overflowY: 'initial',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#333333',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

const Home=()=>{
  // static propTypes = {
  //   initRenderStep: PropTypes.number.isRequired,
  //   isAppPreferencesDialogOpen: PropTypes.bool.isRequired,
  //   openDialog: PropTypes.func.isRequired,
  //   classes: PropTypes.object.isRequired,
  //   location: PropTypes.any.isRequired,
  //   updateDiscoveryData: PropTypes.func.isRequired,
  //   closeDialog: PropTypes.func.isRequired,
  //   changeSNMPScanStep: PropTypes.func.isRequired,
  //   clearSnmpScanProgress: PropTypes.func.isRequired,
  //   requestGetNICData: PropTypes.func.isRequired,
  //   nextInitRenderStep: PropTypes.func.isRequired,
  //   requestAppInitialData: PropTypes.func.isRequired,
  //   updateEventLog: PropTypes.func.isRequired,
  //   clearUsersData: PropTypes.func.isRequired,
  //   username: PropTypes.string.isRequired,
  //   requestDiscoveryAfterLogin: PropTypes.func.isRequired,
  //   openBeepDialog: PropTypes.bool.isRequired,
  //   updateBeepSoundStart: PropTypes.func.isRequired,
  // };

  // constructor(props) {
  //   super(props);
  //   state = {
  //     collapsed: true,
  //   };
  // }

  useEffect (() => {
    ipcRenderer.on(SEND_RP_OPEN_NATIVE_MENU, nativeMenuListener);
    requestAppInitialData();
    requestDiscoveryAfterLogin();
    setTimeout(() => {
      nextInitRenderStep();
    }, 800);
    setTimeout(() => {
      nextInitRenderStep();
    }, 1600);
    setTimeout(() => {
      nextInitRenderStep();
    }, 2200);
    ipcRenderer.on(SEND_RP_ALL_DEVICES_LIST, deviceListListener);
    ipcRenderer.on(SEND_RP_SNMP_SCAN_STATUS, SNMPScanStatusListener);
    ipcRenderer.on(SEND_RP_EVENT_LOG_UPDATE, eventLogUpdateListener);
  },[])

  componentWillUnmount = () => {
    ipcRenderer.removeListener(
      SEND_RP_ALL_DEVICES_LIST,
      deviceListListener,
    );
    ipcRenderer.removeListener(
      SEND_RP_OPEN_NATIVE_MENU,
      nativeMenuListener,
    );
  };

 const nativeMenuListener = (event, arg) => {
    if (arg.action === 'preference') {
      if (!isAppPreferencesDialogOpen) {
        requestGetNICData();
        openDialog('perferences');
      }
    } else if (arg.action === 'about') {
      openDialog('about');
    }
  };

 const SNMPScanStatusListener = (event, arg) => {
    if (arg.scanStatus === 'a') {
      changeSNMPScanStep(arg.scanStatus);
      setTimeout(() => {
        closeDialog('snmpScanProgress');
        clearSnmpScanProgress();
      }, 2000);
    } else {
      changeSNMPScanStep(arg.scanStatus);
    }
  };

 const eventLogUpdateListener = (event, arg) => {
    if (!openBeepDialog && arg.type === 'custom') {
      updateBeepSoundStart();
      openDialog('buzzer');
    }
    updateEventLog(arg);
  };

  const deviceListListener = (event, arg) => {
    updateDiscoveryData(JSON.parse(arg));
  };

 const handleDrawerOpen = () => {
    setState({ collapsed: !state.collapsed });
  };
  const handleLogout = () => {
    console.log('logout');
    clearUsersData();
  };

  render() {
    const { classes, initRenderStep } = props;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBarUnMount,
            initRenderStep > 0 && classes.appBar,
            !state.collapsed && classes.appBarShift,
          )}
        >
          <Toolbar
            className={classNames(
              styles.toolbarUnmount,
              initRenderStep > 0 && styles.toolbar,
            )}
          >
            <Zoom in={initRenderStep > 2}>
              <IconButton
                onClick={handleDrawerOpen}
                className={styles.openMenuButton}
              >
                {state.collapsed ? (
                  <ChevronRight className={styles.openMenuIcon} />
                ) : (
                  <ChevronLeft className={styles.openMenuIcon} />
                )}
              </IconButton>
            </Zoom>
            <GlobalSettingbarContainer renderTransition={initRenderStep > 2} />
            <div className={styles.jss11}></div>
            <Dropdown overlay={menu} trigger={['click']}>
              <Button
                onClick={e => e.preventDefault()}
                style={{ margin: 16, float: 'right' }}
              >
                {username} <UserOutlined />
              </Button>
            </Dropdown>
          </Toolbar>
        </AppBar>
        <div
          className={classNames(
            styles.navContainerUnmount,
            initRenderStep > 1 && styles.navContainer,
          )}
        >
          <NavbarContainer
            collapsed={state.collapsed}
            pathname={location.pathname}
          />
        </div>
        <main className={styles.content}>
          <HomeRouterContainer location={location} />
        </main>
        <DialogsContainer />
      </div>
    );
  }
}

export default withStyles(muiStyle, { withTheme: true })(Home);
