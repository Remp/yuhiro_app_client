import styled from 'glamorous-native'
import * as colors from 'app/Theme/colors'

export const containerStyle = {
  marginTop: 10,
  marginHorizontal: 10
}

export const Upper = styled.view({
  flexDirection: 'row',
})

export const List = styled.view({
  marginTop: 20,
  marginHorizontal: 4,
  paddingVertical: 10,
  borderColor: 'white',
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.6)'
})

export const Empty = styled.view({
  justifyContent: 'center',
  height: 40,
  alignItems: 'center'
})

export const EmptyText = styled.text({
  color: 'white',
  fontStyle: 'italic',
  fontSize: 14
})

