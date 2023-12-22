/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import {
  REQUEST_MP_GET_MAIL_SETTINGS,
  RESPONSE_RP_GET_MAIL_SETTINGS,
  REQUEST_MP_SET_MAIL_SETTINGS,
  RESPONSE_RP_SET_MAIL_SETTINGS
} from '../../../../main/utils/IPCEvents'
import { updateLoadingVisible } from './preferenceSlice'
import { createSelector } from 'reselect'

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

export const requestGetMail = () => (dispatch) => {
  window.electron.ipcRenderer.once(RESPONSE_RP_GET_MAIL_SETTINGS, (event, arg) => {
    if (arg.success) {
      dispatch(initMailData(arg.data))
      dispatch(updateLoadingVisible())
    }
  })
  window.electron.ipcRenderer.send(REQUEST_MP_GET_MAIL_SETTINGS)
  dispatch(updateLoadingVisible())
}
export const requestSetMail = (callback) => (dispatch, getState) => {
  const { mailData } = getState().mail
  window.electron.ipcRenderer.once(RESPONSE_RP_SET_MAIL_SETTINGS, (event, arg) => {
    //console.log(arg);
    callback(arg.success)
  })
  window.electron.ipcRenderer.send(REQUEST_MP_SET_MAIL_SETTINGS, {
    isOpen: mailData.isOpen,
    service: mailData.service,
    host: mailData.host,
    port: mailData.port,
    username: mailData.username,
    password: mailData.password,
    to: converMailArrayDataToString(mailData.to),
    cc: converMailArrayDataToString(mailData.cc),
    bcc: converMailArrayDataToString(mailData.bcc)
  })
}

const mailSlice = createSlice({
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
    initMailData: (state, action) => {
      const { to, cc, bcc } = action.payload
      return {
        ...state,
        mailData: {
          ...action.payload,
          to: to === '' ? [] : to.split(','),
          cc: cc === '' ? [] : cc.split(','),
          bcc: bcc === '' ? [] : bcc.split(',')
        }
      }
    },

    setMailService: (state, action) => {
      const service = action.payload
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

    setMailHost: (state, { payload }) => {
      const host = payload
      const isHostValid =
        valueFormat.service.HOST_DOMAIN.test(host) || valueFormat.service.HOST_IPADDRESS.test(host)
      return {
        ...state,
        ...getStateOfSetValue(state, { host }),
        ...getStateOfFormatValid(state, { isHostValid })
      }
    },
    // setMailHost: (state, { payload }) => {
    //   const host = payload
    //   const isHostValid =
    //     valueFormat.service.HOST_DOMAIN.test(host) || valueFormat.service.HOST_IPADDRESS.test(host)
    //   return {
    //     ...state,
    //     ...getStateOfSetValue(state, { host }),
    //     ...getStateOfFormatValid(state, { isHostValid })
    //   }
    // },

    setMailPort: (state, action) => {
      const port = action.payload
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
    clearMailData: (state, { payload }) => {
      return {
        ...state,
        mailData: {},
        validData: {
          isPortValid: true,
          isHostValid: true,
          isUsernameValid: true,
          isPasswordValid: true
        },
        preService: '',
        isConfigChange: false
      }
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
  setMailUsername,
  initMailData,
  clearMailData
} = mailSlice.actions
const memoizedMailSelector = (state) => state.mail
export const mailSelector = createSelector(
  memoizedMailSelector,
  ({ mailData, validsData, preService }) => ({ mailData, validsData, preService })
)

export default mailSlice

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

const converMailArrayDataToString = (arrayData) => {
  let tempString = ''
  arrayData.forEach((element, index) => {
    tempString = tempString.concat(element)
    if (index !== arrayData.length - 1) {
      tempString = tempString.concat(',')
    }
  })
  return tempString
}
