import { connect } from 'react-redux'
import DeviceList from './DeviceList'

const mapStateToProps = (state) => ({
  deviceStatus: state.syslogSetting.deviceStatus,
  isTaskRunning: state.syslogSetting.isTaskRunning
})

const mapDispatchToProps = (dispatch) => ({})

const DeviceListContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceList)
export default DeviceListContainer
