import { configureStore } from '@reduxjs/toolkit'
import userManagementSlice from '../features/userManagementSlice'
import discoverySlice from '../features/discoverySlice'
import dialogSlice from '../features/dialogSlice'
import groupMemberSlice from '../features/groupMemberSlice'
import dashboardSlice from '../features/dashboardSlice'
import eventLogSlice from '../features/eventLogSlice'
import topologySlice from '../features/topologySlice'
import UIControlSlice from '../features/UIControllSlice'
import preferenceSlice from '../features/Preferences/preferenceSlice'
import { generalSlice } from '../features/generalSlice'

export const store = configureStore({
  reducer: {
    userManagement: userManagementSlice.reducer,
    discovery: discoverySlice.reducer,
    dialog: dialogSlice.reducer,
    groupMember: groupMemberSlice.reducer,
    dashboard: dashboardSlice.reducer,
    eventLog: eventLogSlice.reducer,
    topology: topologySlice.reducer,
    UIControl: UIControlSlice.reducer,
    preference: preferenceSlice.reducer,
    general: generalSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})
