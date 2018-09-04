import styled from 'glamorous-native'
import * as colors from 'app/Theme/colors'

export const Container = styled.view({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 40,
  paddingHorizontal: 20,
  backgroundColor: colors.errorRed,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
})
export const Text = styled.text({
  color: 'white',
  flex: 1,
  textAlign: 'center'
})