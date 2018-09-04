import React, { PureComponent } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  TouchableNativeFeedback,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";

import authSteps from "app/Constants/authSteps";
import * as colors from "app/Theme/colors";
import background from "app/Assets/images/background.jpg";
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

export default class AuthTel extends PureComponent {
  state = {
    tel: ""
  };
  componentWillReceiveProps(nextProps) {
    const { step } = nextProps;
    if (step === authSteps.CODE) {
      Actions[routes.authCode]();
    } else if (step === authSteps.NONE) {
      Actions[routes.main]();
    }
  }
  onChangeText = text => {
    if (text === "+") {
      this.setState({ tel: "" });
    } else if (text.length === 1) {
      this.setState({ tel: `+${text}` });
    } else {
      this.setState({ tel: text });
    }
  };
  onNextClick = () => {
    this.props.onSendTel(this.state.tel);
  };
  render() {
    const { isLoading } = this.props;
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
            <Icon name="android" size={200} color="white" />
            <Bottom>
              <Left>
                {isLoading ? (
                  <ActivityIndicator color="white" size={40} />
                ) : (
                  <Icon name="phone" color="white" size={40} />
                )}
              </Left>
              <Input
                editable={!isLoading}
                underlineColorAndroid="white"
                placeholder="your number"
                placeholderTextColor="white"
                keyboardType="numeric"
                maxLength={19}
                value={this.state.tel}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onNextClick}
              />
            </Bottom>
          </Content>
          <ButtonContainer>
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
