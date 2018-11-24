import React, { Component } from 'react'
import { Animated, Easing, Dimensions } from 'react-native'

import { Text, containerStyle } from './styles'

export class AnimatedTaxiStatus extends Component {
  constructor() {
    super()

    this.animVal = new Animated.Value(0)

    this.width = Dimensions.get('window').width
  }

  animate = () => {
    Animated.timing(this.animVal, {
      easing: Easing.bezier(.01, 1.18, .82, .77),
      duration: 500,
      toValue: 1
    }).start()
  }

  componentDidMount() {
    this.animate()
  }

  render() {
    const calcStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          translateX: this.animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [this.width, 0]
          })
        }
      ]
    }

    return (
      <Animated.View style={[containerStyle, calcStyle]}>
        <Text>{this.props.message}</Text>
      </Animated.View>
    )
  }
}
