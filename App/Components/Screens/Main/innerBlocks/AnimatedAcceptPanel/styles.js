import styled from 'glamorous-native'
import * as colors from 'app/Theme/colors'

export const containerStyle = {
  backgroundColor: colors.almostWhite,
  zIndex: 10000
}

export const Upper = styled.view({
  flexDirection: 'row',
  height: 100
})

export const Cell = styled.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

export const CellText = styled.text({
  color: colors.lightGreyFont,
  fontSize: 18
})

export const Button = styled.view({
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.stepGreen
})

export const ButtonContent = styled.view({
  transform: [{
    translateX: -30
  }],
  flexDirection: 'row'
})

export const ButtonText = styled.text({
  color: 'white',
  fontSize: 20
})

export const Loader = styled.view({
  marginHorizontal: 10
})

