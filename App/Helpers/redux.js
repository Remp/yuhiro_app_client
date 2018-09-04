export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    console.log(action.type, action)
    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
} 

export const createAsyncAction = action => ({
  REQUEST: `${action}.REQUEST`,
  SUCCESS: `${action}.SUCCESS`,
  FAILURE: `${action}.FAILURE`
})

