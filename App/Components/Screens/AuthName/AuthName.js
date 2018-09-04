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
    name: ""
  };
  componentWillReceiveProps(nextProps) {
    const { step } = nextProps;
    if (step === authSteps.NONE) {
      Actions[routes.main]();
    }
  }
  onReadyClick = () => {
    this.props.onSendName(this.state.name);
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
            <Icon name="user" size={200} color="white" />
            <Bottom>
              <Left>
                {this.props.isLoading ? (
                  <ActivityIndicator size={40} white="white" />
                ) : (
                  <Icon name="edit" color="white" size={40} />
                )}
              </Left>
              <Input
                underlineColorAndroid="white"
                placeholder="your name"
                placeholderTextColor="white"
                maxLength={19}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                onSubmitEditing={this.onReadyClick}
              />
            </Bottom>
          </Content>
          <ButtonContainer>
            <Touch
              background={TouchableNativeFeedback.Ripple("white")}
              onPress={this.onReadyClick}
            >
              <Button>
                <ButtonText>READY</ButtonText>
              </Button>
            </Touch>
          </ButtonContainer>
        </LinearGradient>
      </ImageBackground>
    );
  }
}
