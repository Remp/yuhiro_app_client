import styled from 'glamorous-native';

export const Container = styled.view({
  borderRadius: 20,
  marginHorizontal: 10,
  marginVertical: 5,
  overflow: 'hidden',
  borderWidth: 1,
})

export const Content = styled.view({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 9,
  paddingRight: 8
})

export const TextContainer = styled.view({
  minWidth: 50,
  maxWidth: 130
})
export const Text = styled.text({
  fontSize: 17,
  flex: 1
})
export const textStyle = {
  fontSize: 17,
  flex: 1
}

export const IconContainer = styled.view({
  marginHorizontal: 8
})