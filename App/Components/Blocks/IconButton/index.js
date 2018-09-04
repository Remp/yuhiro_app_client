import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableNativeFeedback } from "react-native";
import { Container } from "./styles";
import { Touch } from "../Touch";

export const IconButton = ({ size, name, color, onPress, style, rounded }) => (
  <Touch background={TouchableNativeFeedback.Ripple(color)} onPress={onPress}>
    <Container
      width={size * 1.5}
      height={size * 1.5}
      borderRadius={rounded ? size * 1.5 / 2 : 0}
      {...style}
    >
      <Icon color={color} name={name} size={size} />
    </Container>
  </Touch>
);
