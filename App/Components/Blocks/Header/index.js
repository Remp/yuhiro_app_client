import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Touch } from 'app/Components/Blocks/Touch'

import { Container, BackButton, Title, Text } from './styles'

export const Header = ({ title, onBack }) => (
  <Container>
    <Touch onPress={onBack}>
      <BackButton>
        <Icon name='chevron-left' size={30} color='black' />
      </BackButton>
    </Touch>
    <Title>
      <Text>{title}</Text>
    </Title>
  </Container>
)

