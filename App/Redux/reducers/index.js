import { combineReducers } from 'redux'
import auth from './auth'
import map from './map'
import taxi from './taxi'

export default combineReducers({
  auth,
  map,
  taxi
})