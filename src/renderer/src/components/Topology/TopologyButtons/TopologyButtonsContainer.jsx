import { connect } from 'react-redux'
import TopologyButtons from './TopologyButtons'
import { setCurrentGroup, switchEditMode, changeTopologyEvent } from '../../../../reducers/topology'

const mapDispatchToProps = (dispatch) => ({
  setCurrentGroup: (param) => dispatch(setCurrentGroup(param)),
  switchEditMode: (param) => dispatch(switchEditMode(param)),
  changeTopologyEvent: (param) => dispatch(changeTopologyEvent(param))
})
const mapStateToProps = (state) => {
  let groupList = [{ name: 'All Device', id: 'all' }]
  Object.entries(state.discovery.groupDeviceData).forEach(([key, value]) => {
    if (key !== 'unGrouped') {
      groupList = [...groupList, { name: value.groupName, id: key }]
    }
  })
  let groupSelectWidth = 105
  groupList.forEach((element) => {
    const minWidth = element.name.length * 12
    if (minWidth > groupSelectWidth) {
      groupSelectWidth = minWidth
    }
  })
  return {
    editMode: state.topology.editMode,
    currentGroup: state.topology.currentGroup,
    groupList,
    groupSelectWidth
  }
}
const TopologyButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(TopologyButtons)

export default TopologyButtonsContainer
