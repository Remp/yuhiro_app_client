import React, { PureComponent } from 'react'
import { Actions } from 'react-native-router-flux'

import { Header } from 'app/Components/Blocks'

import { Container } from './styles'

export default class History extends PureComponent {
  handleBackPress = () => {
    Actions.pop()
  }

  render() {
    return (
      <Container>
        <Header title='History' onBack={this.handleBackPress} />
      </Container>
    )
  }
}
