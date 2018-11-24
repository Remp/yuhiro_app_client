import { createReducer } from "app/Helpers/redux";
import taxiStatus from 'app/Constants/taxiStatus'
import { ACCEPT_ORDER, CANCEL_ORDER, TEST_GET_TAXI } from 'app/Redux/actions/taxi'

const initalState = {
  isSearching: false,
  isFound: false,
  taxi: null,
  status: taxiStatus.none,
  message: null
}

const handlers = {
  [ACCEPT_ORDER]: state => {
    return {
      ...state,
      isSearching: true,
      status: taxiStatus.searching
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
      },
      status: taxiStatus.coming,
      message: 'Taxi is coming'
    }
  }
}

export default createReducer(initalState, handlers)

