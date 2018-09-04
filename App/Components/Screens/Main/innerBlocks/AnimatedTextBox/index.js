import React, { PureComponent, Component } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";

import { containerStyle, TextBox } from "./styles";

export class AnimatedTextBox extends Component {
  constructor() {
    super();

    this.animWidth = new Animated.Value(0);
    this.width = Dimensions.get("window").width - 100;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { display } = nextProps;

    if (display !== this.props.display) {
      this.animate(!display);
    }

    return nextProps !== this.props || nextState !== this.state
  }

  animate = reverse => {
    // this.animWidth.setValue(reverse ? 1 : 0);

    Animated.timing(this.animWidth, {
      toValue: reverse ? 0 : 1,
      duration: 200,
      easing: Easing.linear
    }).start(() => reverse ? this.txtBox.blur() : this.txtBox.focus());
  };

  render() {
    const currentValue = this.animWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.width]
    });

    const {
      value,
      underlineColorAndroid,
      placeholder,
      placeholderTextColor,
      onChangeText
    } = this.props;

    return (
      <Animated.View style={[containerStyle, { width: currentValue }]}>
        <TextBox
          innerRef={el => this.txtBox = el}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid={underlineColorAndroid}
          value={value}
          onChangeText={onChangeText}
        />
      </Animated.View>
    );
  }
}
