import React, { Component } from "react";
import {
  Animated,
  Easing,
} from "react-native";

import { AnimatedMenuItem } from './blocks'
import { containerStyle } from "./styles";

export class AnimatedSideMenuBar extends Component {
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
      duration: 200,
      easing: Easing.linear
    }).start(() => reverse && this.setState({ display: false }));
  };

  render() {
    const currentValue = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0]
    })

    const style = {
      transform: [{
        translateX: currentValue
      }]
    }

    return (
      <Animated.View style={[containerStyle, style]}>
        <AnimatedMenuItem icon='book' onPress={() => {}} />
        <AnimatedMenuItem icon='credit-card' onPress={() => {}} />
        <AnimatedMenuItem icon='cogs' onPress={() => {}} />
      </Animated.View>
    )
  }
}