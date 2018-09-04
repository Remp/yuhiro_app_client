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

export default class NamePanel extends PureComponent {
  state = {
    name: ''
  }
  onNextClickHandler = () => {
    this.props.onSendCode(this.state.code)
  };
  onBackClickHandler = () => {
    Actions.tel()
  }
  render() {
    return (
      <Container>
        <Content>
          <InputContainer>
            <Input
              placeholder='your name'
              underlineColorAndroid='transparent'
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </InputContainer>
          <Bottom>
            <ButtonContainer>
              <TitleButton text='back' onPress={this.onNextClickHandler} />
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
