import React, { PureComponent } from "react";
import authSteps from 'app/Constants/authSteps'
import {
  Container,
  Content,
  InputContainer,
  Bottom,
  LoaderContainer,
  ButtonContainer,
  Input
} from "./styles";
import { ActivityIndicator } from "react-native";
import TitleButton from "../TitleButton";
import Error from "../Error";
import { Actions } from 'react-native-router-flux'

export default class TelPanel extends PureComponent {
  state = {
    code: ''
  }
  onNextClickHandler = () => {
    this.props.onSendCode(this.state.code)
  };
  onBackClickHandler = () => {
    Actions.tel()
    // this.props.onChangeStep(authSteps.TEL)
  }
  render() {
    return (
      <Container>
        <Content>
          <InputContainer>
            <Input
              placeholder='code'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={6}
              value={this.state.code}
              onChangeText={code => this.setState({ code })}
            />
          </InputContainer>
          <Bottom>
            <ButtonContainer>
              <TitleButton text='back' onPress={this.onBackClickHandler} />
            </ButtonContainer>
            <ButtonContainer>
              <TitleButton text='next' onPress={this.onNextClickHandler} />
              <LoaderContainer>
                {this.props.isLoading && (
                  <ActivityIndicator color="white" size={30} />
                )}
              </LoaderContainer>
            </ButtonContainer>
          </Bottom>
        </Content>
        <Error message={this.props.error} />
      </Container>
    );
  }
}
