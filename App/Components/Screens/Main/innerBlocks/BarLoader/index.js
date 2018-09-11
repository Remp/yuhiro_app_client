import React, { PureComponent } from "react";
import { Animated, Easing, Dimensions, TouchableHighlight } from "react-native";

import {
  Container,
  TextContainer,
  Text,
  BarContainer,
  barStyle
} from "./styles";

export class BarLoader extends PureComponent {
  constructor() {
    super();

    this.animVal = new Animated.Value(0);

    this.width = Dimensions.get("window").width;
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    this.animVal.setValue(0);

    Animated.timing(this.animVal, {
      toValue: 1,
      easing: Easing.bezier(0.5, 1.04, 0.83, 0.67),
      duration: 3000
    }).start(this.animate);
  };

  render() {
    const translateX = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.width / 5, this.width]
    });

    const currentWidth = this.animVal.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [this.width / 5, this.width / 2, 0]
    });

    const style = {
      transform: [
        {
          translateX
        }
      ],
      width: currentWidth
    };

    return (
      <Container>
        <TouchableHighlight onPress={this.props.onPress}>
          <TextContainer>
            <Text>Cancel</Text>
          </TextContainer>
        </TouchableHighlight>
        <BarContainer>
          <Animated.View style={[barStyle, style]} />
        </BarContainer>
      </Container>
    );
  }
}
