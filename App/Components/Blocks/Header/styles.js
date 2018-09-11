import styled from 'glamorous-native'

import * as colors from 'app/Theme/colors'

export const Container = styled.view({
  flexDirection: 'row',
  height: 60,
  backgroundColor: colors.almostWhite,
  elevation: 3
})

export const BackButton = styled.view({
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 10
})

export const Title = styled.view({
  justifyContent: 'center',
  flex: 1
})

export const Text = styled.text({
  color: 'black',
  fontSize: 18
})