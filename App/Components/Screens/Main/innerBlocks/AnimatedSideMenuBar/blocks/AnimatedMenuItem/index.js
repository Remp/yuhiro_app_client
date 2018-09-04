import React, { Component } from "react";
import { Animated, Easing, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Container } from "./styles";

export class AnimatedMenuItem extends Component {
  render() {
    const { icon, onPress } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Container>
          <Icon name={icon} size={30} color="white" />
        </Container>
      </TouchableWithoutFeedback>
    );
  }
}
