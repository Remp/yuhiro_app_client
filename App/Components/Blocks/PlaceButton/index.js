import React, { PureComponent } from "react";
import { TouchableNativeFeedback, ActivityIndicator, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { Touch } from "app/Components/Blocks";
import * as colors from "app/Theme/colors";

import {
  Container,
  Content,
  // Text,
  IconContainer,
  TextContainer,
  textStyle
} from "./styles";

export class PlaceButton extends PureComponent {
  getContainerStyles = () => {
    const { selected } = this.props;

    if (selected) {
      return {
        backgroundColor: colors.almostWhite,
        borderColor: "transparent"
      };
    } else {
      return {
        backgroundColor: "transparent",
        borderColor: colors.almostWhite
      };
    }
  };

  renderIcon = () => {
    const { isLoading, selected, onDelete } = this.props;

    if (isLoading) {
      return <ActivityIndicator size={15} color={colors.mainBlue} />;
    } else if (selected) {
      return (
        <Icon
          name="times"
          size={15}
          color={colors.errorRed}
          onPress={onDelete}
        />
      );
    } else {
      return <Icon name="map-marker" size={15} color="white" />;
    }
  };

  render() {
    const { text, isLoading, onPress, selected } = this.props;

    const color = selected ? colors.lightDark : colors.almostWhite;

    return (
      <Container {...this.getContainerStyles()} elevation={3}>
        <Touch
          background={TouchableNativeFeedback.Ripple(color)}
          onPress={onPress}
        >
          <Content>
            <IconContainer>{this.renderIcon()}</IconContainer>
            <TextContainer>
              <Text
                style={{
                  ...textStyle,
                  color
                }}
                numberOfLines={1}
              >
                {isLoading ? "Loading..." : text}
              </Text>
            </TextContainer>
          </Content>
        </Touch>
      </Container>
    );
  }
}
