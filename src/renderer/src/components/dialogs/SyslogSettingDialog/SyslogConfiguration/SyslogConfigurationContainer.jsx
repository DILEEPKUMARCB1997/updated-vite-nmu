import { connect } from 'react-redux';
import SyslogConfiguration from './SyslogConfiguration';

import { startTask } from '../../../../../reducers/SyslogSetting';

const mapStateToProps = state => ({
  deviceStatus: state.syslogSetting.deviceStatus,
  isTaskRunning: state.syslogSetting.isTaskRunning,
});

const mapDispatchToProps = dispatch => ({
  startTask: param => dispatch(startTask(param)),
});

const SyslogConfigurationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SyslogConfiguration);
export default SyslogConfigurationContainer;
