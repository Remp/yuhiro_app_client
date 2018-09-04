import { createAsyncAction } from 'app/Helpers/redux'
import { apiCall } from './api'

export const SEND_TEL = createAsyncAction('auth/SEND_TEL')
// export const sendTel = tel => apiCall({
//   types: SEND_TEL,
//   tel
// })
export const sendTel = tel => ({
  type: SEND_TEL.SUCCESS,
  payload: { data: [] }
})

export const SEND_CODE = createAsyncAction('auth/SEND_CODE')
// export const sendCode = code => apiCall({
//   types: SEND_CODE,
//   code
// })
export const sendCode = code => ({
  type: SEND_CODE.SUCCESS,
  payload: { data: [] }
})

export const SEND_NAME = createAsyncAction('auth/SEND_NAME')
// export const sendName = name => apiCall({
//   types: SEND_NAME,
//   name
// })
export const sendName = name => ({
  type: SEND_NAME.SUCCESS,
  payload: { data: [] }
})

export const CHANGE_STEP = 'auth/CHANGE_STEP'
export const changeStep = step => ({
  type: CHANGE_STEP,
  step
})