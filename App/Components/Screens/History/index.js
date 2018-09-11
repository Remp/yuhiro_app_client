import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Component from './History'

const selectors = createStructuredSelector({

})

const actions = {

}

export const History  = connect(selectors, actions)(Component)