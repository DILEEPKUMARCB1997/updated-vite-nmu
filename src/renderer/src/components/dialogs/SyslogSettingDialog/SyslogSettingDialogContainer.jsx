import { connect } from 'react-redux';
import SyslogSettingDialog from './SyslogSettingDialog';
import { clearData } from '../../../../reducers/SyslogSetting';

const mapStateToProps = state => ({
  isTaskRunning: state.syslogSetting.isTaskRunning,
});
const mapDispatchToProps = dispatch => ({
  clearData: () => dispatch(clearData()),
});

const SyslogSettingDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SyslogSettingDialog);

export default SyslogSettingDialogContainer;
