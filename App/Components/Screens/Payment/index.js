import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Component from './Payment'

const selectors = createStructuredSelector({

})

const actions = {

}

export const Payment  = connect(selectors, actions)(Component)