import { Dimensions } from 'react-native'
import styled from 'glamorous-native'
import * as colors from 'app/Theme/colors'

export const Container = styled.view({
  position: 'absolute',
  bottom: 0
})

export const TextContainer = styled.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

export const Text = styled.text({
  color: 'white',
  fontSize: 23,
  paddingVertical: 15
})

export const BarContainer = styled.view({
  backgroundColor: colors.stepGrey,
  height: 5,
  width: Dimensions.get('window').width,
  zIndex: 10000
})

export const barStyle = {
  backgroundColor: colors.lightBlue,
  position: 'absolute',
  height: 5
}