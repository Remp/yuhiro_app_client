import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Easing,
  ActivityIndicator
} from "react-native";

import { TabButton, ListItem } from "./blocks";
import { Upper, List, Empty, EmptyText, containerStyle } from "./styles";

export class AnimatedSearchPanel extends Component {
  constructor() {
    super();

    this.animVal = new Animated.Value(0);
    this.height = Dimensions.get("window").height;

    this.state = {
      tabIndex: 0,
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

  renderList = () => {
    const { isSearchLoading } = this.props;

    const list = this._getCurrentList();

    if (list.length) {
      return (
        <FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem}
        />
      );
    }

    return (
      <Empty>
        {isSearchLoading ? (
          <ActivityIndicator color="white" size={30} />
        ) : (
          <EmptyText>Empty...</EmptyText>
        )}
      </Empty>
    );
  };

  renderItem = ({ item }) => {
    return (
      <ListItem
        text={item.description}
        onPress={() => this.props.onPressAddress(item.place_id)}
      />
    );
  };

  _keyExtractor = item => item.place_id;

  _getCurrentList = () => {
    const { tabIndex } = this.state;
    const { searchPlaces } = this.props;

    switch (tabIndex) {
      case 0:
        return searchPlaces;
      default:
        return [];
    }
  };

  render() {
    const { display } = this.state;
    const { tabIndex, onChangeTab } = this.props

    const style = {
      transform: [
        {
          translateY: this.animVal.interpolate({
            inputRange: [0, 1],
            outputRange: [this.height, 0]
          })
        }
      ],
      opacity: this.animVal.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [0, 0, 1]
      })
    };

    return (
      <Animated.View style={[containerStyle, style]}>
        {display && (
          <React.Fragment>
            <Upper>
              <TabButton
                text="Search"
                selected={tabIndex === 0}
                onPress={() => onChangeTab(0)}
              />
              <TabButton
                text="Saved"
                selected={tabIndex === 1}
                onPress={() => onChangeTab(1)}
              />
            </Upper>
            <List>{this.renderList()}</List>
          </React.Fragment>
        )}
      </Animated.View>
    );
  }
}
