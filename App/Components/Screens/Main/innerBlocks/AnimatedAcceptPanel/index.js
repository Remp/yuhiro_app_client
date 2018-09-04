import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Animated,
  Easing,
  ActivityIndicator,
  TouchableNativeFeedback
} from "react-native";

import * as colors from "app/Theme/colors";
import { Touch } from "app/Components/Blocks";
import { getFare } from "app/Helpers/map";

import {
  Upper,
  Cell,
  CellText,
  Button,
  ButtonContent,
  ButtonText,
  Loader,
  containerStyle
} from "./styles";

export class AnimatedAcceptPanel extends Component {
  constructor() {
    super();

    this.animVal = new Animated.Value(0);

    this.state = {
      display: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { display } = nextProps;
    const { display: currentDisplay } = this.props;

    if (display !== currentDisplay) {
      this.animate(!display);
    }

    return nextProps !== this.props || nextState !== this.state;
  }

  animate = reverse => {
    !reverse && this.setState({ display: true });

    Animated.timing(this.animVal, {
      toValue: reverse ? 0 : 1,
      duration: 200,
      easing: Easing.linear
    }).start(() => reverse && this.setState({ display: false }));
  };

  render() {
    const { distance, duration, loading, onAccept } = this.props;
    const { display } = this.state;

    const currentValue = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0]
    });

    const style = {
      transform: [
        {
          translateY: currentValue
        }
      ]
    };

    return (
      <Animated.View style={[containerStyle, style]}>
        {display && (
          <React.Fragment>
            <Upper>
              <Cell>
                <Icon
                  color={colors.lightGreyFont}
                  name="puzzle-piece"
                  size={35}
                />
                <CellText>{`${Math.round((duration / 60) * 10) /
                  10}m`}</CellText>
              </Cell>
              <Cell>
                <Icon
                  color={colors.lightGreyFont}
                  name="puzzle-piece"
                  size={35}
                />
                <CellText>{`${Math.round((distance / 1000) * 10) /
                  10}kms`}</CellText>
              </Cell>
              <Cell>
                <Icon
                  color={colors.lightGreyFont}
                  name="puzzle-piece"
                  size={35}
                />
                <CellText>{`${getFare(distance)}$`}</CellText>
              </Cell>
            </Upper>
            <Touch
              background={TouchableNativeFeedback.Ripple("white")}
              onPress={onAccept}
            >
              <Button>
                <ButtonContent>
                  <Loader>
                    <ActivityIndicator
                      size={30}
                      color={loading ? "white" : "transparent"}
                    />
                  </Loader>
                  <ButtonText>Accept</ButtonText>
                </ButtonContent>
              </Button>
            </Touch>
          </React.Fragment>
        )}
      </Animated.View>
    );
  }
}
