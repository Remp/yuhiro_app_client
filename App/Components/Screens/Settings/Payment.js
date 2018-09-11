import React, { PureComponent } from 'react'
import { Actions } from 'react-native-router-flux'

import { Header } from 'app/Components/Blocks'

import { Container } from './styles'

export default class Settings extends PureComponent {
  handleBackPress = () => {
    Actions.pop()
  }

  render() {
    return (
      <Container>
        <Header title='Settings' onBack={this.handleBackPress} />
      </Container>
    )
  }
}
