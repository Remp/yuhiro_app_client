import styled from 'glamorous-native'

export const mapStyle = {
  // position: 'absolute',
  // top: 0,
  // bottom: 0,
  // right: 0,
  // left: 0,
  flex: 1
}

export const Container = styled.view({
  flex: 1
})

export const Tools = styled.view({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0
})

export const Upper = styled.view({
  flexDirection: 'row'
})

export const Row = styled.view({
  flexDirection: 'row',
  paddingHorizontal: 10,
  paddingVertical: 10,
  justifyContent: 'center',
  alignItems: 'center'
})

export const InputContainer = styled.view({
  borderBottomColor: 'white',
  borderBottomWidth: 1.5
})

export const MarkerContainer = styled.view({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center'
})

export const CalcBackButton = styled.view({
  
})

export const PingMarkerContainer = styled.view({
  position: 'absolute'
})
