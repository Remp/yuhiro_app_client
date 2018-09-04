import styled from 'glamorous-native'
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

export const Touch = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
export const Container = styled.view({
  flexDirection: 'row',
  alignItems: 'center'
})
export const Text = styled.text({
  fontSize: 30,
  color: 'white',
  paddingHorizontal: 10
})
export const LoaderContainer = styled.view({
  marginLeft: 10
})