import React, { PureComponent } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Container,
  Text
} from './styles'

export default class Error extends PureComponent {
  render() {
    return (
      <Container>
        <Icon size={25} name='exclamation-triangle' color='white' />
        <Text>{this.props.message}</Text>
      </Container>
    )
  }
}
