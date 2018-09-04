import { createSelector } from 'reselect'

const getAuth = store => store.auth

export const getUser = createSelector(
  getAuth, 
  data => data.user
)
export const getError = createSelector(
  getAuth,
  data => data.error
)
export const getLoadingState = createSelector(
  getAuth,
  data => data.isLoading
)
export const getStep = createSelector(
  getAuth,
  data => data.step
)