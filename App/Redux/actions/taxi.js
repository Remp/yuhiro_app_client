import { createAsyncAction } from "app/Helpers/redux";
import { apiCall } from "./api";

export const ACCEPT_ORDER = 'taxi/ACCEPT_ORDER'
export const acceptOrder = () => ({
  type: ACCEPT_ORDER
})

export const CANCEL_ORDER = 'taxi/CANCEL_ORDER'
export const cancelOrder = () => ({
  type: CANCEL_ORDER
})

export const TEST_GET_TAXI = 'taxi/TEST_GET_TAXI'
export const testGetTaxi = () => ({
  type: TEST_GET_TAXI
})