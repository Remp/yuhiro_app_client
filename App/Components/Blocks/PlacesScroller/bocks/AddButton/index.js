import React, { PureComponent } from "react";
import { TouchableNativeFeedback, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Touch } from "app/Components/Blocks";
import * as colors from "app/Theme/colors";

import { Container, Content, IconContainer, Divider } from "./styles";

export const AddButton = ({ onPress }) => (
  <Container>
    <Touch
      background={TouchableNativeFeedback.Ripple(colors.lightDark)}
      onPress={onPress}
    >
      <Content>
        <IconContainer>
          <Icon name="map-marker" size={35} color={colors.almostWhite} />
          <Divider/>
          <Icon name="plus" size={20} color={colors.almostWhite} />
        </IconContainer>
      </Content>
    </Touch>
  </Container>
);
