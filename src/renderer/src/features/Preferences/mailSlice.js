/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const valueFormat = {
  service: {
    HOST_DOMAIN: /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/,
    HOST_IPADDRESS:
      /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/,
    PORT_MAX: 65536,
    PORT_MIN: 0
  },
  setting: {
    ACCOUNT: /^[a-z,A-Z,0-9,.,_,@]{0,100}$/
  }
}

export const mailSlice = createSlice({
  name: 'mailSlice',
  initialState: {
    mailData: {},
    validsData: {
      isPortValid: true,
      isHostValid: true,
      isUsernameValid: true,
      isPasswordValid: true
    },
    preService: ''
  },
  reducers: {
    setMailOpen: (state) => {
      //  const { action } = payload
      const isOpen = !state.mailData.isOpen
      return {
        ...state,
        ...getStateOfSetValue(state, { isOpen })
      }
    },
    setMailService: (state, action) => {
      const { service } = action.payload
      let { preService } = state
      if (service === 'Other') {
        preService = state.mailData.service
      }
      return {
        ...state,
        preService,
        ...getStateOfSetValue(state, { service })
      }
    },
    setMailHost: (state, action) => {
      const { host } = action.payload
      const isHostValid =
        valueFormat.service.HOST_DOMAIN.test(host) || valueFormat.service.HOST_IPADDRESS.test(host)
      return {
        ...state,
        ...getStateOfSetValue(state, { host }),
        ...getStateOfFormatValid(state, { isHostValid })
      }
    },
    setMailPort: (state, action) => {
      const { port } = action.payload
      const isPortValid =
        port >= valueFormat.service.PORT_MIN && port <= valueFormat.service.PORT_MAX
      return {
        ...state,
        ...getStateOfSetValue(state, { port }),
        ...getStateOfFormatValid(state, { isPortValid })
      }
    },
    setMailUsername: (state, action) => {
      const username = action.payload
      const isUsernameValid = valueFormat.setting.ACCOUNT.test(username)
      return {
        ...state,
        ...getStateOfSetValue(state, { username }),
        ...getStateOfFormatValid(state, { isUsernameValid })
      }
    },
    setMailPassword: (state, action) => {
      const password = action.payload
      const isPasswordValid = valueFormat.setting.ACCOUNT.test(password)
      return {
        ...state,
        ...getStateOfSetValue(state, { password }),
        ...getStateOfFormatValid(state, { isPasswordValid })
      }
    },
    addMailAccount: (state, action) => {
      const { id, value } = action.payload
      if (state.mailData[id].indexOf(value) === -1) {
        return {
          ...state,
          ...getStateOfSetValue(state, {
            [id]: [...state.mailData[id], value]
          })
        }
      }
      return { ...state }
    },
    removeMailAccount: (state, action) => {
      const { id, tag } = action.payload
      const newData = state.mailData[id].filter((element) => element !== tag)
      return {
        ...state,
        ...getStateOfSetValue(state, {
          [id]: newData
        })
      }
    }
  }
})

export const {
  setMailHost,
  setMailOpen,
  setMailPort,
  setMailService,
  addMailAccount,
  removeMailAccount,
  setMailPassword,
  setMailUsername
} = mailSlice.actions
export const mailSelector = (state) => {
  const { mailData, validsData, preService } = state.mail
  return { mailData, validsData, preService }
}

const getStateOfSetValue = (state, payload) => ({
  isConfigChange: true,
  mailData: {
    ...state.mailData,
    ...payload
  }
})
const getStateOfFormatValid = (state, valid) => ({
  validsData: {
    ...state.validsData,
    ...valid
  }
})
