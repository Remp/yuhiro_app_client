import { Dimensions } from 'react-native'
import styled from "glamorous-native";
import { width } from "app/Theme/metric";
import * as colors from 'app/Theme/colors'

export const Container = styled.scrollView({
  position: "absolute",
  bottom: 16,
  left: 0,
  right: 0
});

export const Content = styled.view({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  minWidth: Dimensions.get('window').width,
  backgroundColor: 'transparent'
});

export const iconBtnStyles = {
  backgroundColor: colors.almostWhite
}
