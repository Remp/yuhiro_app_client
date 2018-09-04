import React, { PureComponent } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  TouchableNativeFeedback,
  ImageBackground,
  View,
  ActivityIndicator
} from "react-native";
import IconFA from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";
import { Actions } from "react-native-router-flux";

import authSteps from "app/Constants/authSteps";
import * as colors from "app/Theme/colors";
import * as routes from "app/Constants/routes";
import {
  containerStyle,
  Content,
  Bottom,
  Input,
  Touch,
  ButtonContainer,
  Button,
  ButtonText,
  Left
} from "./styles";
import background from "app/Assets/images/background_1.jpg";

export default class AuthCode extends PureComponent {
  state = {
    code: ""
  };
  componentWillReceiveProps(nextProps) {
    const { step } = nextProps;
    if (step === authSteps.NAME) {
      Actions[routes.authName]();
    } else if (step === authSteps.TEL) {
      Actions[routes.authTel]();
    }
  }
  onBackClick = () => {
    this.props.onChangeStep(authSteps.TEL);
  };
  onNextClick = () => {
    this.props.onSendCode();
  };
  renderLeft = () => {
    if (this.props.isLoading) {
      return <ActivityIndicator size={40} color="white" />;
    }
    return (
      <Touch background={TouchableNativeFeedback.Ripple("white", true)}>
        <View>
          <IconFeather name="refresh-ccw" color="white" size={40} />
        </View>
      </Touch>
    );
  };
  render() {
    return (
      <ImageBackground
        source={background}
        style={{ width: "100%", height: "100%" }}
      >
        <LinearGradient
          colors={colors.backgroundGradient}
          style={containerStyle}
        >
          <Content>
            <IconFA name="envelope" size={200} color="white" />
            <Bottom>
              <Left>
                <Touch
                  background={TouchableNativeFeedback.Ripple("white", true)}
                >
                  <View>
                    <IconFeather name="refresh-ccw" color="white" size={40} />
                  </View>
                </Touch>
              </Left>
              <Input
                underlineColorAndroid="white"
                placeholder="code"
                placeholderTextColor="white"
                keyboardType="numeric"
                maxLength={6}
                value={this.state.code}
                onChangeText={text => this.setState({ code: text })}
                onSubmitEditing={this.onNextClick}
              />
            </Bottom>
          </Content>
          <ButtonContainer>
            <Touch
              background={TouchableNativeFeedback.Ripple("white")}
              onPress={this.onBackClick}
            >
              <Button>
                <ButtonText>BACK</ButtonText>
              </Button>
            </Touch>
            <Touch
              background={TouchableNativeFeedback.Ripple("white")}
              onPress={this.onNextClick}
            >
              <Button>
                <ButtonText>NEXT</ButtonText>
              </Button>
            </Touch>
          </ButtonContainer>
        </LinearGradient>
      </ImageBackground>
    );
  }
}
