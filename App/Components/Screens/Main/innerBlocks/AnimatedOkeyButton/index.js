import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Animated,
  Easing
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { containerStyle } from "./styles";

export class AnimatedOkeyButton extends Component {
  constructor() {
    super()

    this.animVal = new Animated.Value(0)

    this.state = {
      display: false
    }
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
      duration: 100,
      easing: Easing.linear
    }).start(() => reverse && this.setState({ display: false }));
  };

  render() {
    const { display } = this.state
    const { onPress, loading } = this.props

    const currentVal = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    return display ? (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[containerStyle, { opacity: currentVal }]}>
          {loading ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <Icon color="white" size={30} name="check" />
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    ) : (
      <View />
    );
  }
}
