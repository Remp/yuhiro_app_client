import { createReducer } from 'app/Helpers/redux'
import authSteps from 'app/Constants/authSteps';
import {
  SEND_TEL, SEND_CODE, SEND_NAME, CHANGE_STEP
} from 'app/Redux/actions/auth'

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  step: authSteps.TEL
}

const handlers = {
  [SEND_TEL.REQUEST]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [SEND_TEL.SUCCESS]: (state, { payload }) => {
    // if user already in system - get him
    const user = payload.data.user
    return {
      ...state,
      user,
      isLoading: false,
      step: user ? authSteps.NONE : authSteps.CODE
    }
  },
  [SEND_CODE.REQUEST]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [SEND_CODE.SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      step: authSteps.NAME
    }
  },
  [SEND_NAME.REQUEST]: (state, action) => {
    return {
      ...state,
      isLoading: true
    }
  },
  [SEND_NAME.SUCCESS]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      step: authSteps.NONE
    }
  },
  [CHANGE_STEP]: (state, action) => {
    return {
      ...state,
      step: action.step
    }
  }
}
export default createReducer(initialState, handlers)