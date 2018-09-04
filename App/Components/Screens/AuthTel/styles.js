import styled from "glamorous-native";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import metric from "app/Theme/metric";

export const containerStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
};
export const Content = styled.view({
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
});
export const Bottom = styled.view({
  marginTop: 50,
  padding: 10,
  borderWidth: 2,
  borderColor: "white",
  borderRadius: 20,
  flexDirection: 'row'
});
export const Left = styled.view({
  width: 50,
  justifyContent: 'center',
  alignItems: 'center'
})
export const Input = styled.textInput({
  backgroundColor: "transparent",
  fontSize: 25,
  fontStyle: "italic",
  color: "white",
  width: metric.width * 0.7,
  textAlign: "center"
});
export const Touch =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export const ButtonContainer = styled.view({
  position: 'absolute',
  top: metric.height - 80,
  right: 0,
  left: 0
})
export const Button = styled.view({
  borderColor: 'white',
  borderWidth: 2,
  paddingHorizontal: 20,
  paddingVertical: 3,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  borderRadius: 15,
  marginHorizontal: 20,
  marginVertical: 7
})
export const ButtonText = styled.text({
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white'
})