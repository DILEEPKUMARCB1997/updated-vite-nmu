import { createSlice } from '@reduxjs/toolkit'
import {} from '../../../../main/utils/IPCEvents'

const snmpSlice = createSlice({
  name: 'snmpSlice',
  initialState: {
    SNMPData: {},
    isConfigChange: false,
    IPRangeData: {},
    isPrecheck: false,
    validsData: {
      isSNMPPollIntervalValid: true,
      isICMPTimeoutValid: true,
      isSNMPTimeoutValid: true,
      isReadCommunityValid: true,
      isWriteCommunityValid: true
    }
  },
  reducers: {
    clearSNMPSettingData: (state) => {
      return {
        ...state,
        SNMPData: {},
        isConfigChange: false,
        IPRangeData: {},
        validsData: {
          isSNMPPollIntervalValid: true,
          isICMPTimeoutValid: true,
          isSNMPTimeoutValid: true,
          isReadCommunityValid: true,
          isWriteCommunityValid: true
        }
      }
    }
  }
})

export const { clearSNMPSettingData } = snmpSlice.actions

export const snmpSelector = (state) => {
  const { SNMPData, isConfigChange, IPRangeData, isPrecheck, validsData } = state.snmp
  return { SNMPData, isConfigChange, IPRangeData, isPrecheck, validsData }
}

export default snmpSlice
