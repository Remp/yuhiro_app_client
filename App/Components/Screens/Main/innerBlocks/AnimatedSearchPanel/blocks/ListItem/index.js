import React from "react";
import { TouchableNativeFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'

import { Touch } from "app/Components/Blocks";
import * as colors from "app/Theme/colors";

import { Container, Text } from "./styles";

export const ListItem = ({ text, onPress }) => (
  <Touch
    background={TouchableNativeFeedback.Ripple(colors.lightDark)}
    onPress={onPress}
  >
    <Container>
      <Icon color='#1f7c28' name='map-marker' size={30} />
      <Text>{text}</Text>
    </Container>
  </Touch>
);
