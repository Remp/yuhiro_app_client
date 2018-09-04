import React from "react";
import { Container, Text, Touch } from "./styles";
import { TouchableNativeFeedback } from "react-native";

const TitleButton = ({ onPress, text }) => (
  <Touch
    onPress={onPress}
    background={TouchableNativeFeedback.Ripple("grey", true)}
  >
    <Container>
      <Text>{text}</Text>
    </Container>
  </Touch>
);

export default TitleButton;
