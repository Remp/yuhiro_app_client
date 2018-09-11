import React, { PureComponent } from 'react'
import { Actions } from 'react-native-router-flux'

import { Header } from 'app/Components/Blocks'

import { Container } from './styles'

export default class Payment extends PureComponent {
  handleBackPress = () => {
    Actions.pop()
  }

  render() {
    return (
      <Container>
        <Header title='Payment' onBack={this.handleBackPress} />
      </Container>
    )
  }
}
