import styled from 'glamorous-native'
import * as colors from 'app/Theme/colors'
import metric from 'app/Theme/metric'

const contentHeight = metric.height * 0.2
export const Input = styled.textInput({
  fontSize: 25,
  backgroundColor: 'white',
  paddingHorizontal: 10,
  paddingVertical: 0,
  borderRadius: 20,
  color: '#4f4f4f',
  fontStyle: 'italic',
  textAlign: 'center',
  flex: 1
})
export const Container = styled.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})
export const Content = styled.view({
  minHeight: contentHeight,
  width: '80%',
  backgroundColor: colors.lightBlue,
  borderRadius: 20,
  elevation: 6,
  paddingHorizontal: 20,
  paddingVertical: 20,
})
export const InputContainer = styled.view({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
})
export const Bottom = styled.view({
  flex: 1,
  justifyContent: 'space-around',
  marginTop: 10,
  alignItems: 'center',
  flexDirection: 'row',
  marginLeft: 30
})
export const LoaderContainer = styled.view({
  marginLeft: 10,
  width: 30
})
export const ButtonContainer = styled.view({
  flexDirection: 'row',
  paddingLeft: 30
})
