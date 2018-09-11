import { createReducer } from "app/Helpers/redux";
import { ACCEPT_ORDER, CANCEL_ORDER, TEST_GET_TAXI } from 'app/Redux/actions/taxi'

const initalState = {
  isSearching: false,
  isFound: false,
  taxi: null
}

const handlers = {
  [ACCEPT_ORDER]: state => {
    return {
      ...state,
      isSearching: true
    }
  },
  [CANCEL_ORDER]: state => {
    return {
      ...initalState
    }
  },
  [TEST_GET_TAXI]: state => {
    return {
      isSearching: false,
      isFound: true,
      taxi: {
        id: '123'
      }
    }
  }
}

export default createReducer(initalState, handlers)

