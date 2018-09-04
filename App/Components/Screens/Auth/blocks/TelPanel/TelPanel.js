import React, { PureComponent } from "react";
import {
  Container,
  Content,
  InputContainer,
  Bottom,
  LoaderContainer,
  inputProps,
  inputStyle
} from "./styles";
import { ActivityIndicator } from "react-native";
import PhoneInput from "react-native-phone-input";
import TitleButton from '../TitleButton'
import Error from "../Error";
import { Actions } from 'react-native-router-flux'

export default class TelPanel extends PureComponent {
  state = {
    error: null
  };
  onNextClickHandler = () => {
    if (this.props.isLoading) return;
    if (this.phone.isValidNumber()) {
      this.setState({
        error: null
      });
      const value = this.phone.getValue();
      // this.props.onSendTel(value);
      Actions.code()
    } else {
      this.setState({
        error: "Number is not valid"
      });
    }
  };
  render() {
    const error = this.state.error ? this.state.error : this.props.error;
    console.log('render')
    return (
      <Container>
        <Content>
          <InputContainer>
            <PhoneInput
              textStyle={inputStyle}
              textProps={inputProps}
              ref={el => (this.phone = el)}
            />
          </InputContainer>
          <Bottom>
            <TitleButton text='next' onPress={this.onNextClickHandler} />
            <LoaderContainer>
              {this.props.isLoading && (
                <ActivityIndicator color="white" size={30} />
              )}
            </LoaderContainer>
          </Bottom>
        </Content>
        <Error message={error} />
      </Container>
    );
  }
}
