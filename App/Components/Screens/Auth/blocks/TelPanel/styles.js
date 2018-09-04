import styled from 'glamorous-native'
import * as colors from 'app/Theme/colors'
import metric from 'app/Theme/metric'

const contentHeight = metric.height * 0.3
export const inputStyle = {
  fontSize: 25,
  backgroundColor: 'white',
  paddingHorizontal: 10,
  borderRadius: 20,
  height: 30,
  color: '#4f4f4f',
  fontStyle: 'italic'
}
export const inputProps = {
  placeholder: 'your number',
  maxLength: 19,
}
export const textStyleForNumber = {
  fontSize: 20,
  height: 100
}
export const Container = styled.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.darkBackground3
})
export const Content = styled.view({
  minHeight: contentHeight,
  width: '80%',
  backgroundColor: colors.lightDark,
  paddingHorizontal: 20,
  paddingVertical: 20,
  borderColor: 'white',
  borderWidth: 2,
  borderRadius: 30
})
export const InputContainer = styled.view({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 30,
  backgroundColor: 'white'
})
export const Bottom = styled.view({
  flex: 1,
  justifyContent: 'center',
  marginTop: 10,
  alignItems: 'center',
  flexDirection: 'row',
  marginLeft: 30
})
export const LoaderContainer = styled.view({
  marginLeft: 10,
  width: 30
})
