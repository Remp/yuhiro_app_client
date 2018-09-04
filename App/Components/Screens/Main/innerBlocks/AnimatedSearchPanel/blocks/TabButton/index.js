import React from "react";
import { TouchableNativeFeedback, Text } from "react-native";

import { Touch } from "app/Components/Blocks";
import * as colors from "app/Theme/colors";

import { TabBtn, textStyle } from "./styles";

export const TabButton = ({ selected, text, onPress }) => (
  <Touch
    background={TouchableNativeFeedback.Ripple(colors.almostWhite)}
    onPress={onPress}
  >
    <TabBtn backgroundColor={selected ? "white" : "rgba(0, 0, 0, 0.6)"}>
      <Text
        style={[textStyle, { color: selected ? colors.lightDark : "white" }]}
      >
        {text}
      </Text>
    </TabBtn>
  </Touch>
);
