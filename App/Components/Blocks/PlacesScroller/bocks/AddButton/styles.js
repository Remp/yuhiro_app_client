import styled from 'glamorous-native';

import * as colors from 'app/Theme/colors'

export const Container = styled.view({
  borderRadius: 20,
  marginHorizontal: 10,
  marginVertical: 5,
  // overflow: 'hidden',
  // borderWidth: 1,
  // backgroundColor: colors.almostWhite,
  // alignItems: 'center'
})

export const Content = styled.view({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
})

export const IconContainer = styled.view({
  marginHorizontal: 8,
  flexDirection: 'row',
  alignItems: 'center'
})

export const Divider = styled.view({
  width: 5
})