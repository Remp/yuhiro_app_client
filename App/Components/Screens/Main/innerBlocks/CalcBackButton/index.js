import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Container } from './styles'

export const CalcBackButton = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Container>
      <Icon name='chevron-left' color='white' size={30} />
    </Container>
  </TouchableWithoutFeedback>
)