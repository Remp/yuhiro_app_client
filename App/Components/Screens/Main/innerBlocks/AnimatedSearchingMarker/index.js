import React, { PureComponent } from 'react'
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Animated,
  Easing
} from "react-native";

import { containerStyle } from './styles'

export class AnimatedSearchingMarker extends PureComponent {
  constructor() {
    super()

    this.animVal = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate = () => {
    this.animVal.setValue(0.01)

    Animated.timing(this.animVal, {
      toValue: 1,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      duration: 5000
    }).start(this.animate)
  }

  render() {
    const scale = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 3]
    })

    const opacity = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0]
    })

    const style = {
      opacity,
      transform: [
        {
          scale
        }
      ]
    }

    return (
      <Animated.View style={[containerStyle, style]}>
        
      </Animated.View>
    )
  }
}
