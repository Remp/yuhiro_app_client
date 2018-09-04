import styled from 'glamorous-native'
import metric from 'app/Theme/metric'
import * as colors from 'app/Theme/colors'

export const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  flex: 1
}
export const Container = styled.view({
  flex: 1,
})
export const Content = styled.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
})
export const Scroller = styled.scrollView({
  flex: 1
})
export const Page = styled.view({
  width: metric.width,
  height: '35%',
})
